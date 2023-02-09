import { existsSync, writeFileSync } from 'fs';
import { dirname, join, relative } from 'path';
import findPnpmWorkspacePkg from '@pnpm/find-workspace-packages';
import { Command, spawn } from '@titian-design/cli';
import axios from 'axios';
import execa, { CommonOptions, ExecaReturnValue } from 'execa';
import findWorkspaceRoot from 'find-workspace-root';
import findYarnWorkspaceRoot from 'find-yarn-workspace-root';
import open from 'open';
import pc from 'picocolors';
import prompts, { Choice } from 'prompts';
import readPkgUp from 'read-pkg-up';
import semver, { ReleaseType } from 'semver';
import sortPackageJson from 'sort-package-json';
import glob from 'tiny-glob';

import getWarehouse from './warehouse';

export interface PackageInfo {
  location: string;
  workspaceDependencies: string[];
  currentVersion: string;
  nextVersion?: string;
  tag?: string;
  private?: boolean;
  publish?: boolean;
  pkgDir: string;
  pkgPath: string;
  name: string;
  changelog?: string | null;
}

export type PackagesInfo = Record<string, PackageInfo>;

export default class Release extends Command {
  allTags: string[] = [];

  allBranch: Set<string> = new Set();

  allRemoteBranch: string[] = [];

  currentBranch = 'master';

  newBranch = '';

  packageManager = 'npm';

  private packagesInfo: PackagesInfo | undefined;

  pkgbuild() {
    return new Promise<void>(resolve => {
      const child = spawn('npm', ['run', 'build'], {
        cwd: process.cwd(),
        stdio: 'inherit',
      });

      child.on('close', async () => {
        resolve();
      });

      child.on('error', err => {
        this.logger.error('pkgbuild: ', err);
        process.exit(1);
      });

      child.on('exit', e => {
        this.logger.debug(`child process exited with code ${e}`);
        resolve();
      });
    });
  }

  override async init() {
    await this.pkgbuild();
    await this.getAllBranches();
    await this.updateBranch();
  }

  override async run() {
    const newBranch = await this.createNewBranch();
    this.newBranch = newBranch;
    const packagesInfo = await this.checkPackages();
    this.packagesInfo = packagesInfo;
    await this.getPackagesInfo(packagesInfo);
    await this.modifyPackagesJson(packagesInfo);
    try {
      await this.gitAction(packagesInfo, newBranch);
    } catch (e) {
      this.logger.error('推送失败，请手动操作', e);
    }
    const warehouse = getWarehouse(this, packagesInfo);
    await warehouse.flow();
    try {
      await this.createMergeRequest();
    } catch (e) {
      this.logger.error('MR', e.message);
    }
  }

  async createMergeRequest() {
    const { projectId } = this.config;
    if (projectId) {
      const config = {
        method: 'post',
        url: ``,
        headers: {
          'PRIVATE-TOKEN': '',
          'Content-Type': 'application/json',
        },
        data: {
          id: projectId,
          title: `merge ${this.newBranch} to ${this.currentBranch}`,
          source_branch: this.newBranch,
          target_branch: this.currentBranch,
        },
      };

      const { data } = await axios(config);
      await open(data.web_url, { app: { name: open.apps.chrome } });
    }
  }

  async exec(bin: string, args: string[], opts: CommonOptions<'utf8'> = {}): Promise<ExecaReturnValue<string>> {
    return execa(bin, args, { stdio: 'inherit', ...opts });
  }

  async getLatestTag(pkgName: string) {
    this.allTags = (await this.exec('git', ['tag'], { stdio: 'pipe' })).stdout.split(/\n/).filter(Boolean);
    const prefix = pkgName === this.config.mainPackage ? 'v' : `${pkgName}@`;
    let customTag = this.currentBranch === 'master' ? '' : this.currentBranch.replace(/^master-/, '');

    if (!this.currentBranch.startsWith('master-')) {
      customTag = '';
    }
    if (!customTag && this.packagesInfo?.[pkgName]?.currentVersion) {
      const versionInfo = this.processSemverVersion(this.packagesInfo?.[pkgName]?.currentVersion);
      customTag = versionInfo.prereleaseType || versionInfo.main;
    }

    const latestTag = semver.rsort(
      this.allTags
        .filter(
          tag =>
            tag.startsWith(prefix) &&
            (customTag === '' ? tag.indexOf(customTag) > -1 || tag.indexOf('beta') > -1 : tag.indexOf(customTag) > -1),
        )
        .map(v => v.slice(prefix.length)),
    )?.[0];
    return latestTag ? `${prefix}${latestTag}` : undefined;
  }

