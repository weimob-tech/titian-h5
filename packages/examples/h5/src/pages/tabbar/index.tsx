import { useEffect, useRef, useState } from 'react';
import Page, { OptionType } from '../../components/page';

interface TabbarAttrsProps {
  separation: string;
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
  const tabbarRef = useRef<HTMLTiTabbarElement>();
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
      <ti-tabbar
        ref={div => (tabbarRef.current = div)}
        value={1}
        separation={attrs.separation}
        ext-class="tab-bar"
        onSelect={() => {
          console.log(111);
          debugger;
        }}
      >
        {attrs.group.map((item, index) => {
          return (
            <ti-tabbar-item
              key={`${item.icon}-${index}`}
              active-color={attrs.color}
              icon={item.icon}
              title={item.title}
            />
          );
        })}
      </ti-tabbar>
    </Page>
  );
};

export default Tabbar;
