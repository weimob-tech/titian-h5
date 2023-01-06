import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { TiCol, TiRow } from 'titian-h5-react';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <TiRow gutter={16} ext-class="aaa">
      <TiCol span={12}>
        <div>1</div>
      </TiCol>
      <TiCol span={4}>2</TiCol>
      <TiCol span={8}>3</TiCol>
    </TiRow>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
