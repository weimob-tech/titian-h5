import React from 'react';
import ReactDOM from 'react-dom/client';
import { routes } from './router';
import { BrowserRouter, useRoutes } from 'react-router-dom';

import './index.css';
import 'normalize.css';

const App = () => {
  const element = useRoutes(routes);
  return <>{element}</>;
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
