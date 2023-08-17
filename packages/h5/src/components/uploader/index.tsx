/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, h, Prop, State, Fragment, Event, EventEmitter, Method, Element, Watch } from '@stencil/core';
import { JSXBase } from '@stencil/core/internal';
import { isCustomEvent, stringToAttrStyle, randomString, addShadowRootStyle } from '../common/utils';

import { join, handle } from '../common/utils/namespace';
import XHR, { uploadFile } from '../common/utils/xhr';
import { UploadFileExternal, UploadStatus, UploadCamera, UploadFile, UploadLoadComponentType } from './uploader';

type Params = RequestInit & { url?: string; name: string; header: RequestInit['headers'] };
type UploadFileParams = UploadFileExternal & { key?: UploadFile['key'] };
type BeforeChooseType = (fileList: UploadFileExternal[]) => { accept?: string; capture?: string };

const defaultProps = {
  size: 'small',
  chooseIcon: 'plus',
  chooseText: '上传图片',
  count: 9,
  immediatelyChoose: true,
  uploadExercise: UploadLoadComponentType.LOADING,
  immediately: true,
  accept: '*/*',
  camera: UploadCamera.BACK,
  sourceType: ['album', 'camera'] as ('album' | 'camera')[],
  maxSize: 10 * 1024 * 1024,
} as const;

