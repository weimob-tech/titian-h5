// import { BrowserRouter, Route, Routes } from 'react-router-dom';

// import Cell from '../pages/cell';
// import Checkbox from '../pages/checkbox';
// import Divider from '../pages/divider';
// import Icon from '../pages/icon';
// import Root from '../pages/root';
// import Tag from '../pages/tag';

// const Router = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/">
//           <Route index element={<Root />} />
//           <Route path="/icon" element={<Icon />} />
//           <Route path="/cell" element={<Cell />} />
//           <Route path="/tag" element={<Tag />} />
//           <Route path="/divider" element={<Divider />} />

//           <Route path="/checkbox" element={<Checkbox />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// };
// export default Router;
import type { RouteObject } from 'react-router-dom';
import BackTopPage from '../pages/back-top';
import Cell from '../pages/cell';
import Checkbox from '../pages/checkbox';
import Collapse from '../pages/collapse';
import Icon from '../pages/icon';
import Layout from '../pages/layout';
import RadioPage from '../pages/radio';
import Empty from '../pages/empty';
import Tabbar from '../pages/tabbar';

import Root from '../pages/root';

interface page {
  path: string;
  title: string;
  subTitle: string;
  element?: React.ReactNode;
}

export interface Pages {
  groupName: string;
  children: page[];
}

export const config: Pages[] = [
  {
    groupName: '全局组件',
    children: [
      { path: '/icon', title: '图标', subTitle: 'Icon', element: <Icon /> },
      { path: '/cell', title: '单元格', subTitle: 'Cell', element: <Cell /> },
    ],
  },
  {
    groupName: '布局组件',
    children: [{ path: '/layout', title: '布局', subTitle: 'Layout', element: <Layout /> }],
  },
  {
    groupName: '表单组件',
    children: [
      { path: '/checkbox', title: '多选框', subTitle: 'Checkbox', element: <Checkbox /> },
      { path: '/radio', title: '单选框', subTitle: 'Radio', element: <RadioPage /> },
    ],
  },
  {
    groupName: '展示组件',
    children: [{ path: '/empty', title: '空', subTitle: 'empty', element: <Empty /> }],
  },

  {
    groupName: '反馈组件',
    children: [
      { path: '/backtop', title: '回到顶部', subTitle: 'BackTop', element: <BackTopPage /> },
      { path: '/collapse', title: '折叠面板', subTitle: 'Collapse', element: <Collapse /> },
    ],
  },
  {
    groupName: '导航组件',
    children: [{ path: '/tabbar', title: '标签栏', subTitle: 'Tabbar', element: <Tabbar /> }],
  },
];

const flatPages = (pages: Pages[]): RouteObject[] => {
  const ret: RouteObject[] = [];
  pages.forEach(group => {
    group.children.forEach(({ path, element }) => {
      ret.push({ path, element });
    });
  });
  return ret;
};

export const routes: RouteObject[] = [{ path: '/', element: <Root pages={config} /> }, ...flatPages(config)];
