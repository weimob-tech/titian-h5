import { useState } from 'react';
import { TiTooltip } from '@titian-design/mobile-react';
import Page, { OptionType } from '../../components/page';
import './index.less';
interface TooltipAttrsProps {
  justifyContent: string;
  direction: string;
  order: number;
  text: string;
  marginLeft: number;
  style?: number;
}
const options: OptionType[] = [
  {
    type: 'radio',
    name: 'Arrow',
    key: 'direction',
    desc: '箭头 ',
    list: [
      { label: '向上', value: 'bottom' },
      { label: '向下', value: 'top' },
    ],
    value: 'bottom',
  },
  {
    type: 'radio',
    name: 'Style',
    key: 'style',
    desc: '样式 ',
    list: [
      { label: '样式1', value: 1 },
      { label: '样式2', value: 2 },
      { label: '样式3', value: 3 },
    ],
    value: 3,
  },
  {
    type: 'radio',
    name: 'Position',
    key: 'position',
    desc: '位置 ',
    list: [
      { label: '居左', value: 'left', attr: { text: '左侧气泡提示', justifyContent: 'flex-start', order: 2 } },
      {
        label: '居中',
        value: 'center',
        attr: { text: '居中气泡提示信息文案', justifyContent: 'flex-start', marginLeft: 0 },
      },
      { label: '居右', value: 'right', attr: { text: '右侧气泡提示', justifyContent: 'flex-end' } },
    ],
    value: 'left',
  },
];
const Tooltip = () => {
  const [attrs, setAttrs] = useState<TooltipAttrsProps>({
    justifyContent: '',
    direction: '',
    text: '',
    order: 2,
    marginLeft: 0,
  });
  const change = (attrs: any) => {
    if (attrs.mode === 'colors') {
      attrs.color = [attrs.color1, attrs.color2];
    }
    setAttrs(attrs);
  };
  return (
    <Page options={options} change={change}>
      <div className="tooltip-page" style={{ justifyContent: attrs.justifyContent }}>
        <div
          className="tooltip-page-text"
          style={{
            order: attrs.order,
            marginLeft: attrs.marginLeft,
          }}
        >
          {attrs.text}
        </div>

        <TiTooltip
          closeOnClick={true}
          direction={attrs.direction}
          content="每行文字限制十二个中文字每行文字限制十二个中文字每行文字限制十二个中文字"
          extClass="ext-tooltip"
          extContentClass="ext-tooltip-content"
          extInnerClass="ext-tooltip-inner"
        >
          <div style={{ margin: `0 ${attrs.style}px` }}>
            <ti-icon name="info" size="28" />
          </div>
        </TiTooltip>
      </div>
    </Page>
  );
};

export default Tooltip;
