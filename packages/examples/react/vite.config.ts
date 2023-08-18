import react from '@vitejs/plugin-react';
import pxtovw from 'postcss-px-to-viewport';
import { UserConfigExport, defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const config: UserConfigExport = {
    css: {
      postcss: {
        plugins: [
          pxtovw({
            viewportWidth: 750,
            viewportHeight: 1334,
            unitPrecision: 5,
            viewportUnit: 'vw',
            selectorBlackList: ['border-width'],
            minPixelValue: 1,
            mediaQuery: false,
          }),
        ],
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3001,
      proxy: {
        // 选项写法
        '/api3': {
          target: 'http://saas-caiwu-wlc-map-web.app.qa.internal.weimob.com/ls',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api3/, ''),
        },
      },
    },
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
      },
      rollupOptions: {
        output: {
          entryFileNames: `assets/[name].js`,
          chunkFileNames: `assets/[name].js`,
          assetFileNames: `assets/[name].[ext]`,
        },
      },
    },
    plugins: [react()],
  };

  if (mode === 'production') {
    config.base = '/examples/';
  }
  return config;
});
