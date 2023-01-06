import { createRoot } from 'react-dom/client';

import { HashRouter, useRoutes } from 'react-router-dom';
import { setupTitianReact, TiConfigProvider } from 'titian-h5-react';

//@ts-ignore
import * as TouchEmulatorFn from '@titian/touchemulator';

import { routes } from './router';

import 'normalize.css';
import './index.css';

const App = () => {
  const element = useRoutes(routes);
  return <>{element}</>;
};

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <HashRouter>
    <TiConfigProvider>
      <App />
    </TiConfigProvider>
  </HashRouter>,
);

setupTitianReact();

const importHack = (module: any, moduleName: string) => {
  if (typeof module === 'function') {
    return module;
  }

  if (module.default) {
    return module.default;
  }

  //@ts-ignore
  const wModule = window[moduleName];
  if (wModule) {
    return wModule.default ? wModule.default : wModule;
  }

  if (module) {
    return module;
  }

  throw new Error(`无法处理模块 : ${moduleName}`);
};

// @ts-ignore
new (importHack(TouchEmulatorFn, 'TouchEmulator'))(document.body);
