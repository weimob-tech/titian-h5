import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import pxtovw from 'postcss-px-to-viewport';

// https://vitejs.dev/config/
export default defineConfig({
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
    port: 3002,
    proxy: {
      // 选项写法
      '/api3': {
        target: 'http://saas-caiwu-wlc-map-web.app.qa.internal.weimob.com/ls',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api3/, ''),
      },
    },
  },
  plugins: [vue()],
});
