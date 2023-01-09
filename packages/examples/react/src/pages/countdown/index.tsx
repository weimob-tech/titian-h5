import { createRef, useCallback, useMemo, useRef, useState } from 'react';
import { TiCountdown, TiCountdownProps, TiIcon, TimeGroup } from '@titian-design/react';
import type { OptionType } from '../../components/page';
import Page from '../../components/page';

import './index.less';

const hexToRGB = (hex: string, a: number | string) => {
  let alpha = false;
  let h: number | string = hex.slice(hex.startsWith('#') ? 1 : 0);
  if (h.length === 3) {
    h = [...h].map(x => x + x).join('');
  } else if (h.length === 8) {
    alpha = true;
  } else if (h.length === 6) {
  } else {
    return hex;
  }
  h = parseInt(h, 16);
  const isAlpha = alpha || a;
  a = a || `${h & 255}`;
  return `rgb${isAlpha ? 'a' : ''}(${h >>> (alpha ? 24 : 16)}, ${
    (h & (alpha ? 16711680 : 65280)) >>> (alpha ? 16 : 8)
  }, ${(h & (alpha ? 65280 : 255)) >>> (alpha ? 8 : 0)}${isAlpha ? `, ${a}` : ''})`;
};

const options: OptionType[] = [
  {
    type: 'radio',
    name: 'Mode',
    key: 'mode',
    desc: '模式 ',
    value: 'module',
    list: [
      { value: 'number', label: '数字' },
      {
        value: 'module',
        label: '模块',
        attr: { useSlot: true },
      },
    ],
  },
  {
    type: 'color',
    name: 'color',
    key: 'color',
    desc: '颜色 ',
    value: '#fa2c19',
  },
  {
    type: 'radio',
    name: 'Day',
    key: 'day',
    desc: '天数',
    value: false,
    list: [
      { value: false, label: '无' },
      { value: true, label: '有', attr: { format: 'DD 天 HH : mm : ss' } },
    ],
  },
  {
    type: 'radio',
    name: 'Millisecond',
    key: 'second',
    desc: '毫秒',
    value: false,
    list: [
      { value: false, label: '无' },
      { value: true, label: '有', attr: { format: 'HH : mm : ss SSS' } },
    ],
  },
];

interface Attrs extends TiCountdownProps {
  reload?: boolean;
  second?: boolean;
  day?: boolean;
  bgColor?: string;
  color?: string;
}

const STATE = { START: 'start', PAUSE: 'pause' };

type ValueOf<T> = T[keyof T];

interface A extends TimeGroup {}
const CountdownPage: React.FC<Record<string, never>> = () => {
  const [status, setStatus] = useState<ValueOf<typeof STATE>>(STATE.PAUSE);
  const [attrs, setAttrs] = useState<Attrs>({ reload: true } as Attrs);
  const [time, setTime] = useState<A>({});
  const ref = useRef<HTMLTiCountdownElement>(null);
  const style = { '--time-bg-color': attrs.bgColor } as any;

  const onStart = useCallback(() => {
    ref.current?.start().then(() => {
      setStatus(STATE.START);
    });
  }, []);

  const onPause = useCallback(() => {
    ref.current?.pause().then(() => {
      setStatus(STATE.PAUSE);
    });
  }, []);

  const onReset = useCallback(() => {
    ref.current?.reset().then(() => {
      setStatus(STATE.START);
      ref.current?.start();
    });
  }, []);

  const view = useMemo(() => {
    return (
      <div className="custom-panel" style={style}>
        {attrs.day ? (
          <>
            <div className="time day-time">{(time.day || 0) < 10 ? '0' : ''}</div>
            <div className="d day" style={{ color: attrs.color }}>
              天
            </div>
          </>
        ) : null}
        <div className="time">
          {(time.hour || 0) < 10 ? '0' : ''}
          {time.hour}
        </div>
        <div className="d">
          <TiIcon size="24" color={attrs.color} name="colon" />
        </div>
        <div className="time">
          {(time.minute || 0) < 10 ? '0' : ''}
          {time.minute}
        </div>
        <div className="d">
          <TiIcon size="24" color={attrs.color} name="colon" />
        </div>
        <div className="time">
          {(time.second || 0) < 10 ? '0' : ''}
          {time.second}
        </div>
        {attrs.second ? (
          <>
            <div className="d">
              <TiIcon size="24" color={attrs.color} name="colon" />
            </div>
            <div className="time ms">{time.millisecond}</div>
          </>
        ) : null}
      </div>
    );
  }, [attrs, time]);

  return (
    <Page
      center={false}
      options={options}
      change={e => {
        let format = 'HH : mm : ss';
        if (e.day) {
          format = `DD 天 ${format}`;
        }
        if (e.second) {
          format = `${format} SSS`;
        }
        const bgColor = hexToRGB((e.color as string) || '#fa2c19', 0.1);

        setAttrs({ ...e, bgColor, format, reload: true });
      }}
    >
      {/* @ts-ignore */}
      <div className="countdown-container" style={{ '--countdown-color': attrs.color }}>
        {attrs.reload ? (
          <TiCountdown
            // @ts-ignore
            ref={ref}
            onChange={e => setTime(e.detail)}
            extClass="countdown"
            extCss={`.countdown{color: var(--countdown-color, #fa2c19) !important;font-family: font-wemo;}`}
            useSlot={attrs.useSlot}
            time={118888666}
            format={attrs.format}
          >
            {attrs.useSlot ? view : null}
          </TiCountdown>
        ) : null}
        <div className="actions-container">
          {status !== STATE.START ? (
            <img
              onClick={onStart}
              className="action-item"
              src="https://cdn2.weimob.com/saas/@assets/saas-fe-retail-h5-stc/image/titian/play.svg"
            />
          ) : null}
          {status !== STATE.PAUSE ? (
            <img
              onClick={onPause}
              className="action-item"
              src="https://cdn2.weimob.com/saas/@assets/saas-fe-retail-h5-stc/image/titian/pause.svg"
            />
          ) : null}
          <img
            onClick={onReset}
            className="action-item"
            src="https://cdn2.weimob.com/saas/@assets/saas-fe-retail-h5-stc/image/titian/replay.svg"
          />
        </div>
      </div>
    </Page>
  );
};

export default CountdownPage;
