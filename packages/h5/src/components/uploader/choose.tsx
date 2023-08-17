import { Component, h, Prop, EventEmitter, Event, Method } from '@stencil/core';
import { randomString } from '../common/utils/index';
import { join, handle } from '../common/utils/namespace';
import { UploadStatus, UploadCamera, UploadFileExternal, UploadType, UploadFile } from './uploader';

type BeforeChooseType = (fileList: UploadFileExternal[]) => { accept?: string; capture?: string };

const defaultProps = {
  size: 'small',
  chooseIcon: 'plus',
  chooseText: '上传图片',
  accept: '*/*',
  camera: UploadCamera.BACK,
  sourceType: ['album', 'camera'] as ('album' | 'camera')[],
  immediatelyChoose: true,
  maxSize: 10 * 1024 * 1024,
  count: 9,
} as const;

@Component({
  tag: 'ti-choose',
  styleUrls: {
    pc: 'choose.pc.less',
    h5: 'choose.h5.less',
  },
  shadow: true,
})
export class TiUploader {
  @Prop() disabled?: boolean = false;

  @Prop() size?: 'small' | 'large' = defaultProps.size;

  @Prop() chooseIcon?: string = defaultProps.chooseIcon;

  @Prop() chooseText?: string = defaultProps.chooseText;

  @Prop() pure?: boolean = false;

  @Prop() accept?: string = defaultProps.accept;

  @Prop() camera?: `${UploadCamera}` = UploadCamera.BACK;

  @Prop() sourceType?: ('album' | 'camera')[] = defaultProps.sourceType; // album': 从相册选图; 'camera': 使用相机

  @Prop() beforeChoose?: BeforeChooseType;

  @Prop() afterChoose?: (chooseFileList: UploadFileExternal[], fileList: UploadFileExternal[]) => UploadFileExternal[];

  @Prop() immediatelyChoose?: boolean = defaultProps.immediatelyChoose;

  @Prop() count?: number = defaultProps.count;

  @Prop() maxSize?: number = defaultProps.maxSize;

  @Prop() fileKeyList!: string[];

  @Prop() fileMap!: Map<string, UploadFile>;

  @Prop() choose?: (list: UploadFile[]) => Promise<UploadFileExternal[]>;

  @Prop() extClass?: string = '';

  @Prop() cols?: number;

  @Event({ eventName: 'change', bubbles: false, composed: false }) changeEvent!: EventEmitter<UploadFileExternal[]>;

  @Event({ eventName: 'choose', bubbles: false, composed: false }) chooseEvent!: EventEmitter;

  @Event({ eventName: 'error', bubbles: false, composed: false }) errorEvent!: EventEmitter<{
    status: string;
    message: string;
  }>;

  @Event({ bubbles: false, composed: false }) clickPlus!: EventEmitter;

  inputRef!: HTMLInputElement;

  formRef!: HTMLFormElement;

  onChange = (e: Event) => {
    e.stopPropagation();
    if (!(e.target instanceof HTMLInputElement)) {
      return;
    }
    const { target } = e;
    const { files } = target;
    if (files && files.length > 0) {
      const fileList: UploadFileExternal[] = Array.from(files).map((item: File) => {
        const type = item.type.split('/')[0];
        return {
          path: URL.createObjectURL(item),
          file: item,
          name: item.name,
          size: item.size,
          // eslint-disable-next-line no-nested-ternary
          fileType: type === 'image' ? UploadType.IMAGE : type === 'video' ? UploadType.VIDEO : (type as UploadType),
          status: UploadStatus.CHOSE,
          poster: '',
          key: randomString(),
        };
      });
      const { maxSize = defaultProps.maxSize, count = defaultProps.count } = this;
      if (fileList.length + (this.fileKeyList.length || 0) > count) {
        this.errorEvent.emit({ status: 'count', message: '超过最大数量' });
      } else if (fileList.some(item => item.size > maxSize)) {
        this.errorEvent.emit({ status: 'size', message: '超过最大体积' });
      } else {
        let res: UploadFileExternal[] = fileList;
        if (typeof this.afterChoose === 'function') {
          res = this.afterChoose(
            fileList,
            this.fileKeyList.map(key => this.fileMap.get(key) as UploadFile),
          );
        }
        this.changeEvent.emit(res);
      }
    }
    this.formRef?.reset();
  };

