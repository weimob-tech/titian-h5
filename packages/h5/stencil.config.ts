import { Config } from '@stencil/core';
import { less } from '@stencil/less';
import { postcss } from '@stencil/postcss';
import { reactOutputTarget as react } from '@stencil/react-output-target';
import { vueOutputTarget } from '@stencil/vue-output-target';
import autoprefixer from 'autoprefixer';
// @ts-ignore
import pxToViewport from 'postcss-px-to-viewport';
// @ts-ignore
import px2unitsExtra from 'postcss-px2units-extra';

export const config: Config = {
  namespace: 'titian-h5',
  outputTargets: [
    react({
      componentCorePackage: 'titian-h5',
      proxiesFile: '../h5-react/src/components.ts',
      includeDefineCustomElements: true,
    }),
    vueOutputTarget({
      componentCorePackage: 'titian-h5', // i.e.: stencil-library
      proxiesFile: '../h5-vue/src/components.ts',
      includeDefineCustomElements: true,
    }),
    {
      type: 'dist',
      esmLoaderPath: '../loader',
      copy: [{ src: 'global/locale', dest: '../../locale' }],
    },
    {
      type: 'dist-custom-elements',
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
  ],
  extras: {
    experimentalImportInjection: true,
  },
};
