import React, { useState } from 'react';
import { TiBackTop, TiBackTopProps, TiCell, TiCellGroup } from 'titian-h5-react';
import Page, { OptionType } from '../../components/page';

import './index.less';

const options: OptionType[] = [
  {
    type: 'radio',
    desc: '模式',
    key: 'mode',
    name: 'Mode',
    value: true,
    list: [
      {
        label: '图标',
        value: true,
      },
      {
        label: '图文',
        value: false,
        attr: { text: '顶部' },
      },
    ],
  },
];

interface Attrs extends TiBackTopProps {}

const BackTopPage: React.FC<Record<string, never>> = () => {
  const [attrs, setAttrs] = useState<Attrs>({});
  return (
    <>
      <Page options={options} change={setAttrs} />
      <TiCellGroup>
        {Array(100)
          .fill(1)
          .map((_i, idx) => (
            <TiCell key={idx} title="向下滑动页面" />
          ))}
      </TiCellGroup>
      <TiBackTop text={attrs.text} extClass="back-top" />
    </>
  );
};

export default BackTopPage;