  @Method()
  async onSelect(event?: MouseEvent) {
    this.clickInput();
    const { immediatelyChoose = defaultProps.immediatelyChoose, choose, fileKeyList, fileMap } = this;
    if (!immediatelyChoose && event && event.type === 'click') {
      this.chooseEvent.emit();
      return;
    }

    if (typeof choose === 'function') {
      choose(fileKeyList.map(key => fileMap.get(key) as UploadFile)).then(res => {
        this.changeEvent.emit(res.map(item => ({ ...item, key: randomString() })));
      });
      return;
    }
    this.inputRef?.click();
  }

  private clickInput = () => {
    this.clickPlus.emit();
  };

  renderFile() {
    const {
      accept = defaultProps.accept,
      sourceType = defaultProps.sourceType,
      camera = defaultProps.camera,
      immediatelyChoose = defaultProps.immediatelyChoose,
      fileKeyList,
      fileMap,
      disabled,
      clickInput,
    } = this;
    // eslint-disable-next-line no-nested-ternary
    const capture = sourceType.every(item => item === 'camera')
      ? camera === UploadCamera.BACK
        ? 'environment'
        : 'user'
      : undefined;

    let params: ReturnType<BeforeChooseType> = {};
    if (typeof this.beforeChoose === 'function') {
      params = this.beforeChoose(fileKeyList.map(key => fileMap.get(key) as UploadFile));
    }

    return (
      <form
        ref={el => {
          if (el) {
            this.formRef = el;
          }
        }}
      >
        <input
          type="file"
          class={handle('choose', ['input'])}
          style={immediatelyChoose ? {} : { 'z-index': '-1' }}
          ref={el => {
            if (el) {
              this.inputRef = el;
            }
          }}
          onInput={this.onChange}
          disabled={disabled}
          multiple
          accept={params.accept || accept}
          capture={params.capture || capture}
          onClick={clickInput}
        />
      </form>
    );
  }

  render() {
    const {
      size = defaultProps.size,
      chooseIcon = defaultProps.chooseIcon,
      chooseText = defaultProps.chooseText,
      pure,
      choose,
      extClass = '',
      cols,
      immediatelyChoose,
    } = this;
    let iconSize = size === 'large' ? 40 : 30;
    let textSizeName = null;
    if (cols > 4) {
      iconSize = 40;
      textSizeName = 'small';
    } else if (cols === 4) {
      iconSize = 44;
      textSizeName = 'middle';
    } else if (cols > 0) {
      iconSize = 48;
      textSizeName = 'big';
    }
    if (typeof choose === 'function' || !immediatelyChoose) {
      return (
        <div class={join('choose', [size])} onClick={this.onSelect.bind(this)} aria-hidden="true" part={extClass}>
          {chooseIcon && <ti-icon name={chooseIcon} size={iconSize} ext-class={handle('choose', ['icon'])} />}
          {chooseText && <text class={join('choose-text', [textSizeName])}>{chooseText}</text>}
        </div>
      );
    }
    if (pure) {
      return this.renderFile();
    }
    return (
      <div class={join('choose', [size, cols ? 'cols' : ''])}>
        <div class={join('choose', ['box'])}>
          {chooseIcon && <ti-icon name={chooseIcon} size={iconSize} ext-class={handle('choose', ['icon'])} />}
          {chooseText && <text class={join('choose-text', [textSizeName])}>{chooseText}</text>}
          {this.renderFile()}
        </div>
      </div>
    );
  }
}
