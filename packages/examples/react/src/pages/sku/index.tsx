import { useCallback, useEffect, useState } from 'react';
import { TiSku, TiGoodsCard, TiSkuSelector, TiButton, TiPopup, TiPopupTitlebar } from '@titian-design/react';
import Page, { OptionType } from '../../components/page';
import { mockSkuData, mockSkuDataSingle } from './mockData.js';
import './index.less';

const options: OptionType[] = [
  {
    type: 'radio',
    name: 'Style',
    key: 'styleType',
    desc: '风格',
    value: 0,
    list: [
      {
        value: 0,
        label: '潮流',
        attr: {
          cssVariable: { '--base-radius-size': '-999px', '--capsule-radius-size': '-999px' },
        },
      },
      {
        value: 1,
        label: '通用',
        attr: {
          cssVariable: { '--base-radius-size': '0px', '--capsule-radius-size': '0px' },
        },
      },
      {
        value: 2,
        label: '可爱',
        attr: {
          cssVariable: { '--base-radius-size': '8px', '--capsule-radius-size': '999px' },
        },
      },
    ],
  },
  {
    type: 'radio',
    name: 'Default',
    key: 'spec',
    desc: '默认值',
    value: 'sku',
    list: [
      { value: 'sku', label: 'skuId', hiddenItems: ['optionIds'] },
      { value: 'options', label: 'optionIds', hiddenItems: ['skuId'] },
    ],
  },
  {
    type: 'radio',
    name: 'optionIds',
    key: 'optionIds',
    desc: 'Option Ids',
    value: 'a',
    list: [
      { value: 'a', label: `['1']`, attr: { value: null, optionIds: ['1'] } },
      { value: 'b', label: `['1', '3']`, attr: { value: null, optionIds: ['1', '3'] } },
      { value: 'c', label: `['2', '3']`, attr: { value: null, optionIds: ['2', '3'] } },
    ],
  },
  {
    type: 'radio',
    name: 'Sku Id',
    key: 'skuId',
    desc: 'Sku Id',
    value: '1',
    list: [
      { value: '1', label: '1', attr: { value: '1', optionIds: [] } },
      { value: '2', label: '2', attr: { value: '2', optionIds: [] } },
      { value: '3', label: '3', attr: { value: '3', ooptionIds: [] } },
      { value: '4', label: '4', attr: { value: '4', ooptionIds: [] } },
      { value: '5', label: '5', attr: { value: '5', ooptionIds: [] } },
    ],
  },
];

const TiSkuPage: React.FC<Record<string, never>> = () => {
  const [attrs, setAttrs] = useState<any>({});

  const [visible, setVisible] = useState(false);

  const onChange = useCallback(
    (event: any) => {
      const newAttrs = event;
      console.log('onChange', event);
      setAttrs({ ...attrs, ...newAttrs });
    },
    [attrs],
  );

  const onClose = (event: any) => {
    setVisible(false);
  };

  const onTap = (event: any) => {
    console.log('onTap');
    setVisible(true);
  };

  const onTiChange = (event: any) => {
    console.log('onTiChange', event.detail);
  };

  const onTiOptionChange = (event: any) => {
    console.log('onTiOptionChange', event.detail);
  };

  return (
    <div style={attrs.cssVariable}>
      <Page options={options} change={onChange}>
        <TiButton onClick={onTap}>展示sku</TiButton>
      </Page>
      <div>
        <TiPopup visible={visible} position="bottom" onClose={onClose}>
          <TiPopupTitlebar variant="mini-close" onClose={onClose} />
          <div className="sku-wrapper">
            <TiSkuSelector
              onTiChange={onTiChange}
              onTiOptionChange={onTiOptionChange}
              skus={mockSkuData.skus}
              specs={mockSkuData.specs}
              value={attrs.value}
              optionIds={attrs.optionIds}
            />
          </div>

          {/* <TiSku {...attrs} onTiChange={onTiChange}>
            {attrs.hasContentSlot && <div className="sku-slot-content">内容插槽</div>}
          </TiSku> */}
        </TiPopup>
      </div>
    </div>
  );
};

export default TiSkuPage;
