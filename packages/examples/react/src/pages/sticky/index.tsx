import { useCallback, useRef, useState } from 'react';
import { TiButton, TiSticky, TiStickyProps } from 'titian-h5-react';
import Page, { OptionType } from '../../components/page';

import './index.less';

const options: OptionType[] = [
  {
    type: 'radio',
    name: 'Mode',
    key: 'mode',
    desc: '模式 ',
    value: 'basic',
    list: [
      { value: 'basic', label: '基础吸顶', attr: { text: '基础吸顶', offsetTop: 0 } },
      { value: 'offset', label: '吸顶距离', attr: { text: '吸顶距离', offsetTop: 10 } },
      {
        value: 'container',
        label: '指定容器',
        attr: { text: '指定容器', containerClass: 'sticky-container', offsetTop: 0 },
      },
    ],
  },
];

interface Attrs extends TiStickyProps {
  containerClass?: string;
  mode?: string;
  text?: string;
}

const TiStickyPage: React.FC = () => {
  const [attrs, setAttrs] = useState<Attrs>({});
  const [flag, setFlag] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const getContainer = useCallback(() => {
    return () => ref.current;
  }, []);

  const handleChange = useCallback(
    (e: Attrs) => {
      const detail = { top: 0, text: '按钮', ...e };
      if (e.mode === 'container') {
        detail.container = getContainer() as unknown as TiStickyProps['container'];
      } else {
        detail.container = undefined;
      }

      setFlag(false);
      requestAnimationFrame(() => {
        setFlag(true);
        setAttrs(detail);
      });
    },
    [getContainer],
  );
  return (
    <>
      <Page options={options} change={handleChange}>
        {flag ? (
          attrs.container ? (
            <div ref={ref} className={attrs.containerClass}>
              <TiSticky offsetTop={attrs.offsetTop} container={attrs.container}>
                <TiButton>{attrs.text}</TiButton>
              </TiSticky>
            </div>
          ) : (
            <TiSticky usePureCss offsetTop={attrs.offsetTop}>
              <TiButton>{attrs.text}</TiButton>
            </TiSticky>
          )
        ) : null}
        <div className="tip">- 上滑展示区页面，显示吸顶效果 -</div>
      </Page>
      <div className="placeholder" />
    </>
  );
};

export default TiStickyPage;
