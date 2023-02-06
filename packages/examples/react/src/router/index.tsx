import type { RouteObject } from 'react-router-dom';
import BackTopPage from '../pages/back-top';
import Cell from '../pages/cell';
import Checkbox from '../pages/checkbox';
import Collapse from '../pages/collapse';
import Icon from '../pages/icon';
import { IconListPage } from '../pages/icon-list';
import Layout from '../pages/layout';
import RadioPage from '../pages/radio';
import Empty from '../pages/empty';
import Tabbar from '../pages/tabbar';
import Switch from '../pages/switch';
import Slider from '../pages/slider';

import Tag from '../pages/tag';
import Button from '../pages/button';
import Image from '../pages/image';
import Input from '../pages/input';
import Textarea from '../pages/textarea';
import Root from '../pages/root';
import TransitionPage from '../pages/transition';
import RatePage from '../pages/rate';
import GridPage from '../pages/grid';
import ProgressPage from '../pages/progress';

import Calendar from '../pages/calendar';
import PopupPage from '../pages/popup';
import PopupTitlebar from '../pages/popup-titlebar';

import SwipeCellPage from '../pages/swipe-cell';

import Toast from '../pages/toast';
import Dialog from '../pages/dialog';

import Picker from '../pages/picker';
import DatetimePicker from '../pages/datetime-picker';
import DropdownMenuPage from '../pages/dropdown-menu';
import LoadingPage from '../pages/loading';

import Tooltip from '../pages/tooltip';
import ShareSheet from '../pages/share-sheet';
import ActionSheetPage from '../pages/action-sheet';
import InputNumber from '../pages/input-number';
import CountdownPage from '../pages/countdown';
import BadgePage from '../pages/badge';
import TiNoticeBarPage from '../pages/notice-bar';

import Uploader from '../pages/uploader';
import TiStepsPage from '../pages/steps';
import TiStickyPage from '../pages/sticky';

import TreeSelect from '../pages/treeSelect';
import Sidebar from '../pages/sidebar';
import Divider from '../pages/divider';
import Tabs from '../pages/tabs';
import Search from '../pages/search';
import ScrollView from '../pages/scroll-view';

import Sku from '../pages/sku';
import Price from '../pages/price';

import Cascade from '../pages/cascade';
import { SwiperPage } from '../pages/swiper';
import { PreviewPage } from '../pages/preview';

interface page {
  path: string;
  title: string;
  subTitle: string;
  element?: React.ReactNode;
  skipDisplay?: boolean;
}

export interface Pages {
  groupName: string;
  children: page[];
}

