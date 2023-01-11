import { useRef, useState } from 'react';
import { TiCascade, TiPopup, TiButton } from '@titian-design/react';
import Page, { OptionType } from '../../components/page';
import city from './city';

const options: OptionType[] = [
  {
    type: 'radio',
    key: 'mode',
    desc: '模式',
    name: 'Mode',
    list: [
      {
        label: '固定数据',
        value: 'default',
        attr: {
          code: 'code',
          label: 'name',
          cascade: 'children',
          options: city,
          tab: ['省', '市', '区/县'],
        },
      },
      {
        label: '非固定数据',
        value: 'block',
        attr: {
          code: 'areaCode',
          label: 'areaName',
          cascade: 'child',
          tab: ['省', '市', '区/县', '街道'],
        },
      },
    ],

    value: 'default',
  },
  {
    type: 'radio',
    key: 'defaultValue',
    desc: '默认值',
    name: 'DefaultValue',
    list: [
      {
        label: '无默认值',
        value: false,
      },
      {
        label: '默认值',
        value: true,
      },
    ],
    value: false,
  },
];
const Cascade = () => {
  const [refresh, setRefresh] = useState<any>(false);
  const ref = useRef();
  const [attrs, setAttrs] = useState<any>({});
  const change = (nextAttrs: any) => {
    if (nextAttrs.defaultValue) {
      if (nextAttrs.mode === 'default') {
        nextAttrs.value = ['330000', '330200', '330211'];
      } else {
        nextAttrs.value = ['440000', '440200', '440205', '440205455'];
      }
    }

    setAttrs(nextAttrs);
  };

  const getOption = async (value: any) => {
    let rawResponse;
    if (value) {
      rawResponse = await fetch('api3/address/tmp/getAreasByCityId', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ areaCode: value.areaCode }),
      });
    } else {
      rawResponse = await fetch('api3/address/tmp/getProvinceCity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });
    }
    const { data } = await rawResponse.json();
    console.log(data);
    return data;
  };
  const [visible, setVisible] = useState(false);
  const toggleVisible = () => {
    setVisible(prev => !prev);
  };

  const onChangeCascade = (event: CustomEvent) => {
    console.log(event.detail);
  };

  const onChangeSwiperCascade = (event: CustomEvent) => {
    console.log(event.detail);
  };
  return (
    <Page options={options} change={change}>
      <TiButton onClick={toggleVisible}>点击演示</TiButton>
      <TiPopup visible={visible} position="bottom" onClose={toggleVisible} preventScroll={true}>
        {!attrs || Object.keys(attrs).length === 0 || !visible ? null : (
          <TiCascade
            key={attrs.mode + (attrs.value || []).join('')}
            code={attrs.code}
            label={attrs.label}
            cascade={attrs.cascade}
            options={attrs.options}
            tabs={attrs.tab}
            value={attrs.value}
            getOptions={getOption}
            onChange={onChangeCascade}
            onClose={toggleVisible}
            onChangeSwiper={onChangeSwiperCascade}
          ></TiCascade>
        )}
      </TiPopup>
    </Page>
  );
};

export default Cascade;
