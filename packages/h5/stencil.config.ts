import path from 'path';
import { Config } from '@stencil/core';
import { less } from '@stencil/less';
import { postcss } from '@stencil/postcss';
import { reactOutputTarget as react } from '@stencil/react-output-target';
import { vueOutputTarget } from '@stencil/vue-output-target';
import autoprefixer from 'autoprefixer';
import fs from 'fs-extra';
// @ts-ignore
import pxToViewport from 'postcss-px-to-viewport';
// @ts-ignore
import px2unitsExtra from 'postcss-px2units-extra';

function copyFiles(from: string, to: string) {
  return {
    name: 'copy-files',
    buildEnd() {
      const source = path.join(__dirname, from);
      const target = path.join(__dirname, to);
      fs.copySync(source, target, { overwrite: true });
    },
  };
}

export const config: Config = {
  namespace: 'titian-design',
  outputTargets: [
    react({
      componentCorePackage: '@titian-design/h5',
      proxiesFile: '../h5-react/src/components.ts',
      includeDefineCustomElements: true,
    }),
    vueOutputTarget({
      componentCorePackage: '@titian-design/h5', // i.e.: stencil-library
      proxiesFile: '../h5-vue/src/components.ts',
      includeDefineCustomElements: true,
    }),
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      autoDefineCustomElements: true,
      dir: 'dist-custom-elements',
    },
  ],
  plugins: [
    less(),
    postcss({
      plugins: [
        autoprefixer(),
        pxToViewport({
          viewportWidth: 750,
          viewportHeight: 1334,
          unitPrecision: 5,
          viewportUnit: 'vw',
          selectorBlackList: ['border-width'],
          minPixelValue: 1,
          mediaQuery: false,
          include: [/\/*\.h5\.css/],
          exclude: [/\/*\.pc\.css/],
        }),
        px2unitsExtra({
          include: [/\/*\.pc\.css$/],
          exclude: [/\/*\.h5\.css/],
          targetUnits: 'px',
          divisor: 2,
        }),
      ],
    }),
    copyFiles('src/global/locale', 'locale'),
  ],
  extras: {
    experimentalImportInjection: true,
  },
  testing: {
    // browserHeadless: false,
    verbose: true,
    emulate: [
      {
        viewport: {
          width: 375,
          height: 667,
          isMobile: true,
          hasTouch: true,
        },
      },
    ],
  },
};
