import react from '@vitejs/plugin-react';
import pxtovw from 'postcss-px-to-viewport';
import { defineConfig } from 'vite';

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
  plugins: [react()],
});
