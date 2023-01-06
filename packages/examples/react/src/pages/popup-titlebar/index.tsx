import { useCallback, useState } from 'react';
import { TiPopupTitlebar } from '@titian-design/react';
import Page, { OptionType } from '../../components/page';
import { mergeOptionIntoAttrs } from '../../util';
import './index.less';

const options: OptionType[] = [
  {
    type: 'radio',
    desc: '模式',
    key: 'variant',
    name: 'Mode',
    value: 'with-confirm',
    list: [
      {
        label: 'with-confirm',
        value: 'with-confirm',
      },
      {
        label: 'cancel-only',
        value: 'cancel-only',
      },
      {
        label: 'back-title-cancel',
        value: 'back-title-cancel',
      },
      {
        label: 'mini-close',
        value: 'mini-close',
      },
      {
        label: 'left-title-close',
        value: 'left-title-close',
      },
    ],
  },
  {
    type: 'radio',
    desc: '模式',
    key: 'subtitle',
    name: 'Subtitle',
    value: true,
    list: [
      {
        label: '无',
        value: false,
      },
      {
        label: '有副标题',
        value: true,
      },
    ],
  },
];

interface Attrs {
  subtitle?: string;
  title?: string;
  variant?: string;
}

const PopupTitlebar: React.FC<Record<string, never>> = () => {
  const [attrs, setAttrs] = useState<Attrs>({});

  const [visible, setVisisble] = useState(false);

  const showPopup = useCallback(() => {
    setVisisble(true);
  }, []);

  const change = useCallback(
    (e: Attrs) => {
      const afterAttr = mergeOptionIntoAttrs(options, e);
      setAttrs(afterAttr);
    },
    [visible],
  );

  const onConfirm = () => {
    console.log('onConfirm');
  };
  const onClose = () => {
    console.log('onClose');
  };
  const onCancel = () => {
    console.log('onCancel');
  };
  const onBack = () => {
    console.log('onBack');
  };
  return (
    <div>
      <Page options={options} change={change}>
        <div className="group">
          <div className="group-item">
            <TiPopupTitlebar
              title="标题"
              sub-title={attrs.subtitle ? '副标题' : ''}
              variant={attrs.variant}
              ext-class="ext-class"
              onConfirm={onConfirm}
              onClose={onClose}
              onCancel={onCancel}
              onBack={onBack}
            />
          </div>
        </div>
      </Page>
    </div>
  );
};

export default PopupTitlebar;