  async logRecentCommits(pkgName: string, pkgDir: string) {
    const tag = await this.getLatestTag(pkgName);
    const arr = tag ? ['rev-list', '-n', '1', tag] : ['rev-list', '--all'];
    let sha: string = await this.exec('git', arr, { stdio: 'pipe' }).then(res => res.stdout.trim());
    sha = sha?.split('\n')?.pop() || '';
    return this.exec(
      'git',
      ['--no-pager', 'log', `${sha}..HEAD`, '--oneline', '--no-merges', '--pretty="%h - %s"', '--', pkgDir],
      {
        stdio: 'pipe',
      },
    ).then(c => c.stdout?.trim());
  }

  async getAllBranches() {
    const allBranchString = await this.exec('git', ['branch', '-a', '-l'], { stdio: 'pipe' });
    const allBranch = allBranchString.stdout
      .split('\n')
      .map(i => {
        let ret = i;
        if (i.includes('*')) {
          [, ret] = i.split(' ');
          this.currentBranch = ret;
        } else if (i.includes('->')) {
          ret = '';
        } else if (i.includes('remotes/origin/')) {
          ret = i.slice(i.indexOf('remotes/origin/') + 'remotes/origin/'.length);
          this.allRemoteBranch.push(ret);
        }
        return ret.trim();
      })
      .filter(Boolean);
    this.allBranch = new Set(allBranch);
    return this.allBranch;
  }

  /**
   * 1. 检查当前分支是否有文件未提交，如果有，则
   * 2. 检查当前分支是否需要更新，如果需要更新，则更新分支
   */
  async updateBranch() {
    const diff = await this.exec('git', ['diff'], { stdio: 'pipe' });
    if (diff.stdout.length > 0) {
      throw new Error('当前分支有未提交的内容，请先提交再执行 release');
    }
    if (this.allRemoteBranch.includes(this.currentBranch)) {
      await this.exec('git', ['pull', '--autostash', '--rebase', 'origin', this.currentBranch], { stdio: 'inherit' });
    } else {
      throw new Error('当前分支不是远程分支，请先拉取或提交到远程分支');
    }
  }

  /**
   * 从当前分支创建一个新的 feature 分支，命名为 feature/YYYYMMDD,
   * 一天若是同时需要发多个，命名为 feature/YYYYMMDD-1, feature/YYYYMMDD-2
   * TODO 应该有具体的tag
   * @param {string} branch
   */
  async createNewBranch() {
    let newBranch = `feature/${new Date().toISOString().split('T')[0].replace(/-/g, '')}`;
    const hasRelease = Array.from(this.allBranch)
      .filter(b => b.includes(newBranch))
      .map(i => Number.parseInt(i.split('-')[1] || '0', 10))
      .sort((a, b) => a - b);

    if (this.allBranch.has(newBranch)) {
      newBranch = `${newBranch}-${Math.max(...hasRelease) + 1}`;
    }

    const res = await prompts([
      {
        type: 'text',
        name: 'name',
        message: '请输入 feature 发布分支的名字',
        initial: newBranch,
      },
    ]);

    if (res.name) {
      newBranch = res.name;
    }

    await this.exec('git', ['checkout', '-b', newBranch]);

    return newBranch;
  }

