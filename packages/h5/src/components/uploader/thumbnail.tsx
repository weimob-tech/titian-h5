import { Component, h, Prop, EventEmitter, Event, Element } from '@stencil/core';
import { addShadowRootStyle } from '../common/utils';
import { handle, join } from '../common/utils/namespace';

import { UploadType, UploadStatus, UploadLoadComponentType } from './uploader';

const defaultProps = {
  size: 'small',
  uploadExercise: UploadLoadComponentType.PROGRESS,
  uploadExerciseText: '上传中',
  uploadFailText: '上传失败',
  progress: 0,
} as const;

@Component({
  tag: 'ti-thumbnail',
  styleUrls: {
    pc: 'thumbnail.pc.less',
    h5: 'thumbnail.h5.less',
  },
  shadow: true,
})
export class TiUploader {
  @Element() host: HTMLElement;

  @Prop() extCss = '';

  @Prop() disabled?: boolean = false;

  @Prop() fileType = '';

  @Prop() path = '';

  @Prop() status!: `${UploadStatus}`;

  @Prop() name = '';

  @Prop() size?: 'small' | 'large' = defaultProps.size;

  @Prop() uploadExercise?: `${UploadLoadComponentType}` = defaultProps.uploadExercise;

  @Prop() uploadExerciseText?: string = defaultProps.uploadExerciseText;

  @Prop() uploadFailText?: string = defaultProps.uploadFailText;

  @Prop() tip?: string = '';

  @Prop() progress: number = defaultProps.progress;

  @Prop() extClass?: string = '';

  @Prop() extThumClass?: string = '';

  @Prop() extThumTipClass?: string = '';

  @Prop() extThumImageClass?: string = '';

  @Prop() extThumVideoClass?: string = '';

  @Prop() extThumOtherClass?: string = '';

  @Prop() cols?: number;

  @Event({ eventName: 'delete' }) deleteEvent!: EventEmitter;

  @Event({ eventName: 'preview' }) previewEvent!: EventEmitter;

  onPreview = () => {
    this.previewEvent.emit();
  };

  getIconSize = (size, cols) => {
    let iconSize = size === 'large' ? 40 : 30;
    let textSizeName = null;
    if (cols > 4) {
      iconSize = 40;
      textSizeName = 'text-small';
    } else if (cols === 4) {
      iconSize = 44;
      textSizeName = 'text-middle';
    } else if (cols > 0) {
      iconSize = 48;
      textSizeName = 'text-big';
    }
    return { iconSize, textSizeName };
  };

  renderItem() {
    const {
      fileType,
      path,
      status,
      name,
      extThumClass = '',
      extThumImageClass = '',
      extThumVideoClass = '',
      extThumOtherClass = '',
    } = this;
    if (fileType === UploadType.IMAGE) {
      return (
        <div
          style={{ 'background-image': `url(${path})` }}
          part={`${extThumClass} ${extThumImageClass}`}
          onClick={this.onPreview}
          aria-hidden="true"
          class={`${handle('thum', [
            'image',
            status === UploadStatus.FAIL ? '' : 'preview',
          ])} ${extThumClass} ${extThumImageClass}`}
        />
      );
    }
    if (fileType === UploadType.VIDEO) {
      return (
        <div
          part={`${extThumClass} ${extThumVideoClass}`}
          class={`${handle('thum', [
            'video-box',
            status === UploadStatus.FAIL ? '' : 'preview',
          ])} ${extThumClass} ${extThumVideoClass}`}
          onClick={this.onPreview}
          aria-hidden="true"
        >
          <video title={name} class={handle('thum', ['video', status === UploadStatus.FAIL ? '' : 'preview'])}>
            <source src={path} />
            <p>设备不支持</p>
            <track kind="captions" />
          </video>
        </div>
      );
    }
    return (
      <div
        class={`${handle('thum', [
          'name',
          status === UploadStatus.FAIL ? '' : 'preview',
        ])} ${extThumClass} ${extThumOtherClass}`}
        part={`${extThumClass} ${extThumOtherClass}`}
      >
        {name}
      </div>
    );
  }

  renderUpload() {
    const {
      size = defaultProps.size,
      uploadExercise = defaultProps.uploadExercise,
      uploadExerciseText = defaultProps.uploadExerciseText,
      progress = defaultProps.progress,
      cols,
    } = this;
    if (uploadExercise === UploadLoadComponentType.LOADING) {
      const { iconSize, textSizeName } = this.getIconSize(size, cols);
      return (
        <div class={handle('thum', ['loading'])}>
          <ti-loading size={iconSize} class={handle('thum', ['loading-icon'])} />
          {uploadExerciseText && <div class={handle('thum', ['loading-text', textSizeName])}>{uploadExerciseText}</div>}
        </div>
      );
    }

    return <ti-progress class={handle('thum', ['progress'])} value={progress} />;
  }

  renderFail() {
    const { size = defaultProps.size, uploadFailText = defaultProps.uploadFailText, cols } = this;
    const { iconSize, textSizeName } = this.getIconSize(size, cols);
    return (
      <div class={handle('thum', ['fail'])}>
        <ti-icon name="error" size={iconSize} ext-class={handle('thum', ['fail-icon'])} onClick={this.onDelete} />
        {uploadFailText && <div class={handle('thum', ['fail-text', textSizeName])}>{uploadFailText}</div>}
      </div>
    );
  }

  onDelete = () => {
    if (this.disabled) {
      return;
    }
    this.deleteEvent.emit();
  };

  componentWillLoad() {
    addShadowRootStyle.call(this);
  }

  render() {
    const {
      size = defaultProps.size,
      status,
      uploadExercise = defaultProps.uploadExercise,
      tip,
      extClass = '',
      extThumTipClass = '',
      cols,
    } = this;
    return (
      <div class={`${join('thum', [size, cols ? 'cols' : ''])} ${extClass}`} part={extClass}>
        {tip && (
          <div part={extThumTipClass} class={extThumTipClass}>
            {tip}
          </div>
        )}
        {this.renderItem()}
        {status === 'upload' && uploadExercise !== UploadLoadComponentType.NULL && this.renderUpload()}
        {status === 'fail' && this.renderFail()}
        {status !== 'fail' && (
          <div class={handle('thum', ['del'])} onClick={this.onDelete} aria-hidden="true">
            <ti-svg-path-view name="close-double" size={size === 'large' ? 40 : 30} fills={['#9e9e9e', '#fff']} />
          </div>
        )}
      </div>
    );
  }
}
