import { createWebHashHistory, createRouter, RouterOptions, RouteRecordRaw } from 'vue-router';
import Root from '../pages/root/index.vue';
import ButtonPage from '../pages/button/index.vue';
import CheckboxPage from '../pages/checkbox/index.vue';
import RadioPage from '../pages/radio/index.vue';
import LayoutPage from '../pages/layout/index.vue';
import DropdownMenuPage from '../pages/dropdown-menu/index.vue';
import LoadingPage from '../pages/loading/index.vue';
import SwipeCellPage from '../pages/swipe-cell/index.vue';
import ProgressPage from '../pages/progress/index.vue';
import ShareSheetPage from '../pages/share-sheet/index.vue';
import BackTopPage from '../pages/backtop/index.vue';
import GridPage from '../pages/grid/index.vue';
import ScrollViewPage from '../pages/scroll-view/index.vue';
import CollapsePage from '../pages/collapse/index.vue';
import TransitionPage from '../pages/transition/index.vue';
import PopupPage from '../pages/popup/index.vue';
import PopupTitlebarPage from '../pages/popup-titlebar/index.vue';

import CalendarPage from '../pages/calendar/index.vue';
import CascadePage from '../pages/cascade/index.vue';
import DatetimePickerPage from '../pages/datetime-picker/index.vue';
import DialogPage from '../pages/dialog/index.vue';
import EmptyPage from '../pages/empty/index.vue';

import PickerPage from '../pages/picker/index.vue';
import PricePage from '../pages/price/index.vue';
import RatePage from '../pages/rate/index.vue';
import SliderPage from '../pages/slider/index.vue';
import SwiperPage from '../pages/swiper/index.vue';
import UploaderPage from '../pages/uploader/index.vue';
import TagPage from '../pages/tag/index.vue';
import TooltipPage from '../pages/tooltip/index.vue';
import ToastPage from '../pages/toast/index.vue';
import CellPage from '../pages/cell/index.vue';
import PreviewPage from '../pages/preview/index.vue';
import SidebarPage from '../pages/sidebar/index.vue';
import StepsPage from '../pages/steps/index.vue';
import StickyPage from '../pages/sticky/index.vue';
import SwitchPage from '../pages/switch/index.vue';
import TabbarPage from '../pages/tabbar/index.vue';
import TabsPage from '../pages/tabs/index.vue';
import TextareaPage from '../pages/textarea/index.vue';
import TreeSelectPage from '../pages/tree-select/index.vue';
import ActionSheet from '../pages/action-sheet/index.vue';
import Badge from '../pages/badge/index.vue';
import Countdown from '../pages/countdown/index.vue';
import Icon from '../pages/icon/index.vue';
import Image from '../pages/image/index.vue';
import Divider from '../pages/divider/index.vue';
import Input from '../pages/input/index.vue';
import InputNumber from '../pages/input-number/index.vue';
import Search from '../pages/search/index.vue';
import NoticeBar from '../pages/notice-bar/index.vue';

type page = RouteRecordRaw & {
  path: string;
  title: string;
  subTitle: string;
};

export interface Pages {
  groupName: string;
  children: page[];
}

