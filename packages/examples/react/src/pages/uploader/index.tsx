import { useState } from 'react';
import { TiUploader } from '@titian-design/mobile-react';
import Page, { OptionType } from '../../components/page';
import './index.less';
interface UploaderAttrsProps {
  size: 'small' | 'large';
  count: number;
  uploadText: string;
  url: string;
}
const fileList = [
  {
    path: 'https://www.pourzad.com/Programming/Learn%20Java%20for%20Web%20Development.pdf',
    name: 'Learn Java for Web Development.pdf',
    fileType: 'file',
    poster: '',
    status: 'done',
  },
  {
    path: 'http://v0.cdn.cgmama.com/2021/08/1833615c74f86c0bda6b765b28ce2010.mov',
    name: 'Close Up Shot Rain Drops Falling On Leaves',
    fileType: 'video',
    poster: '',
    status: 'done',
  },
  {
    path: '//hbimg.huabanimg.com/5d7b8cae2077b5bb04b318dbd9edb19921980c37c7482-B1eXch_fw658/format/webp',
    name: '',
    fileType: 'image',
    poster: '',

    status: 'upload',
  },
  {
    path: '',
    name: '',
    fileType: 'image',
    poster: '',
    status: 'fail',
  },
];
const options: OptionType[] = [
  {
    type: 'radio',
    name: 'Word',
    key: 'word',
    value: false,
    desc: '文字',
    list: [
      { value: false, label: '无', attr: { uploadText: '' } },
      { value: true, label: '有', attr: { uploadText: '上传图片' } },
    ],
  },
  {
    type: 'radio',
    name: 'Size',
    key: 'size',
    value: 'small',
    desc: '规格',
    list: [
      { value: 'small', label: 'small' },
      { value: 'large', label: 'large' },
    ],
  },
  {
    type: 'radio',
    name: 'State',
    key: 'state',
    value: 'success',
    desc: '状态',
    list: [
      { value: 'success', label: '成功' },
      { value: 'loading', label: '加载' },
      { value: 'error', label: '失败' },
    ],
  },
  {
    type: 'radio',
    name: 'Limit',
    key: 'count',
    value: 999,
    desc: '限制',
    list: [
      { value: 999, label: '无' },
      { value: 3, label: '限3张图' },
    ],
  },
];
const Uploader = () => {
  const [attrs, setAttrs] = useState<UploaderAttrsProps>({ size: 'large', count: 9, uploadText: 'text', url: '' });
  const change = (attrs: any) => {
    setAttrs({ ...attrs, url: 'http://172.18.50.250:3000/upload' });
  };
  return (
    <Page options={options} change={change}>
      <div className="uploader-page">
        <TiUploader
          extThumBoxClass="ext-thum-box-class"
          url={attrs.url}
          size={attrs.size}
          count={attrs.count}
          choose-text={attrs.uploadText}
        ></TiUploader>
      </div>
    </Page>
  );
};

export default Uploader;
