import { FC, useRef, useState } from 'react';
import { TiImage, TiPreview, TiPreviewProps } from 'titian-h5-react';
import Page, { OptionType } from '../../components/page';
import './index.less';
const options: OptionType[] = [
  {
    desc: '数字',
    key: 'displayNumber',
    type: 'radio',
    name: 'Number',
    value: true,
    list: [
      { label: '展示', value: true },
      { label: '隐藏', value: false },
    ],
  },
];

type Attrs = TiPreviewProps;

export const PreviewPage: FC = () => {
  const [attrs, setAttrs] = useState<Attrs>({});
  const previewPreview = useRef<HTMLTiPreviewElement>();
  return (
    <Page options={options} change={setAttrs}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <TiImage
          src="https://cdn2.weimob.com/saas/@assets/saas-fe-retail-h5-stc/image/titian/default1.png"
          width={180}
          height={180}
          radius={8}
          onClick={async () => {
            await previewPreview.current?.show([
              {
                fileType: 'image',
                path: 'https://cdn2.weimob.com/saas/@assets/saas-fe-retail-h5-stc/image/titian/default1.png',
              },
            ]);
          }}
        >
          预览
        </TiImage>
        <div className="preview-text">点击图片预览</div>
      </div>
      <div style={{ position: 'relative', zIndex: 10 }}>
        <TiPreview displayNumber={attrs.displayNumber} ref={previewPreview} />
      </div>
    </Page>
  );
};
