import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import { applyPolyfills, defineCustomElements, JSX as LocalJSX } from 'titian-h5/loader';
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
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <ti-row gutter={16} ext-class="aaa">
      <ti-col span={12}>
        <div>1</div>
      </ti-col>
      <ti-col span={4}>2</ti-col>
      <ti-col span={8}>3</ti-col>
    </ti-row>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

applyPolyfills().then(() => {
  defineCustomElements();
});
