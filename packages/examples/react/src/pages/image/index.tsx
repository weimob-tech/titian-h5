import { useState } from 'react';
import { TiImage, TiLoading } from '@titian-design/react';
import Page, { OptionType } from '../../components/page';
import './index.css';

const successUrl = 'https://image-c-dev.weimobwmc.com/qa-On6X/8b97cd488593474ba4a8ccaa3c1a493f.png?';
const pendingUrl = 'https://placeholder.com/150';
const failUrl = 'https://cdn2.weimob.com/saas/assets/images/a.jpg';
interface ImageAttrs {
  src: string;
  mode?: string;
  radius?: number;
  useLoadingSlot?: boolean;
  useErrorSlot?: boolean;
  loadingIcon?: string;
  errorIcon?: string;
  slotName?: string;
  loadingSlot?: string;
  errorSlot?: string;
  selectMode?: string;
}

const options: OptionType[] = [
  {
    type: 'radio',
    name: 'Mode',
    desc: '状态',
    key: 'selectMode',
    value: 'normal',
    list: [
      {
        value: 'normal',
        label: '正常',
        attr: {
          loadingIcon: 'default-pic',
          src: successUrl,
        },
        hiddenItems: ['loadingSlot', 'errorSlot'],
      },
      {
        value: 'loading',
        label: '加载中',
        attr: {
          src: pendingUrl,
        },
        hiddenItems: ['errorSlot', 'mode', 'radius'],
      },
      {
        value: 'error',
        label: '加载失败',
        hiddenItems: ['mode', 'loadingSlot', 'radius'],
        attr: { errorIcon: 'default-pic', src: failUrl },
      },
    ],
  },
  {
    type: 'radio',
    name: 'Style',
    key: 'loadingSlot',
    desc: '样式',
    value: 'image',
    attr: { random: () => Math.random() },
    list: [
      {
        value: 'image',
        label: '图片',
        attr: {
          loadingIcon: 'default-pic',
        },
      },
      {
        value: 'icon',
        label: '图标',
        attr: {
          loadingIcon: 'right',
        },
      },
      {
        value: 'loading',
        label: '加载',
        attr: {
          useLoadingSlot: true,
          slotName: 'loading',
        },
      },
      {
        value: 'text',
        label: '文字',
        attr: {
          useLoadingSlot: true,
          slotName: 'text',
        },
      },
    ],
  },
  {
    type: 'radio',
    name: 'Style',
    key: 'errorSlot',
    desc: '样式',
    value: 'icon',
    attr: { random: () => Math.random() },
    list: [
      {
        value: 'image',
        label: '图片',
      },
      {
        value: 'icon',
        label: '图标',
        attr: {
          errorIcon: 'close',
        },
      },
      {
        value: 'text',
        label: '文字',
        attr: {
          useErrorSlot: true,
          slotName: 'error',
        },
      },
    ],
  },
  {
    type: 'radio',
    name: 'Fill Mode',
    key: 'mode',
    desc: '填充 ',
    list: [
      { value: 'cover', label: 'Cover' },
      { value: 'none', label: 'None' },
      { value: 'contain', label: 'Contain' },
      { value: 'scaleToFill', label: 'Fill' },
      { value: 'scaleDown', label: 'Scale Down' },
      { value: 'top left', label: 'top left' },
      { value: 'bottom right', label: 'bottom right' },
      { value: 'scaleToFill', label: 'scaleToFill' },
    ],
    value: 'cover',
  },
  {
    type: 'radius',
    name: 'Radius',
    key: 'radius',
    desc: '圆角',
    value: 30,
  },
];
const Image = () => {
  const [attrs, setAttrs] = useState<ImageAttrs>({ src: '' });
  const [refresh, setRefresh] = useState(true);
  const change = (detail: any) => {
    let src = '';
    if (detail.src) {
      src = detail.src;
    }
    if (detail.random && detail.loadingSlot !== attrs.loadingSlot) {
      src = detail.errorSlot ? failUrl : successUrl;
      if (detail.selectMode === 'loading') {
        setRefresh(false);
        src = detail.src;
      }
      src += Math.random().toString(36).slice(2);
    }
    if (detail.errorSlot !== attrs.errorSlot) {
      src += Math.random().toString(36).slice(2);
    }
    setAttrs({ ...detail, src });
    setTimeout(() => {
      setRefresh(true);
    });
  };
  return (
    <Page options={options} change={change}>
      {attrs.mode === 'cover' && attrs.selectMode === 'normal' && <img className="bg-pic" src={successUrl} />}
      <div className="img-container" style={{ borderRadius: (attrs.radius || 0) / 2 + 'px' } as React.CSSProperties}>
        {refresh && (
          <TiImage
            width="180"
            height="180"
            mode={attrs.mode}
            radius={attrs.radius}
            src={attrs.src}
            use-loading-slot={attrs.useLoadingSlot}
            use-error-slot={attrs.useErrorSlot}
            loading-icon={attrs.loadingIcon}
            error-icon={attrs.errorIcon}
          >
            {attrs.slotName === 'loading' && <TiLoading slot="loading" />}
            {attrs.slotName === 'text' && <div slot="loading">加载中...</div>}
            {attrs.slotName === 'error' && <div slot="error">加载失败</div>}
          </TiImage>
        )}
      </div>
    </Page>
  );
};

export default Image;