  /**
   * 检查当前文件目录所在的所有packages,
   * 1. 需要根据不同的类型，检查不同的文件，ex: npm workspace 或者 yarn workspace, lerna 等
   *
   * type packageInfo = {
   *    location: string;                 // location: 'packages/compiler',
   *    workspaceDependencies: string[];  // workspaceDependencies: [ '@titian-design/cli' ]
   *    currentVersion: SermverVersion;   // currentVersion: '0.1.0',
   *    private: boolean | undefined;     // private: true,
   *    pkgDir: string;                   // pkgDir:
   * 'D:\\workroom\\titian-weapp\\packages\\compiler',
   *    pkgPath: stromg;                  //
   * 'D:\\workroom\\titian-weapp\\packages\\compiler\\package.json'
   * }
   * @returns {packageInfo[]}
   */
  async checkPackages(): Promise<PackagesInfo> {
    let packagesInfo: PackagesInfo = {};
    if (existsSync('yarn.lock')) {
      this.packageManager = 'yarn';
      // yarn workspace
      const workspaceRoot = findYarnWorkspaceRoot(process.cwd());
      if (!workspaceRoot) return packagesInfo;
      const packages = await this.exec('yarn', ['workspaces', 'info', '--json'], { stdio: 'pipe' });
      packagesInfo = JSON.parse(packages.stdout.replace(/[\w.\s]+\n/gm, '').replace(/Done.+/g, ''));
      Object.keys(packagesInfo).forEach(p => {
        const info = packagesInfo[p];
        const packagePath = join(workspaceRoot, info.location, 'package.json');
        // eslint-disable-next-line import/no-dynamic-require, global-require, @typescript-eslint/no-var-requires
        const packageJson = require(packagePath);
        if (packageJson) {
          info.currentVersion = packageJson.version || '';
          info.private = packageJson.private;
          info.pkgDir = join(workspaceRoot, info.location);
          info.pkgPath = packagePath;
          info.name = p;
        } else {
          this.logger.error('package.json not found', packagePath);
        }
      });
      return packagesInfo;
    }

    if (existsSync('package-lock.json')) {
      this.packageManager = 'npm';
      // npm workspace
      const workspaceRoot = await findWorkspaceRoot(process.cwd());
      if (!workspaceRoot) return packagesInfo;
      const { packageJson } = (await readPkgUp.sync({ cwd: workspaceRoot })) as readPkgUp.ReadResult;
      const workspaces = packageJson.workspaces || [];
      if (Array.isArray(workspaces)) {
        workspaces.forEach(async w => {
          const files = await glob(`${w}/package.json`, { cwd: workspaceRoot });
          files.forEach(f => {
            const pkgPath = join(workspaceRoot, f);
            // eslint-disable-next-line import/no-dynamic-require
            const { packageJson: pkg } = readPkgUp.sync({ cwd: join(workspaceRoot, f) }) as readPkgUp.ReadResult;
            if (pkg && pkg.name) {
              packagesInfo[pkg.name] = {
                location: dirname(f),
                currentVersion: pkg.version || '',
                private: pkg.private,
                pkgDir: dirname(join(workspaceRoot, f)),
                pkgPath,
                name: pkg.name,
                workspaceDependencies: [
                  ...Object.keys(packageJson.dependencies || {}),
                  ...Object.keys(pkg.devDependencies || {}),
                ],
              };
            }
          });
        });

        Object.keys(packagesInfo).forEach(p => {
          const pkg = packagesInfo[p];
          pkg.workspaceDependencies = pkg.workspaceDependencies.filter(i => packagesInfo[i]);
        });

        return packagesInfo;
      }
      throw new Error('workspaces 不符合 npm workspace 的格式');
    }

    if (existsSync('pnpm-workspace.yaml')) {
      this.packageManager = 'pnpm';
      const pkgs = await findPnpmWorkspacePkg(process.cwd());
      pkgs.forEach(({ dir, manifest }) => {
        if (manifest.name) {
          packagesInfo[manifest.name] = {
            location: relative(this.root, dir),
            currentVersion: manifest.version || '',
            private: manifest.private,
            pkgDir: dir,
            name: manifest.name,
            pkgPath: join(dir, 'package.json'),
            workspaceDependencies: [
              ...Object.keys(manifest.dependencies || {}),
              ...Object.keys(manifest.devDependencies || {}),
            ],
          };
        }
      });

      Object.keys(packagesInfo).forEach(p => {
        const pkg = packagesInfo[p];
        pkg.workspaceDependencies = pkg.workspaceDependencies.filter(i => packagesInfo[i]);
      });

      return packagesInfo;
    }

    {
      // lerna workspace TODO
    }

    this.logger.error('not packages found');

    return packagesInfo;
  }

  processSemverVersion(version: string) {
    const [main, prerelease] = version.split('-');
    const [major, minor, patch] = main.split('.');
    const [prereleaseType, prereleaseVersion] = (prerelease || '.').split('.');
    return {
      main,
      major,
      minor,
      patch,
      prereleaseType,
      prereleaseVersion,
    };
  }

