import { useCallback, useState } from 'react';
import Page, { OptionType } from '../../components/page';
import { addUnit } from '../../util';

import './index.less';

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
        attr: { title: '标题文字', longTitle: '标题文字较长最大字数限制15个中文字符', titleWidth: '400px' },
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

interface Attrs extends Record<string, any> {
  information?: number;
  mode?: number;
  slotName?: string;
  longTitle?: string;
  titleWidth?: string;
}

const Cell: React.FC<Record<string, never>> = () => {
  const [attrs, setAttrs] = useState<Attrs>({});
  const change = useCallback((e: Attrs) => {
    setAttrs(e);
  }, []);
  return (
    <div style={{ backgroundColor: '#f9f9f9' }}>
      <Page options={options} change={change}>
        <div className="cell-container">
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
              <ti-tag ext-style="margin-right: 12px;" style={{ display: 'contents' }} slot="icon">
                标签
              </ti-tag>
            ) : null}
            {attrs.slotName === 'slot-desc' ? (
              <div className="slot-desc" slot="desc">
                {attrs.information === 2 ? (
                  <>
                    <div style={{ color: '#fa2c19' }}>优惠券</div>
                    <ti-divider
                      orientation="vertical"
                      ext-style={{ '--divider-gap': addUnit(28) }}
                      hairline={false}
                    ></ti-divider>
                    编辑
                  </>
                ) : attrs.information === 3 ? (
                  <ti-checkbox default-checked></ti-checkbox>
                ) : attrs.information === 4 ? (
                  <ti-switch></ti-switch>
                ) : attrs.information === 5 ? (
                  <ti-badge static dot></ti-badge>
                ) : attrs.information === 6 ? (
                  <ti-image
                    width="64"
                    height="64"
                    radius="4"
                    src="https://image-c-dev.weimobwmc.com/qa-On6X/8b97cd488593474ba4a8ccaa3c1a493f.png"
                    alt="图片"
                  ></ti-image>
                ) : null}
              </div>
            ) : null}
          </ti-cell>
          {attrs.mode !== 2 ? (
            <ti-cell
              title={attrs.longTitle}
              arrow={attrs.arrow}
              required={attrs.required}
              right-icon={attrs.information === 1 ? 'delete' : ''}
              icon={attrs.icon}
              divider={false}
              title-width={attrs.titleWidth}
            >
              {attrs.slotName === 'slot-icon' ? (
                <ti-tag style={{ display: 'contents' }} slot="icon" ext-style="margin-right: 12px;">
                  标签
                </ti-tag>
              ) : null}

              {attrs.slotName === 'slot-desc' ? (
                <div className="slot-desc" slot="desc">
                  {attrs.information === 2 ? (
                    <>
                      <ti-icon name="plus" ext-style="margin-right: 8px"></ti-icon>
                      添加
                    </>
                  ) : attrs.information === 3 ? (
                    <ti-checkbox default-checked={false}></ti-checkbox>
                  ) : attrs.information === 4 ? (
                    <ti-switch defaultValue></ti-switch>
                  ) : attrs.information === 5 ? (
                    <ti-badge content={999} static></ti-badge>
                  ) : attrs.information === 6 ? (
                    <ti-image
                      width="64"
                      height="64"
                      radius="100%"
                      src="https://image-c-dev.weimobwmc.com/qa-On6X/8b97cd488593474ba4a8ccaa3c1a493f.png"
                      alt="图片"
                    ></ti-image>
                  ) : null}
                </div>
              ) : null}
            </ti-cell>
          ) : null}
        </div>
      </Page>
    </div>
  );
};

export default Cell;
