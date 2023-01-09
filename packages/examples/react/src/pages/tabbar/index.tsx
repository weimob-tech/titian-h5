import { useState, useRef, useEffect } from 'react';
import { TiTabbar, TiTabbarItem, TiTabbarItemProps } from '@titian-design/react';
import Page, { OptionType } from '../../components/page';
import './index.less';
interface TabbarAttrsProps {
  separation: 'border' | 'shadow' | '';
  color: string;
  group: {
    icon: string;
    title: string;
  }[];
}
const options: OptionType[] = [
  {
    key: 'count',
    type: 'radio',
    name: 'Number',
    desc: '数量',
    list: [
      {
        label: '4个',
        value: 4,
        attr: {
          group: [
            { icon: 'home', title: '首页' },
            { icon: 'arrange', title: '分类' },
            { icon: 'cart', title: '购物车' },
            { icon: 'user-account-setting', title: '我的' },
          ],
        },
      },
      {
        label: '5个',
        value: 5,
        attr: {
          group: [
            { icon: 'home', title: '首页' },
            { icon: 'arrange', title: '分类' },
            { icon: 'cart', title: '购物车' },
            { icon: 'user-account-setting', title: '我的' },
            { icon: 'home', title: '首页' },
          ],
        },
      },
    ],
    value: 5,
  },
  {
    type: 'color',
    name: 'color',
    key: 'color',
    desc: '颜色 ',
    value: '#fa2c19',
  },
  {
    key: 'separation',
    type: 'radio',
    name: 'Divide',
    desc: '上滑分割',
    list: [
      { label: '无', value: '' },
      { label: '线分割', value: 'border' },
      { label: '投影分割', value: 'shadow' },
    ],
    value: '',
  },
];
const Tabbar = () => {
  const [attrs, setAttrs] = useState<TabbarAttrsProps>({ separation: '', color: '', group: [] });
  const change = (attrs: any) => {
    if (attrs.mode === 'colors') {
      attrs.color = [attrs.color1, attrs.color2];
    }
    setAttrs(attrs);
  };

  const tabbarRef = useRef<HTMLElement>();

  useEffect(() => {
    const listen = (e: CustomEvent<unknown>) => {
      console.log(e.detail);
    };
    tabbarRef.current?.addEventListener('select', listen as EventListener);
    return () => {
      tabbarRef.current?.removeEventListener('select', listen as EventListener);
    };
  }, []);
  return (
    <Page options={options} change={change}>
      <div
        className="tabbar-page"
        ref={dev => {
          if (dev) tabbarRef.current = dev;
        }}
      >
        <TiTabbar
          value={1}
          separation={attrs.separation}
          extClass="tab-bar ext-tab-bar"
          // extOptionClass="tab-bar-option"
          // onSelect={e => {
          //   console.log(e);
          // }}
          // options={attrs.group.map(item => ({
          //   ...item,
          //   activeColor: attrs.color,
          // }))}
        >
          {attrs.group.map((item, index) => {
            return (
              <TiTabbarItem
                key={`${item.icon}-${index}`}
                active-color={attrs.color}
                icon={item.icon}
                title={item.title}
                extClass="tab-bar-option"
              />
            );
          })}
        </TiTabbar>
      </div>
    </Page>
  );
};

export default Tabbar;