// TODO: 集成SDK上传
@Component({
  tag: 'ti-uploader',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiUploader {
  @Element() host: HTMLElement;

  @Prop() extCss = '';

  @Prop() size?: 'small' | 'large' = defaultProps.size;

  @Prop() chooseIcon?: string = defaultProps.chooseIcon;

  @Prop() chooseText?: string = defaultProps.chooseText;

  @Prop() uploadExercise?: `${UploadLoadComponentType}` = defaultProps.uploadExercise;

  @Prop() count?: number = defaultProps.count;

  // 选择后立即上传
  @Prop() immediately?: boolean = defaultProps.immediately;

  // 点击后立即选择
  @Prop() immediatelyChoose?: boolean = defaultProps.immediatelyChoose;

  @Prop() disabled?: boolean = false;

  @Prop() defaultValue?: UploadFileParams[] = [];

  @Prop() value: unknown;

  @Prop() preview?: (file: UploadFileExternal, list: UploadFile[]) => void;

  @Prop() choose?: (list: UploadFile[]) => Promise<UploadFileExternal[]>;

  @Prop() beforeChoose?: BeforeChooseType;

  @Prop() afterChoose?: (chooseFileList: UploadFileExternal[], fileList: UploadFileExternal[]) => UploadFileExternal[];

  @Prop() maxSize?: number = defaultProps.maxSize;

  @Prop() upload?: (uploader: TiUploader, key: string) => void;

  @Prop() complete?: (file: UploadFileExternal, list: UploadFileExternal[], action: string) => void;

  @Prop() beforeUpload?: (params: Params, file: UploadFileExternal, list: UploadFileExternal[]) => Params;

  @Prop() afterUpload?: (
    uploader: TiUploader,
    file: UploadFileExternal,
    fileMap: { [key: string]: UploadFileExternal },
  ) => Partial<UploadFileExternal>;

  @Prop() url?: string = '';

  @Prop() imageParams?: { [key: string]: unknown };

  @Prop() videoParams?: { [key: string]: unknown };

  @Prop() fileParams?: { [key: string]: unknown };

  @Prop() imageResultFormat?: (string | number)[] = [];

  @Prop() videoResultFormat?: (string | number)[] = [];

  @Prop() fileResultFormat?: (string | number)[] = [];

  @Prop() accept?: string = defaultProps.accept;

  @Prop() camera?: `${UploadCamera}` = UploadCamera.BACK;

  @Prop() sourceType?: ('album' | 'camera')[] = defaultProps.sourceType; // album': 从相册选图; 'camera': 使用相机

  @Prop() extStyle?: string | JSXBase.HTMLAttributes<Record<string, unknown>>['style'] = '';

  @Prop() extClass?: string = '';

  @Prop() extThumBoxClass?: string = '';

  @Prop() extThumClass?: string = '';

  @Prop() extThumTipClass?: string = '';

  @Prop() extThumImageClass?: string = '';

  @Prop() extThumVideoClass?: string = '';

  @Prop() extThumOtherClass?: string = '';

  @Prop() extActionClass?: string = '';

  @Prop() cols?: number;

  @State() fileKeyList: string[] = [];

  @State() fileMap: Map<string, UploadFile> = new Map();

  @State() progress: Map<string, number> = new Map();

  schedule: Map<string, XHR> = new Map();

  chooseRef!: HTMLTiChooseElement;

  previewRef!: HTMLTiPreviewElement;

  controlled = false;

  uploadNumber = 0;

  @Event({ eventName: 'change', bubbles: false, composed: false }) changeEvent!: EventEmitter<{
    fileList: Omit<Required<UploadFileExternal>, 'size' | 'duration' | 'key' | 'file'>[];
    file: Omit<UploadFile, 'key'> | null;
    uploading: boolean;
  }>;

  @Event({ eventName: 'overlimit', bubbles: false, composed: false }) errorEvent!: EventEmitter<{
    status: string;
    message: string;
  }>;

  @Event({ eventName: 'choose', bubbles: false, composed: false }) chooseEvent!: EventEmitter;

  @Event({ bubbles: false, composed: false }) clickPlus!: EventEmitter;

  @Watch('value')
  updateValue() {
    if (Array.isArray(this.value)) {
      this.controlled = true;
      this.updateData(this.value);
    }
  }

  componentWillLoad() {
    addShadowRootStyle.call(this);
  }

  componentDidLoad() {
    const { value, defaultValue = [] } = this;
    let val: UploadFileParams[] = [];
    if (Array.isArray(value)) {
      this.controlled = true;
      val = value as UploadFileParams[];
    } else {
      val = defaultValue;
    }
    if (val.length > 0) {
      this.updateData(val);
    }
  }

  updateData(val: UploadFileParams[]) {
    const list = val.map(item => ({
      ...item,
      key: typeof item.key !== 'undefined' ? item.key : randomString(),
    }));
    this.fileMap.clear();

    list.reduce((pre, cur) => {
      pre.set(cur.key, cur);
      return pre;
    }, this.fileMap);
    this.schedule.forEach(controller => controller.abort());
    this.schedule.clear();
    this.uploadNumber = 0;
    this.fileKeyList = [...this.fileMap.keys()];
  }

  onChange = (event: CustomEvent<UploadFile[]> | Event) => {
    if (!isCustomEvent(event)) {
      return;
    }
    if (this.disabled) {
      return;
    }
    const fileList = event.detail;
    if (!Array.isArray(fileList) || fileList.length === 0) {
      return;
    }
    if (this.controlled) {
      this.changeEvent.emit({
        file: null,
        uploading: false,
        fileList: this.fileKeyList
          .map(fileName => {
            const { size, duration, key, ...other } = this.fileMap.get(fileName) as UploadFile;
            return {
              ...other,
              poster: other.poster || '',
            };
          })
          .concat(
            fileList.map(file => ({
              path: file.path,
              name: file.name,
              fileType: file.fileType,
              poster: file.poster || '',
              status: file.status,
            })),
          ),
      });
      return;
    }
    fileList.reduce((pre, cur) => {
      pre.set(cur.key, cur);
      return pre;
    }, this.fileMap);
    this.fileKeyList = [...this.fileMap.keys()];
    if (this.immediately) {
      this.setUploadStatus().then(() => {
        this.change();
        this.uploadFileList();
      });
    }
  };

  change(file?: UploadFile) {
    let changefile: Omit<UploadFile, 'key'> | null = null;
    if (file) {
      const { key, ...otherFile } = file;
      changefile = otherFile;
      this.changeEvent.emit({
        file: changefile,
        uploading: this.uploadNumber > 0,
        fileList: this.fileKeyList.map(fileName => {
          const changeFile = this.fileMap.get(fileName) as UploadFile;
          return {
            path: changeFile.path,
            name: changeFile.name,
            fileType: changeFile.fileType,
            poster: changeFile.poster || '',
            status: changeFile.status,
          };
        }),
      });
    }
  }

  setUploadStatus() {
    const { fileKeyList, fileMap } = this;
    fileKeyList.forEach(fileKey => {
      const file = fileMap.get(fileKey);
      if (file && file.status === UploadStatus.CHOSE) {
        file.status = UploadStatus.UPLOAD;
      }
    });
    return new Promise(resolve => {
      resolve(undefined);
    });
  }

  onPreview = (event: Event) => {
    const { preview } = this;
    const { key } = (event.currentTarget as HTMLElement).dataset as { key: string };
    const action = this.fileMap.get(key) as UploadFile;
    if (typeof preview === 'function') {
      preview(action, [...this.fileMap.values()]);
      return;
    }

    const fileList = [...this.fileMap.values()].filter(file => file.fileType === action.fileType);
    const index = fileList.findIndex(file => file.key === action.key);
    this.previewRef.show(fileList, index);
  };

  uploadFileList() {
    [...this.fileMap.keys()].forEach(itemKey => {
      const file = this.fileMap.get(itemKey) as UploadFile;
      if (file.status !== UploadStatus.UPLOAD) {
        return;
      }
      this.uploadNumber += 1;
      if (typeof this.upload === 'function') {
        this.upload(this, file.key);
        return;
      }
      this.uploadFile(file.key);
    });
  }

  setUploadParams(file: UploadFile) {
    const { beforeUpload, url, fileKeyList, imageParams, videoParams, fileParams } = this;
    let params: Params = {
      url,
      name: 'file',
      header: { 'content-type': 'multipart/form-data' },
    };
    if (typeof beforeUpload === 'function') {
      params = beforeUpload(
        params,
        file,
        fileKeyList.map(key => this.fileMap.get(key) as UploadFile),
      );
    } else if (file.fileType === 'image') {
      params = { ...params, ...(imageParams || {}) };
    } else if (file.fileType === 'video') {
      params = { ...params, ...(videoParams || {}) };
    } else {
      params = { ...params, ...(fileParams || {}) };
    }
    return params;
  }

  async uploadFile(fileKey: string) {
    const file = this.fileMap.get(fileKey) as UploadFile;
    const { url, ...params } = this.setUploadParams(file);
    if (!url) {
      throw new Error('url is required');
    }
    const uploadTask = uploadFile({
      ...params,
      url,
      filePath: file.path,
      file: file.file,
      timeout: 10 * 1000,
      success: this.uploadSuccess.bind(this, fileKey),
      fail: this.uploadFail.bind(this, fileKey),
      complete: this.uploadComplete.bind(this, fileKey),
    });
    this.uploadPurogressUpdate(fileKey, uploadTask);
  }

  uploadComplete(fileKey: string) {
    this.uploadNumber -= 1;
    if (this.uploadNumber < 0) {
      this.uploadNumber = 0;
    }
    const { fileKeyList, complete } = this;
    if (typeof complete === 'function') {
      const custom = complete(
        this.fileMap.get(fileKey) as UploadFile,
        fileKeyList.map(key => this.fileMap.get(key) as UploadFile),
        'upload',
      );
      if (Array.isArray(custom)) {
        this.fileMap = custom.reduce((prev, next) => {
          prev[next.key] = next;
          return prev;
        }, {});
        this.change(this.fileMap.get(fileKey));
        return;
      }
    }

    this.change(this.fileMap.get(fileKey));
  }

  uploadPurogressUpdate(fileKey: string, uploadTask: XHR) {
    uploadTask.onProgressUpdate((progress: number) => {
      this.progress.set(fileKey, progress);
      this.progress = new Map(this.progress);
    });
    this.schedule.set(fileKey, uploadTask);
  }

  uploadFail(fileKey: string) {
    const file = this.fileMap.get(fileKey) as UploadFile;
    this.fileMap.set(fileKey, {
      ...file,
      status: UploadStatus.FAIL,
    });
    this.progress.set(fileKey, 0);
    this.progress = new Map(this.progress);
  }

  uploadSuccess(fileKey: string, res: any) {
    const { afterUpload, imageResultFormat = [], videoResultFormat = [], fileResultFormat = [] } = this;
    if (typeof afterUpload === 'function') {
      const afterParams = afterUpload(res, this.fileMap.get(fileKey) as UploadFile, Object.fromEntries(this.fileMap));
      this.progress.set(fileKey, 0);

      this.fileMap.set(fileKey, {
        ...(this.fileMap.get(fileKey) as UploadFile),
        status: UploadStatus.DONE,
        ...afterParams,
      });
      return;
    }
    if (res.statusCode !== 200) {
      this.uploadFail(fileKey);
      return;
    }
    let result: {
      path?: string;
      poster?: string;
    } = {
      path: '',
    };
    const response: { [key: string]: unknown } = res.data;

    let formatList: (string | number)[] = [];
    if (this.fileMap.get(fileKey)?.fileType === 'image') {
      formatList = imageResultFormat;
    } else if (this.fileMap.get(fileKey)?.fileType === 'video') {
      formatList = videoResultFormat;
    } else {
      formatList = fileResultFormat;
    }
    formatList = formatList.filter(Boolean);
    if (formatList.length > 0) {
      try {
        result.path = formatList.reduce((target, key) => target[key] as typeof response, response) as unknown as string;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn('format error', e);
      }
    }
    if (!result.path) {
      if (typeof response === 'string') {
        result = {
          path: response,
        };
      } else if (
        typeof response === 'object' &&
        response &&
        response.code === 200 &&
        typeof response.data === 'object' &&
        typeof (response.data as { [key: string | number]: unknown }).path === 'string'
      ) {
        result = response.data as {
          path?: string;
          poster?: string;
        };
      } else {
        this.uploadFail(fileKey);
        return;
      }
    }
    this.progress.set(fileKey, 0);
    const file = this.fileMap.get(fileKey) as UploadFile;
    this.fileMap.set(fileKey, {
      ...file,
      ...result,
      status: UploadStatus.DONE,
    });

    this.fileMap = new Map(this.fileMap);
  }

  onDelete = (event: CustomEvent) => {
    if (this.disabled) {
      return;
    }
    const { key } = (event.target as HTMLElement).dataset as { key: string };
    if (this.controlled) {
      if (this.controlled) {
        this.changeEvent.emit({
          file: null,
          uploading: false,
          fileList: [...this.fileMap.values()]
            .filter(item => item.key !== key)
            .map(file => ({
              path: file.path,
              name: file.name,
              fileType: file.fileType,
              poster: file.poster || '',
              status: file.status,
            })),
        });
        return;
      }
      return;
    }
    this.cacalUploadFile(key);
  };

  cacalUploadFile(fileKey: string) {
    const { fileKeyList, complete } = this;
    if (fileKeyList.findIndex(item => item === fileKey) === -1) {
      return;
    }
    const file = this.fileMap.get(fileKey) as UploadFile;
    const fileList = fileKeyList.filter(item => item !== fileKey);
    if (file.status === UploadStatus.UPLOAD) {
      this.schedule.get(fileKey)?.abort();
      this.uploadNumber -= 1;
      if (this.uploadNumber < 0) {
        this.uploadNumber = 0;
      }
    }
    this.fileKeyList = fileList;
    this.fileMap.delete(fileKey);
    this.schedule.delete(fileKey);
    this.progress.delete(fileKey);
    file.status = UploadStatus.CANCEL;

    if (typeof complete === 'function') {
      const custom = complete(
        this.fileMap.get(fileKey) as UploadFile,
        fileList.map(key => this.fileMap.get(key) as UploadFile),
        'delete',
      );
      if (Array.isArray(custom)) {
        this.fileMap = custom.reduce((prev, next) => {
          prev[next.key] = next;
          return prev;
        }, {});
        this.change(this.fileMap.get(fileKey));
      }
    }
    this.change(file);
  }

  @Method()
  async submit() {
    const { disabled, immediately = defaultProps.immediately } = this;

    if (disabled || immediately) {
      return;
    }
    this.setUploadStatus().then(() => {
      this.change();
      this.uploadFileList();
    });
  }

  @Method()
  async onSelect() {
    this.chooseRef.onSelect();
  }

  onChoose = () => {
    this.chooseEvent.emit();
  };

  onClickPlus = () => {
    this.clickPlus.emit();
  };

  onError = (event: CustomEvent<{ status: string; message: string }>) => {
    this.errorEvent.emit(event.detail);
  };

  extThumbnailCss = ``;

  private computedStyle(cols, extStyle) {
    const style = {};
    if (cols) {
      style['--uploader-columns-count'] = cols < 6 ? cols : 6;
    }
    return { ...style, ...stringToAttrStyle(extStyle) };
  }

  render() {
    const {
      accept = defaultProps.accept,
      camera = defaultProps.camera,
      sourceType = defaultProps.sourceType,
      size = defaultProps.size,
      chooseIcon = defaultProps.chooseIcon,
      chooseText = defaultProps.chooseText,
      count = defaultProps.count,
      uploadExercise = defaultProps.uploadExercise,
      disabled,
      choose,
      afterChoose,
      beforeChoose,
      maxSize,
      fileKeyList,
      fileMap,
      extClass = '',
      extStyle = '',
      extThumBoxClass = '',
      extThumClass = '',
      extThumTipClass = '',
      extThumImageClass = '',
      extThumVideoClass = '',
      extThumOtherClass = '',
      extActionClass = '',
      cols,
      computedStyle,
      immediatelyChoose,
    } = this;
    const total = fileKeyList.length;
    return (
      <>
        <div
          class={`${join('uploader')} ${handle('uploader', [
            disabled ? 'disabled' : '',
            size === 'large' ? 'large' : 'small',
            cols ? 'cols' : '',
          ])} ${extClass}`}
          style={computedStyle(cols, extStyle)}
          part={extClass}
        >
          {fileKeyList.map(fileKey => {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            const { size: _, ...obj } = fileMap.get(fileKey) as UploadFile;
            return (
              <ti-thumbnail
                cols={cols}
                uploadExercise={uploadExercise}
                {...obj}
                size={size}
                onPreview={this.onPreview}
                data-key={fileKey}
                onDelete={this.onDelete}
                progress={this.progress.get(fileKey) || 0}
                extClass={this.extCss}
                extThumClass={extThumClass}
                extThumTipClass={extThumTipClass}
                extThumImageClass={extThumImageClass}
                extThumVideoClass={extThumVideoClass}
                extThumOtherClass={extThumOtherClass}
                ext-css={this.extThumbnailCss}
                exportparts={`${extThumBoxClass},${extThumClass},${extThumTipClass},${extThumImageClass},${extThumVideoClass},${extThumOtherClass}`}
              />
            );
          })}
          {total < count ? (
            <ti-choose
              cols={cols}
              size={size}
              count={count}
              chooseIcon={chooseIcon}
              chooseText={chooseText}
              onChange={this.onChange}
              onChoose={this.onChoose}
              onClickPlus={this.onClickPlus}
              onError={this.onError}
              fileKeyList={fileKeyList}
              fileMap={fileMap}
              choose={choose}
              afterChoose={afterChoose}
              beforeChoose={beforeChoose}
              immediatelyChoose={immediatelyChoose}
              maxSize={maxSize}
              accept={accept}
              camera={camera}
              sourceType={sourceType}
              extClass={extActionClass}
              exportparts={extActionClass}
              ref={el => {
                if (el) {
                  this.chooseRef = el;
                }
              }}
            />
          ) : null}
        </div>
        <ti-preview
          ref={preview => {
            if (preview) {
              this.previewRef = preview;
            }
          }}
        />
      </>
    );
  }
}
