import { useState } from 'react';
import Page, { OptionType } from '../../components/page';
interface IconAttrsProps {
  color: string | string[];
  size: string;
  spin?: boolean;
  rotate?: string;
  iconGroup: string[];
}
const options: OptionType[] = [
  {
    type: 'radio',
    desc: '模式',
    key: 'mode',
    name: 'Mode',
    value: 'mono',
    list: [
      {
        label: '单色',
        value: 'mono',
        attr: { iconGroup: ['tabbar-home', 'tabbar-category', 'tabbar-cart', 'tabbar-mine'] },
        hiddenItems: ['color1', 'color2'],
      },
      {
        label: '双色',
        value: 'colors',
        attr: { iconGroup: ['close-double'] },
        hiddenItems: ['color'],
      },
    ],
  },
  {
    type: 'color',
    name: 'color',
    key: 'color',
    desc: '颜色',
    value: '#fa2c19',
  },
  {
    type: 'color',
    name: 'color',
    key: 'color1',
    desc: '颜色1',
    value: '#ffa300',
  },
  {
    type: 'color',
    name: 'color',
    key: 'color2',
    desc: '颜色2',
    value: '#2a6ae9',
  },
  {
    type: 'radius',
    name: 'Size',
    key: 'size',
    desc: '尺寸',
    value: 36,
    min: 20,
    max: 56,
  },
  {
    type: 'radius',
    name: 'Rotate',
    key: 'rotate',
    desc: '旋转',
    value: 0,
    max: 360,
  },
  {
    type: 'radio',
    desc: '旋转动画',
    key: 'spin',
    name: 'Circulate',
    value: false,
    list: [
      {
        label: '关闭',
        value: false,
      },
      {
        label: '开启',
        value: true,
      },
    ],
  },
];
const Icon = () => {
  const [attrs, setAttrs] = useState<IconAttrsProps>({ color: '', size: '', iconGroup: [] });
  const change = (attrs: any) => {
    if (attrs.mode === 'colors') {
      attrs.color = [attrs.color1, attrs.color2];
    }
    console.log(attrs);
    setAttrs(attrs);
  };
  return (
    <Page options={options} change={change}>
      <div
        className="icon-group"
        style={
          {
            '--icon-color': attrs.color,
            '--icon-font-size': attrs.size + 'px',
            '--svg-path-view-size': attrs.size + 'px',
          } as React.CSSProperties
        }
      >
        {attrs.iconGroup.map(item => {
          if (item === 'close-double') {
            return (
              <ti-svg-path-view
                name={item}
                key={item}
                fills={JSON.stringify(attrs.color)}
                rotate={`${attrs.rotate}deg`}
                spin={attrs.spin}
              />
            );
          }
          return (
            <ti-icon name={item} key={item} size={attrs.size} rotate={`${attrs.rotate}deg`} spin={attrs.spin}></ti-icon>
          );
        })}
      </div>
    </Page>
  );
};

export default Icon;
