import { createRoot } from 'react-dom/client';
import { HashRouter, useRoutes } from 'react-router-dom';
import { setupTitianReact, TiConfigProvider } from '@titian-design/mobile-react';
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

// @ts-ignore
import('@titian-design/touchemulator').then(module => {
  // vite开发环境和生成环境打包后此处执行不同
  if (module.default) {
    return module.default();
  }
  return (window as any).TouchEmulator();
});
