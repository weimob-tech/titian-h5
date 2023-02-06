import useIsBrowser from '@docusaurus/useIsBrowser';
import { TiDivider, setupTitianReact } from '@titian-design/mobile-react';
import clsx from 'clsx';
import React, { useState } from 'react';
import CellExample from './cell';
import CheckboxExample from './checkbox';
import CollapseExample from './collapse';
import ColorController from './color';
import CountdownExample from './countdown';
import DialogExample from './dialog';
import styles from './index.module.scss';
import RadiusController from './radius';
import RateExample from './rate';
import SearchExample from './search';
import InputNumberExample from './stepper';
import TabbarExample from './tabbar';
import TagExample from './tag';

function Home() {
  const isBrowser = useIsBrowser();
  if (isBrowser) {
    setupTitianReact({ mode: 'pc' });
  }
  const [style, setStyle] = useState({});
  const [color, setColor] = useState('#fa2c19');
  const changeColor = e => {
    setColor(e.value);
    const [r, g, b] = e.rgb;
    setStyle({
      '--theme-r': r,
      '--theme-g': g,
      '--theme-b': b,
    });
  };
  const changeRadius = radius => {
    setStyle({
      ...style,
      '--capsule-radius-size': `${radius}px`,
      '--base-radius-size': `${radius}px`,
      '--checkbox-radius': `${radius}px`,
    });
  };
  return (
    <div className={clsx(styles.main)} style={style}>
      <div>
        <ColorController value={color} onClick={changeColor} />
        <TiDivider color="#E0E0E0" />
        <RadiusController onClick={changeRadius} />
      </div>
      <div className={clsx(styles.example)}>
        <div>
          <CheckboxExample />
          <TabbarExample color={color} />
          <CellExample />
          <CollapseExample />
        </div>
        <div>
          <CountdownExample />
          <div className={clsx(styles['tag-rate-input'])}>
            <TagExample />
            <InputNumberExample />
            <RateExample />
          </div>
          <DialogExample />
          <SearchExample />
        </div>
      </div>
    </div>
  );
}
export default React.memo(Home);