  /**
   * 需要对不同的package升级不同的版本
   * @param {string | string[]} packages
   */
  async selectVersions(currentVersion: string, moduleName: string, isFirstTag = false) {
    if (isFirstTag) {
      if (semver.gte('0.0.0', currentVersion)) {
        // 如果当前版本小于等于 0.1.0，则需要从 0.1.0 升级
        currentVersion = '0.0.0';
      } else {
        isFirstTag = false;
      }
    }
    const { prereleaseType } = this.processSemverVersion(currentVersion);
    /**
     * 0.1.0 => ('0.1.0', 'patch') => 0.1.1
     * 0.1.0 => ('0.1.0', 'minor') => 0.2.0
     * 0.1.0 => ('0.1.0', 'major') => 1.0.0
     * 0.1.0 => ('0.1.0', 'prerelease', 'beta') => 0.1.0-beta.0
     * 0.1.0 => ('0.1.0', 'prerelease', 'next') => 0.1.0-next.0
     * 0.1.0-beta.0 => ('0.1.0-beta.0', 'prerelease', 'beta') => 0.1.0-beta.1
     * 0.1.0-beta.0 => ('0.1.0-beta.0', 'patch') => 0.1.0
     * 0.1.0-beta.0 => ('0.1.0-beta.0', 'minor') => 0.1.0
     * 1.0.0-beta.0 => ('1.0.0-beta.0', 'major') => 1.0.0
     */
    const inc = (i: ReleaseType, type?: string) => semver.inc(currentVersion, i, type);

    const versionChoices = [
      isFirstTag
        ? null
        : {
            title: 'next',
            value: inc(prereleaseType ? 'prerelease' : 'patch', prereleaseType),
          },
      ...(prereleaseType
        ? [{ title: 'stable', value: inc('patch') }]
        : [
            {
              title: 'alpha-patch',
              value: inc('prepatch', 'alpha'),
            },
            { title: 'alpha-minor', value: inc('preminor', 'alpha') },
            {
              title: 'beta-patch',
              value: inc('prepatch', 'beta'),
            },
            { title: 'beta-minor', value: inc('preminor', 'beta') },
            {
              title: 'minor',
              value: inc('minor'),
            },
            {
              title: 'major',
              value: inc('major'),
            },
          ]),
      { value: 'custom', title: 'custom' },
    ]
      .filter(Boolean)
      .map<{ title: string; value: string } | null>((i: any) => {
        if (i) {
          i.title = `${i.title} (${i.value})`;
        }
        return i;
      });
    const res = await prompts([
      {
        type: 'select',
        name: 'version',
        message: `请选择 ${pc.blue(moduleName)} 升级的版本`,
        choices: versionChoices as [],
      },
    ]);
    if (res.version === 'custom') {
      const customRes = await prompts({
        type: 'text',
        name: 'version',
        message: '请输入自定义的版本号',
        initial: currentVersion,
        format: val => semver.valid(val),
      });
      res.version = customRes.version;
    }
    if (!semver.valid(res.version)) {
      throw new Error('请输入正确的版本号');
    }
    return res.version;
  }

  /**
   * 列出需要选择的packages, 有可能是一个或者是多个, 同时检查他们的内容是否变化
   *
   * @param {string | string[]} packages
   */
  async getPackagesInfo(packages: PackagesInfo) {
    const choices: Choice[] = [];
    Object.keys(packages).forEach(p => {
      const pkg = packages[p];
      choices.push({
        title: p,
        value: p,
        disabled: pkg.private,
        selected: !pkg.private,
      });
    });
    const choice = await prompts([
      {
        type: 'multiselect',
        name: 'modules',
        message: '请选择需要发布的包',
        choices,
      },
    ]);
    const { modules } = choice;
    if (modules.length === 0) {
      this.logger.warn('请选择需要发布的包');
      process.exit(1);
    }

    await modules.reduce(
      (prev: Promise<void>, module: string) =>
        prev.then(async () => {
          const oldModule = module;
          const moduleInfo = packages[module];
          if (module.startsWith('@')) {
            [, module] = module.split('/');
          }
          const commits = await this.logRecentCommits(oldModule, moduleInfo.location);
          let firstTag = false;
          packages[oldModule].changelog = commits;
          if (commits === null) {
            // create first tag
            const { stdout } = await this.exec(
              'git',
              ['--no-pager', 'log', '--oneline', '--no-merges', '--pretty="%h - %s"', '--', moduleInfo.pkgDir],
              {
                stdio: 'pipe',
              },
            );
            packages[oldModule].changelog = stdout;
            firstTag = true;
          } else if (commits.length === 0) {
            const confirm = await prompts([
              {
                type: 'confirm',
                name: 'confirm',
                message: `${oldModule} 没有任何提交内容，是否继续发布？`,
                initial: true,
              },
            ]);
            if (!confirm.confirm) {
              packages[oldModule].publish = false;
              return;
            }
          }
          packages[oldModule].publish = true;
          packages[oldModule].nextVersion = await this.selectVersions(moduleInfo.currentVersion, oldModule, firstTag);
        }),
      Promise.resolve(),
    );
    return packages;
  }