export const config: Pages[] = [
  {
    groupName: '全局组件',
    children: [
      { path: '/image', title: '图片', subTitle: 'Image', component: Image },
      { path: '/icon', title: '图标', subTitle: 'Icon', component: Icon },
      { path: '/button', title: '按钮', subTitle: 'Button', component: ButtonPage },
      { path: '/tag', title: ' 标签', subTitle: 'Tag', component: TagPage },
      { path: '/cell', title: '单元格', subTitle: 'Cell', component: CellPage },
      { path: '/divider', title: '分割线', subTitle: 'Divider', component: Divider },
    ],
  },
  {
    groupName: '布局组件',
    children: [
      { path: '/layout', title: '布局', subTitle: 'Layout', component: LayoutPage },
      { path: '/sticky', title: '粘性布局', subTitle: 'Sticky', component: StickyPage },
      { path: '/grid', title: '宫格', subTitle: 'Grid', component: GridPage },
      { path: '/scroll-view', title: '滑动区域', subTitle: 'Scroll View', component: ScrollViewPage },
    ],
  },
  {
    groupName: '表单组件',
    children: [
      { path: '/input', title: '输入框', subTitle: 'Input', component: Input },
      { path: '/textarea', title: '文本域', subTitle: 'Textarea', component: TextareaPage },
      { path: '/switch', title: '开关', subTitle: 'Switch', component: SwitchPage },
      { path: '/radio', title: '单选框', subTitle: 'Radio', component: RadioPage },
      { path: '/checkbox', title: '多选框', subTitle: 'Checkbox', component: CheckboxPage },
      { path: '/rate', title: '评分', subTitle: 'Rate', component: RatePage },
      { path: '/slider', title: '滑块', subTitle: 'Slider', component: SliderPage },
      { path: '/input-number', title: '步进器', subTitle: 'Input-number', component: InputNumber },
      { path: '/uploader', title: '文件上传', subTitle: 'Uploader', component: UploaderPage },
      { path: '/search', title: '搜索', subTitle: 'Search', component: Search },
      { path: '/picker', title: '选择器', subTitle: 'Picker', component: PickerPage },
      { path: '/datetime-picker', title: '时间选择', subTitle: 'Datetime-picker', component: DatetimePickerPage },
      { path: '/calendar', title: '日历', subTitle: 'Calendar', component: CalendarPage },
      { path: '/cascade', title: '级连选择器', subTitle: 'cascade', component: CascadePage },
    ],
  },
  {
    groupName: '展示组件',
    children: [
      { path: '/countdown', title: '倒计时', subTitle: 'Countdown', component: Countdown },
      { path: '/progress', title: '进度条', subTitle: 'Progress', component: ProgressPage },
      { path: '/empty', title: '空态', subTitle: 'Empty', component: EmptyPage },
      { path: '/steps', title: '步骤条', subTitle: 'Steps', component: StepsPage },
      { path: '/badge', title: '徽标', subTitle: 'Badge', component: Badge },
      { path: '/notice-bar', title: '通告栏', subTitle: 'NoticeBar', component: NoticeBar },
      { path: '/preview', title: '预览', subTitle: 'Preview', component: PreviewPage },
      { path: '/swiper', title: '轮播', subTitle: 'Swiper', component: SwiperPage },
      { path: '/preview', title: '预览', subTitle: 'Preview', component: Root },
    ],
  },
  {
    groupName: '反馈组件',
    children: [
      { path: '/toast', title: '轻提示', subTitle: 'Toast', component: ToastPage },
      { path: '/tooltip', title: '文字提示', subTitle: 'Tooltip', component: TooltipPage },
      { path: '/popup', title: '弹出层', subTitle: 'Popup', component: PopupPage },
      { path: '/popup-titlebar', title: '弹出标题', subTitle: 'PopupTitlebar', component: PopupTitlebarPage },

      { path: '/dialog', title: '弹出框', subTitle: 'Dialog', component: DialogPage },
      { path: '/action-sheet', title: '动作面板', subTitle: 'ActionSheet', component: ActionSheet },
      { path: '/share-sheet', title: '分享面板', subTitle: 'ShareSheet', component: ShareSheetPage },
      { path: '/collapse', title: '折叠面板', subTitle: 'Collapse', component: CollapsePage },
      { path: '/dropdown', title: '下拉菜单', subTitle: 'DropdownMenu', component: DropdownMenuPage },
      { path: '/back-top', title: '返回顶部', subTitle: 'BackTop', component: BackTopPage },
      { path: '/transition', title: '过渡动画', subTitle: 'Transition', component: TransitionPage },
      { path: '/loading', title: '加载中', subTitle: 'Loading', component: LoadingPage },
      { path: '/swipe-cell', title: '滑动单元格', subTitle: 'SwipeCell', component: SwipeCellPage },
    ],
  },
  {
    groupName: '导航组件',
    children: [
      { path: '/sidebar', title: '侧边导航', subTitle: 'Sidebar', component: SidebarPage },
      { path: '/tree-select', title: '分类导航', subTitle: 'TreeSelect', component: TreeSelectPage },
      { path: '/tabs', title: '标签页', subTitle: 'Tabs', component: TabsPage },
      { path: '/tabbar', title: '标签栏', subTitle: 'Tabbar', component: TabbarPage },
    ],
  },
  {
    groupName: '业务组件',
    children: [
      { path: '/sku', title: '商品规格选择 SKU', subTitle: 'Sku', component: Root },
      { path: '/price', title: '价格 ', subTitle: 'Price', component: PricePage },
    ],
  },
];

const flatPages = (pages: Pages[]): RouterOptions['routes'] => {
  const ret: RouteRecordRaw[] = [];
  pages.forEach(group => {
    group.children.forEach(({ path, component }) => {
      ret.push({ path, component, children: [] });
    });
  });
  return ret;
};

const routes: RouterOptions['routes'] = [{ path: '/', component: Root, props: { config } }, ...flatPages(config)];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
