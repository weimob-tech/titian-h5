import { useState } from 'react';
import Page, { OptionType } from '../../components/page';

interface CellAttrsProps {
  color: string | string[];
  size: string;
  spin?: boolean;
  rotate?: string;
  iconGroup: string[];
  title: string;
  arrow: boolean;
  required: boolean;
  label: string;
  desc: string;
  icon: string;

  [key: string]: unknown;
}

const options: OptionType[] = [
  {
    key: 'mode',
    type: 'radio',
    name: 'Mode',
    desc: '模式 ',
    list: [
      {
        label: '基础',
        value: 1,
        hiddenItems: ['partner', 'style'],
        attr: { title: '标题文字', longTitle: '标题文字' },
      },
      {
        label: '附加信息',
        value: 2,
        hiddenItems: ['partner', 'information', 'required'],
        attr: { title: '单行限制五' },
      },
      {
        label: '纯标题',
        value: 3,
        hiddenItems: ['style', 'information', 'required'],
        attr: { title: '标题文字', longTitle: '标题文字较长最大字数限制15个中文字符' },
      },
    ],
    value: 1,
  },
  {
    key: 'partner',
    type: 'radio',
    name: 'Title',
    desc: '标题区 ',
    list: [
      { label: '搭图标', value: 1, attr: { icon: 'home' } },
      { label: '搭标签', value: 2, attr: { slotName: 'slot-icon' } },
    ],
    value: 1,
  },
  {
    key: 'required',
    type: 'radio',
    name: 'Required',
    desc: '必填 ',
    list: [
      { label: '非必填', value: false },
      { label: '必填', value: true },
    ],
    value: false,
  },
  {
    key: 'style',
    type: 'radio',
    name: 'Style',
    desc: '样式',
    list: [
      { label: '样式1', value: 1, attr: { label: '附加信息', desc: '首行对齐', alignItems: 'flex-start' } },
      { label: '样式2', value: 2, attr: { label: '附加信息', desc: '居中对齐', alignItems: 'center' } },
      {
        label: '样式3',
        value: 3,
        attr: {
          subDesc: '附加信息',
          desc: '首行对齐',
          alignItems: 'flex-start',
          extStyle: '--cell-label-text-color: #FA2C19',
        },
      },
    ],
    value: 1,
  },
  {
    key: 'information',
    type: 'radio',
    name: 'Information',
    desc: '信息区',
    list: [
      { label: '无', value: 0 },
      { label: '图标', value: 1, hiddenItems: ['arrow'] },
      { label: '按钮', value: 2, hiddenItems: ['arrow'], attr: { slotName: 'slot-desc' } },
      { label: '单复选', value: 3, hiddenItems: ['arrow'], attr: { slotName: 'slot-desc' } },
      { label: '开关', value: 4, hiddenItems: ['arrow'], attr: { slotName: 'slot-desc' } },
      { label: '徽标', value: 5, attr: { slotName: 'slot-desc' } },
      { label: '图片', value: 6, attr: { slotName: 'slot-desc' } },
    ],
    value: 0,
  },
  {
    key: 'arrow',
    type: 'radio',
    name: 'Arrow',
    desc: '箭头',
    list: [
      { label: '无', value: false },
      { label: '有', value: true },
    ],
    value: true,
  },
];
const Cell = () => {
  const [attrs, setAttrs] = useState<CellAttrsProps>({
    color: '',
    size: '',
    iconGroup: [],
    required: false,
    label: '',
    title: '',
    arrow: false,
    desc: '',
    icon: '',
  });
  const change = (attrs: any) => {
    if (attrs.mode === 'colors') {
      attrs.color = [attrs.color1, attrs.color2];
    }
    console.log(attrs);
    setAttrs(attrs);
  };
  return (
    <Page options={options} change={change}>
      <div className="container">
        <ti-cell
          title={attrs.title}
          arrow={attrs.arrow}
          required={attrs.required}
          right-icon={attrs.information === 1 ? 'plus' : ''}
          label={attrs.label}
          sub-desc={attrs.subDesc}
          desc={attrs.desc}
          align-items={attrs.alignItems}
          ext-style={attrs.extStyle}
          icon={attrs.icon}
          divider={attrs.mode !== 2}
        >
          {attrs.slotName === 'slot-icon' ? (
            <ti-tag slot="icon" ext-style="margin-right: 12px;" style={{ display: 'contents' }}>
              标签
            </ti-tag>
          ) : attrs.slotName === 'slot-desc' ? (
            <>
              {attrs.information === 2 && (
                <div className="slot-desc" slot="desc">
                  <div style={{ color: '#FA2C19' }}>优惠券</div>
                  {/* <ti-divider orientation="vertical" hairline="{{ false }}" /> */}
                  编辑
                </div>
              )}
              {attrs.information === 3 && <div className="slot-desc" slot="desc"></div>}
              {attrs.information === 4 && <div className="slot-desc" slot="desc"></div>}
              {attrs.information === 5 && <div className="slot-desc" slot="desc"></div>}
              {attrs.information === 5 && <div className="slot-desc" slot="desc"></div>}
            </>
          ) : null}
        </ti-cell>
      </div>
    </Page>
  );
};

export default Cell;