export const config: Pages[] = [
  {
    groupName: '全局组件',
    children: [
      { path: '/image', title: '图片', subTitle: 'Image', element: <Image /> },
      { path: '/icon', title: '图标', subTitle: 'Icon', element: <Icon /> },
      { path: '/button', title: '按钮', subTitle: 'Button', element: <Button /> },
      { path: '/tag', title: ' 标签', subTitle: 'Tag', element: <Tag /> },
      { path: '/cell', title: '单元格', subTitle: 'Cell', element: <Cell /> },
      { path: '/divider', title: '分割线', subTitle: 'Divider', element: <Divider /> },
    ],
  },
  {
    groupName: '布局组件',
    children: [
      { path: '/layout', title: '布局', subTitle: 'Layout', element: <Layout /> },
      { path: '/sticky', title: '粘性布局', subTitle: 'Sticky', element: <TiStickyPage /> },
      { path: '/grid', title: '宫格', subTitle: 'Grid', element: <GridPage /> },
      { path: '/scroll-view', title: '滑动区域', subTitle: 'Scroll View', element: <ScrollView /> },
    ],
  },
  {
    groupName: '表单组件',
    children: [
      { path: '/input', title: '输入框', subTitle: 'Input', element: <Input /> },
      { path: '/textarea', title: '文本域', subTitle: 'Textarea', element: <Textarea /> },
      { path: '/switch', title: '开关', subTitle: 'Switch', element: <Switch /> },
      { path: '/radio', title: '单选框', subTitle: 'Radio', element: <RadioPage /> },
      { path: '/checkbox', title: '多选框', subTitle: 'Checkbox', element: <Checkbox /> },
      { path: '/rate', title: '评分', subTitle: 'Rate', element: <RatePage /> },
      { path: '/slider', title: '滑块', subTitle: 'Slider', element: <Slider /> },
      { path: '/input-number', title: '步进器', subTitle: 'Input-number', element: <InputNumber /> },
      { path: '/uploader', title: '文件上传', subTitle: 'Uploader', element: <Uploader /> },
      { path: '/search', title: '搜索', subTitle: 'Search', element: <Search /> },
      { path: '/picker', title: '选择器', subTitle: 'Picker', element: <Picker /> },
      { path: '/datetime-picker', title: '时间选择', subTitle: 'Datetime-picker', element: <DatetimePicker /> },
      { path: '/calendar', title: '日历', subTitle: 'Calendar', element: <Calendar /> },
      { path: '/cascade', title: '选择器', subTitle: 'cascade', element: <Cascade /> },
    ],
  },
  {
    groupName: '展示组件',
    children: [
      { path: '/countdown', title: '倒计时', subTitle: 'Countdown', element: <CountdownPage /> },
      { path: '/progress', title: '进度条', subTitle: 'Progress', element: <ProgressPage /> },
      { path: '/empty', title: '空态', subTitle: 'Empty', element: <Empty /> },
      { path: '/steps', title: '步骤条', subTitle: 'Steps', element: <TiStepsPage /> },
      { path: '/badge', title: '徽标', subTitle: 'Badge', element: <BadgePage /> },
      { path: '/notice-bar', title: '通告栏', subTitle: 'NoticeBar', element: <TiNoticeBarPage /> },
      { path: '/swiper', title: '轮播', subTitle: 'Swiper', element: <SwiperPage /> },
      { path: '/preview', title: '图片预览', subTitle: 'Preview', element: <PreviewPage /> },
    ],
  },
  {
    groupName: '反馈组件',
    children: [
      { path: '/toast', title: '轻提示', subTitle: 'Toast', element: <Toast /> },
      { path: '/tooltip', title: '文字提示', subTitle: 'Tooltip', element: <Tooltip /> },
      { path: '/popup', title: '弹出层', subTitle: 'Popup', element: <PopupPage /> },
      { path: '/popup-titlebar', title: '弹出标题', subTitle: 'PopupTitlebar', element: <PopupTitlebar /> },

      { path: '/dialog', title: '弹出框', subTitle: 'Dialog', element: <Dialog /> },
      { path: '/action-sheet', title: '动作面板', subTitle: 'ActionSheet', element: <ActionSheetPage /> },
      { path: '/share-sheet', title: '分享面板', subTitle: 'ShareSheet', element: <ShareSheet /> },
      { path: '/collapse', title: '折叠面板', subTitle: 'Collapse', element: <Collapse /> },
      { path: '/dropdown', title: '下拉菜单', subTitle: 'DropdownMenu', element: <DropdownMenuPage /> },
      { path: '/back-top', title: '返回顶部', subTitle: 'BackTop', element: <BackTopPage /> },
      { path: '/transition', title: '过渡动画', subTitle: 'Transition', element: <TransitionPage /> },
      { path: '/loading', title: '加载中', subTitle: 'Loading', element: <LoadingPage /> },
      { path: '/swipe-cell', title: '滑动单元格', subTitle: 'SwipeCell', element: <SwipeCellPage /> },
    ],
  },
  {
    groupName: '导航组件',
    children: [
      { path: '/sidebar', title: '侧边导航', subTitle: 'Sidebar', element: <Sidebar /> },
      { path: '/tree-select', title: '分类导航', subTitle: 'TreeSelect', element: <TreeSelect /> },
      { path: '/tabs', title: '标签页', subTitle: 'Tabs', element: <Tabs /> },
      { path: '/tabbar', title: '标签栏', subTitle: 'Tabbar', element: <Tabbar /> },
    ],
  },
  {
    groupName: '业务组件',
    children: [
      { path: '/sku', title: '商品规格选择 SKU', subTitle: 'Sku', element: <Sku /> },
      { path: '/price', title: '价格 ', subTitle: 'Price', element: <Price /> },
      { path: '/icon-list', title: '图标列表 ', subTitle: 'IconList', element: <IconListPage />, skipDisplay: true },
    ],
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
