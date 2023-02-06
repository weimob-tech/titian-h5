import React, { useEffect, useRef, useState } from 'react';
import './page.less';

interface OptionProps {
  key: string;
  desc: string;
  name: string;
  show?: boolean;
  attr?: { [key: string]: unknown };
}

interface ColorType extends OptionProps {
  type: 'color';
  value?: string;
  list?: { label: string; value: string; [key: string]: unknown }[];
}

interface RadiusType extends OptionProps {
  type: 'radius';
  value: number;
  min?: number;
  max?: number;
}

interface RadioType extends OptionProps {
  type: 'radio';
  value: unknown;
  list: {
    label: string;
    value: unknown;
    hiddenItems?: string[];
    attr?: { [key: string]: unknown };
    [key: string]: unknown;
  }[];
  currentIndex?: number;
}

export type OptionType = ColorType | RadiusType | (RadioType & { [key: string]: unknown });

function formatOption(data: OptionType[]): OptionType[] {
  const options: (OptionType & { show?: boolean })[] = data;
  options.forEach(item => {
    item.show = true;
  });
  options.forEach(element => {
    if (element.type === 'color') {
      element.value = element.value || '#fa2c19';
    } else if (element.type === 'radius') {
      element.value = element.value || 0;
    } else if (element.type === 'radio') {
      const target = element.list.find((item, index) => {
        if (item.value === element.value) {
          element.currentIndex = index;
          return true;
        }
        return false;
      });
      if (!target?.hiddenItems) return;
      target.hiddenItems.forEach(it => {
        const item = options.find(el => el.key === it);
        // 只有当他自己显示的情况下，才能控制他的hiddenItems
        element.show && item && (item.show = false);
      });
    }
  });
  return options;
}

const App = ({
  center = true,
  children,
  options,
  change,
  pageClass = '',
}: {
  pageClass?: string;
  center?: boolean;
  options: OptionType[];
  children?: React.ReactNode;
  change: (params: { [key: string]: unknown }) => void;
}) => {
  const [newOption, setOptions] = useState<OptionType[]>([]);
  const refOption = useRef<OptionType[]>([]);
  const ref = useRef<Set<unknown>>(new Set());
  const sliderKey = useRef('');
  const sendEvent = (eventName = 'change') => {
    const curOption = formatOption(refOption.current);
    const attr = curOption.reduce((prev, curr) => {
      if (!curr.show) return prev;
      prev[curr.key] = curr.value;
      if (curr.attr) {
        prev = { ...prev, ...curr.attr };
      }
      if (curr.type === 'radio') {
        const item = curr.list.find(el => el.value === curr.value);
        const attr = item?.attr;
        if (item && attr) {
          prev = { ...prev, ...attr };
        }
      }
      return prev;
    }, {} as { [key: string]: unknown });
    setOptions(curOption);
    refOption.current = curOption;
    ref.current = new Set(Array.from(ref.current).concat(Object.keys(attr)));
    change(attr);
  };
  const onClick: React.MouseEventHandler<HTMLElement> = event => {
    if (event.currentTarget instanceof HTMLElement) {
      const {
        currentTarget: {
          dataset: { value, key },
        },
      } = event;
      const target = newOption.find(el => el.key === key);
      if (!target) return;
      let val: boolean | string = value as string;
      if (value === JSON.stringify(false)) {
        val = false;
      } else if (value === JSON.stringify(true)) {
        val = true;
      }
      if (target.value == val) {
        sendEvent('repeat');
        return;
      }
      const curOption = newOption.map(el =>
        el.key === key ? { ...el, value: typeof el.value === 'number' ? Number(val) : val } : el,
      );
      refOption.current = curOption as OptionType[];
      sendEvent();
    }
  };

  const onChangeRadius = (event: Event) => {
    if (event.target instanceof HTMLElement) {
      let key = event.target.dataset.key;
      let {
        detail: { value },
      } = event as CustomEvent<HTMLTiSliderElement>;
      key = key || sliderKey.current;

      refOption.current = refOption.current.map(el => (el.key === key ? { ...el, value } : el)) as OptionType[];

      sendEvent();
    }
  };

  useEffect(() => {
    const newOption = formatOption(options);
    setOptions(newOption);
    refOption.current = newOption;
    sendEvent();
  }, [options]);

  return (
    <div className={`page ${pageClass}`}>
      <div className={`page-container ${center ? 'center' : ''}`}>{children}</div>
      <div className="menu">
        <div className="inner-menu">
          <div style={{ height: '25px' }} />
          {newOption.map((item, idx) => {
            if (!item.show) {
              return null;
            }
            return (
              <div className="drawer" key={idx}>
                <div className="title">
                  <div className="desc">{item.desc}</div>
                  <div className="name">{item.name}</div>
                </div>
                {item.type === 'radio' && <Radio id={item.key} list={item.list} value={item.value} onClick={onClick} />}
                {item.type === 'color' && <Color id={item.key} list={item.list} value={item.value} onClick={onClick} />}
                {item.type === 'radius' && (
                  <Radius
                    id={item.key}
                    min={item.min}
                    max={item.max}
                    value={item.value as unknown as number}
                    onChange={onChangeRadius}
                  />
                )}
              </div>
            );
          })}
          <div className="footer" />
        </div>
      </div>
    </div>
  );
};
export default App;

const Radio = ({
  id,
  list,
  value,
  onClick,
}: {
  id: string;
  list: { label: string; value: unknown }[];
  value: unknown;
  onClick: React.MouseEventHandler<HTMLElement>;
}) => {
  return (
    <div className="radio-box">
      <div className="inner-radio-box">
        {list.map((radio, idx) => {
          return (
            <div
              key={idx}
              id={`item-${idx}`}
              data-key={id}
              data-value={radio.value}
              className={`radio ${value === radio.value ? 'checked' : ''}`}
              onClick={onClick}
            >
              {radio.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};
const Color = ({
  id,
  list,
  value,
  onClick,
}: {
  id: string;
  list?: { label: string; value: string }[];
  value: unknown;
  onClick: React.MouseEventHandler<HTMLElement>;
}) => {
  const colors: { label: string; value: string }[] = [
    { label: 'red', value: '#fa2c19' },
    { label: 'orange', value: '#ffa300' },
    { label: 'green', value: '#07c160' },
    { label: 'blue', value: '#2a6ae9' },
    { label: 'grey', value: '#9e9e9e' },
  ];
  return (
    <div className="colors">
      {(list || colors).map((color, idx) => {
        return (
          <div
            key={idx}
            className={`color ${value === color.value ? 'checked' : ''}`}
            data-value={color.value}
            data-key={id}
            onClick={onClick}
            style={{ color: color.value, background: color.value }}
          />
        );
      })}
    </div>
  );
};

const Radius = ({
  id,
  max,
  min,
  value,
  onChange,
}: {
  id: string;
  max?: number;
  min?: number;
  value: number;
  onChange: EventListener;
}) => {
  const ref = useRef<HTMLTiSliderElement>();
  useEffect(() => {
    ref.current?.addEventListener('change', onChange);
    return () => {
      ref.current?.removeEventListener('change', onChange);
    };
  }, []);

  return (
    <div className="radius" data-key={id}>
      <ti-slider ref={elem => (ref.current = elem)} max={max || 100} min={min || 0} value={value} data-key={id} />
    </div>
  );
};
