import '../styles/globals.css';
import type { AppProps } from 'next/app';

import { applyPolyfills, defineCustomElements, JSX as LocalJSX } from '@titian-design/h5/loader';
import { HTMLAttributes } from 'react';

type StencilToReact<T> = {
  [P in keyof T]?: T[P] &
    Omit<HTMLAttributes<Element>, 'className'> & {
      class?: string;
    };
};

declare global {
  export namespace JSX {
    interface IntrinsicElements extends StencilToReact<LocalJSX.IntrinsicElements> {}
  }
}
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <ti-row gutter={16} ext-class="aaa">
        <ti-col span={12}>
          <div>1</div>
        </ti-col>
        <ti-col span={4}>2</ti-col>
        <ti-col span={8}>3</ti-col>
      </ti-row>
      <Component {...pageProps} />
    </div>
  );
}

applyPolyfills().then(() => {
  defineCustomElements();
});

export default MyApp;
