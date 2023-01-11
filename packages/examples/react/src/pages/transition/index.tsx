import { useEffect, useState } from 'react';
import { TiTransition, TiTransitionProps } from '@titian-design/react';
import Page, { OptionType } from '../../components/page';

import './index.css';

const options: OptionType[] = [
  {
    key: 'state',
    type: 'radio',
    name: 'State',
    desc: '状态',
    list: [
      { label: 'Fade', value: 'fade' },
      { label: 'fade up', value: 'fade-up' },
      { label: 'fade down', value: 'fade-down' },
      { label: 'fade left', value: 'fade-left' },
      { label: 'fade right', value: 'fade-right' },
      { label: 'slide up', value: 'slide-up' },
      { label: 'slide down', value: 'slide-down' },
      { label: 'slide left', value: 'slide-left' },
      { label: 'slide right', value: 'slide-right' },
    ],
    value: 'fade',
  },
];

interface Attrs {
  state?: TiTransitionProps['name'];
}

const TransitionPage: React.FC<Record<string, never>> = () => {
  const [show, setShow] = useState(false);
  const [showEnd, setShowEnd] = useState(true);
  const [attrs, setAttrs] = useState<Attrs>({});

  useEffect(() => {
    if (attrs.state) {
      setShow(prev => !prev);
      setTimeout(() => {
        setShow(prev => !prev);
        setTimeout(() => {
          setShowEnd(true);
        }, 500);
      }, 1000);
    }
  }, [attrs.state]);

  return (
    <div className="custom-container">
      <Page
        options={options}
        change={(e: Attrs) => {
          if (showEnd) {
            setAttrs(e);
          }
        }}
      >
        <TiTransition show={show} name={attrs.state} extClass="transition-placeholder " />
      </Page>
    </div>
  );
};

export default TransitionPage;
