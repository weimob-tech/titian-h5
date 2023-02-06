import { useCallback, useState } from 'react';
import { TiProgress, TiProgressProps, TiCircleProgress } from '@titian-design/mobile-react';
import Page, { OptionType } from '../../components/page';

import './index.less';

const options: OptionType[] = [
  {
    key: 'mode',
    type: 'radio',
    name: 'Mode',
    desc: '模式',
    list: [
      { label: '直线', value: 'line' },
      { label: '环形', value: 'circle' },
    ],
    value: 'line',
  },
  { key: 'color', type: 'color', name: 'Color', desc: '颜色' },

  {
    key: 'strokeWidth',
    type: 'radio',
    name: 'Size',
    desc: '规格',
    list: [
      { label: 'Medium', value: '8' },
      { label: 'Big', value: '16' },
    ],
    value: '8',
  },
  {
    key: 'information',
    type: 'radio',
    name: 'Information',
    desc: '信息',
    list: [
      { label: '无', value: 0, attr: { showProgress: false } },
      { label: '进度', value: 1, attr: { showProgress: true } },
    ],
    value: 0,
  },
  { key: 'value', type: 'radius', name: 'Progress', desc: '进度', value: 75, max: 100 },
];

interface Attrs extends Partial<TiProgressProps> {
  mode?: 'line' | 'circle';
}

const ProgressPage: React.FC<Record<string, never>> = () => {
  const [attrs, setAttrs] = useState<Attrs>({});
  const [loaded, setLoaded] = useState<boolean>(true);
  const change = useCallback((e: Attrs) => {
    setTimeout(() => {
      setLoaded(false);
      setTimeout(() => {
        setAttrs(e);
        setLoaded(true);
      }, 50);
    }, 50);
  }, []);
  return (
    <Page options={options} change={change}>
      {attrs.mode === 'line' ? (
        <div style={{ width: 267 }}>
          <TiProgress
            value={attrs.value || 0}
            color={attrs.color}
            showProgress={attrs.showProgress}
            strokeWidth={attrs.strokeWidth}
          />
        </div>
      ) : null}
      {attrs.mode === 'circle' ? (
        <div className="circle">
          {loaded && (
            <TiCircleProgress
              value={attrs.value || 0}
              color={attrs.color}
              showProgress={attrs.showProgress}
              strokeWidth={attrs.strokeWidth}
              buffer={(attrs.value || 0) + 10}
            />
          )}
        </div>
      ) : null}
    </Page>
  );
};

export default ProgressPage;
