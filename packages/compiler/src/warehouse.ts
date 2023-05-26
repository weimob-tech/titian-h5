import { normalizePath } from '@titian-design/cli';
import readPkgUp from 'read-pkg-up';
import type Release from './release';
import type { PackagesInfo, PackageInfo } from './release';

function isUsingYarn() {
  return (process.env.npm_config_user_agent || '').indexOf('yarn') === 0;
}
class Warehouse {
  isYarn: boolean;

  release: Release;

  packagesList: PackageInfo[];

  registryExec: string[];

  publishUser: string;

  constructor(release: Release, packagesInfo: PackagesInfo) {
    this.release = release;
    this.packagesList = Object.keys(packagesInfo)
      .map(key => packagesInfo[key])
      .filter(item => item.publish);
    this.isYarn = isUsingYarn();

    const { packageJson } = readPkgUp.sync({ cwd: this.release.config.root || process.cwd() }) as readPkgUp.ReadResult;

    const { registry } = packageJson?.publishConfig || {};
    this.registryExec = registry ? ['--registry', registry as string] : [];
    this.publishUser = '';
  }

  async check() {
    await this.checkUser();
    await this.checkGrammar();
    await this.checkTest();
  }

  async checkUser() {
    const { stdout } = await this.release.exec('npm', ['whoami', '--json'].concat(this.registryExec), {
      stdio: 'pipe',
    });
    this.publishUser = stdout || '';
    return stdout;
  }

  async checkGrammar() {
    const { packageJson } = readPkgUp.sync({ cwd: this.release.config.root || process.cwd() }) as readPkgUp.ReadResult;

    if (packageJson && packageJson.devDependencies) {
      if (packageJson.devDependencies.stylelint) {
        await this.release.exec('stylelint', [
          ...this.packagesList.map(item => `${item.location}/**/*.{css,less}`),
          '--allow-empty-input',
        ]);
      }
      if (packageJson.devDependencies.eslint) {
        const list = this.packagesList.filter(p => p.name !== '@titian-design/touchemulator');
        if (list.length > 0) {
          // FIXME filter
          await this.release.exec('eslint', ['--ext', '.js', '--ext', '.ts', ...list.map(item => item.location)]);
        }
      }
    }
  }

  async checkTest() {
    const { packageJson } = readPkgUp.sync({ cwd: this.release.config.root || process.cwd() }) as readPkgUp.ReadResult;

    if (packageJson?.devDependencies?.jest) {
      await this.release.exec('jest', [...this.packagesList.map(item => normalizePath(item.location))]);
    }
  }

  async pub() {
    return Promise.all(
      this.packagesList.map(async item => {
        if (!item.nextVersion) return null;
        const { prereleaseType: preids } = this.release.processSemverVersion(item.nextVersion);
        if (this.isYarn) {
          return this.release.exec(
            'yarn',
            ['workspace', item.name, 'publish']
              .concat('publish-branch', this.release.newBranch)
              .concat(preids ? ['--tag', preids] : [])
              .concat(this.registryExec),
          );
        }
        if (this.release.packageManager === 'pnpm') {
          return this.release.exec(
            'pnpm',
            ['--filter', item.name, 'publish']
              .concat(preids ? ['--tag', preids] : [])
              .concat(['publish-branch', this.release.newBranch])
              .concat(['--no-git-checks'])
              .concat(this.registryExec),
          );
        }
        const { stdout: version } = await this.release.exec('npm', ['-v'].concat(this.registryExec), { stdio: 'pipe' });
        const { major: npmMajor } = this.release.processSemverVersion(version);
        if ((npmMajor as unknown as number) * 1 < 7) {
          return this.release.exec(
            'npm',
            ['publish'].concat(preids ? ['--tag', preids] : []).concat(this.registryExec),
            { cwd: item.pkgDir },
          );
        }
        return this.release.exec(
          'npm',
          ['publish', `--workspace=${item.name}`].concat(preids ? ['--tag', preids] : []).concat(this.registryExec),
        );
      }),
    );
  }

  async flow() {
    try {
      // 1. 检查
      await this.check();
      // 2. 发布
      await this.pub();
      const publishInfo = `${this.packagesList
        .map(
          pkg =>
            `${this.publishUser} 已经成功发布 <font color="comment">${pkg.name}@${
              pkg.nextVersion
            }</font>.\n<font color="info">更新日志:</font> \n${pkg.changelog || ''}`,
        )
        .join('\n')}\n<font color='info'><@all></font>`;
      this.release.hooks.release.call({
        release: true,
        data: { msgtype: 'markdown', markdown: { content: publishInfo } },
      });
      await this.release.toPromise(this.release.hooks.releaseAsync, {
        release: true,
        data: { msgtype: 'markdown', markdown: { content: publishInfo } },
      });
    } catch (e) {
      this.release.logger.error(e);
      try {
        await this.packagesList.reduce(
          async (prev: Promise<any>, module: PackageInfo) =>
            prev.then(() =>
              this.release
                .exec('npm', ['view', `${module.name}@${module.nextVersion}`].concat(this.registryExec), {
                  stdio: 'pipe',
                })
                // @ts-ignore
                .then(({ stdout }) => {
                  if (stdout) {
                    return this.release.exec(
                      'npm',
                      ['unpublish', `${module.name}@${module.nextVersion}`].concat(this.registryExec),
                      {
                        stdio: 'pipe',
                      },
                    );
                  }
                  return Promise.resolve();
                })
                .catch(() => Promise.resolve()),
            ),
          Promise.resolve(),
        );

        const { stdout: branch } = await this.release.exec('git', ['rev-parse', '--abbrev-ref', 'HEAD'], {
          stdio: 'pipe',
        });
        await this.release.exec('git', ['checkout', '-']);
        await this.release.exec('git', ['branch', '-d', branch]);
        await this.release.exec('git', ['push', 'origin', '-d', branch]);
        await Promise.all(
          this.packagesList.map(async ({ tag }) => {
            if (!tag) return;
            await this.release.exec('git', ['tag', '-d', tag]);
            await this.release.exec('git', ['push', 'origin', '-d', tag]);
          }),
        );
        this.release.hooks.release.call({
          release: false,
          data: {
            msgtype: 'markdown',
            markdown: {
              content: `组件库发布失败\n${e.message}\n,环境已回滚,请检查代码重新发\n<@all>`,
            },
          },
        });
      } catch (err) {
        this.release.logger.error(err);
        this.release.hooks.release.call({
          release: false,
          data: {
            msgtype: 'markdown',
            markdown: {
              content: `组件库发布失败,\n${e.message}\n,环境回滚失败,\n${err.message}\n,请手动回滚环境\n<@all>`,
            },
          },
        });
      }
    }
  }
}

export default (release: Release, packagesInfo: PackagesInfo) => new Warehouse(release, packagesInfo);