  /**
   * 修改 packages/package.json 里的version
   *
   * @param {obj|obj[]} packagesInfo
   */
  async modifyPackagesJson(packagesInfo: PackagesInfo) {
    await Object.keys(packagesInfo).reduce(
      (prev, moduleName) =>
        prev.then(async () => {
          {
            const pkg = packagesInfo[moduleName];
            // eslint-disable-next-line import/no-dynamic-require, global-require, @typescript-eslint/no-var-requires
            const pkgJson = require(pkg.pkgPath);

            if (!pkgJson) return;

            let hasdepPublish = false;
            pkg.workspaceDependencies.forEach(depModuleName => {
              const module = packagesInfo[depModuleName];
              hasdepPublish = hasdepPublish || Boolean(module.publish);
              if (module) {
                // TODO: 后期将"^"描述符替换成package.json中的描述符
                if (pkgJson?.dependencies?.[depModuleName]) {
                  pkgJson.dependencies[depModuleName] = `${this.packageManager === 'pnpm' ? 'workspace:' : ''}${
                    module.nextVersion || module.currentVersion
                  }`;
                } else if (pkgJson?.devDependencies?.[depModuleName]) {
                  pkgJson.devDependencies[depModuleName] = `${this.packageManager === 'pnpm' ? 'workspace:' : ''}${
                    module.nextVersion || module.currentVersion
                  }`;
                }
              }
            });

            pkgJson.version = pkg.nextVersion || pkg.currentVersion;
            if (hasdepPublish && !pkg.publish) {
              const confirm = await prompts([
                {
                  type: 'confirm',
                  name: 'confirm',
                  message: `${pkgJson.name} 依赖的包有发布，请再次确实是否需要发布本模块？`,
                  initial: false,
                },
              ]);
              if (confirm.confirm) {
                const newVersion = await this.selectVersions(pkg.currentVersion, moduleName);
                pkgJson.nextVersion = newVersion;
                pkgJson.version = newVersion || pkgJson.version;
              }
            }
            writeFileSync(pkg.pkgPath, `${sortPackageJson(JSON.stringify(pkgJson, null, 2))}\n`);
          }
        }),
      Promise.resolve(),
    );
  }

  async genChangelog(pkg: PackageInfo) {
    const changelogArgs = [
      'conventional-changelog-cli',
      '-p',
      'angular',
      '-i',
      'CHANGELOG.md',
      '-s',
      '--commit-path',
      '.',
    ];
    this.logger.info(`正在生成 ${pc.green(pkg.name)} 相关的 changelog`);
    await this.exec('npx', changelogArgs, { cwd: pkg.pkgDir });
  }

  async genPackagesChangelog(packagesInfo: PackagesInfo) {
    const promises = Object.keys(packagesInfo).map(moduleName => {
      const pkg = packagesInfo[moduleName];
      return pkg.publish ? this.genChangelog(pkg) : null;
    });
    return Promise.all(promises);
  }

  /**
   * create new tag
   * add, commit, push远程仓库
   */
  async gitAction(packagesInfo: PackagesInfo, branch: string) {
    let isPushed = false;
    return Object.keys(packagesInfo).reduce(
      (prev: Promise<void>, pkgName) =>
        prev.then(async () => {
          const pkg = packagesInfo[pkgName];

          if (pkg.publish) {
            await this.genChangelog(pkg);
            const { stdout } = await this.exec('git', ['diff'], { stdio: 'pipe' });
            const tag = pkgName === '@titian-design/weapp' ? `v${pkg.nextVersion}` : `${pkgName}@${pkg.nextVersion}`;
            if (this.allTags.includes(tag)) {
              this.logger.warn(`${tag} 已经存在了，将删除原先的 tag`);
              await this.exec('git', ['tag', '-d', tag], { stdio: 'pipe' });
              await this.exec('git', ['push', 'origin', '--delete', tag], { stdio: 'pipe' });
            }
            pkg.tag = tag;
            if (stdout) {
              this.logger.info('', `正在创建 ${pc.green(pkg.name)} 的 v${pkg.nextVersion} tag`);
              await this.exec('git', ['add', '.']);
              await this.exec('git', ['commit', '-m', `release: ${tag}`]);
              await this.exec('git', ['tag', tag]);
              this.logger.info('', `正在推送远程仓库，新分支为：${branch}`);
              await this.exec('git', ['push', 'origin', `refs/tags/${tag}`]);
            }
            if (isPushed) {
              await this.exec('git', ['push', 'origin', branch]);
            } else {
              await this.exec('git', ['push', '-u', 'origin', branch]);
              isPushed = true;
            }
            console.log('\n');
          }
        }),
      Promise.resolve(),
    );
  }
}
