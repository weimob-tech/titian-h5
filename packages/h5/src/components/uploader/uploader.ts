export enum UploadType {
  IMAGE = 'image',
  VIDEO = 'video',
  MEDIA = 'media',
  FILE = 'file',
}
export enum UploadApiEnum {
  /** wx.chooseImage */
  CHOOSEIMAGE = 'chooseImage',

  /** wx.chooseVideo */
  CHOOSEVIDEO = 'chooseVideo',

  /** wx.chooseMedia */
  CHOOSEMEDIA = 'chooseMedia',

  /** wx.chooseMessageFile */
  CHOOSEMESSAGEFILE = 'chooseMessageFile',
}

export enum UploadActionType {
  SMALL = 'small',
  LARGE = 'large',
}

export enum UploadStatus {
  /** 已选择 */
  CHOSE = 'chose',

  /** 上传中 */
  UPLOAD = 'upload',

  /** 上传完成 */
  DONE = 'done',

  /** 上传失败 */
  FAIL = 'fail',

  /** 取消上传 */
  CACAL = 'cacal',
}

export enum UploadLoadComponentType {
  /** 上传状态:无 */
  NULL = '',

  /** 上传状态:LOADING */
  LOADING = 'loading',

  /** 上传状态:PROGRESS */
  PROGRESS = 'progress',
}

export interface UploadFile extends UploadFileExternal {
  key: string;
}

export interface UploadFileExternal {
  path: string;
  file?: File;
  poster?: string;
  size: number;
  name: string;
  duration?: number;
  fileType: UploadType;
  status: UploadStatus;
}

export enum UploadCamera {
  /** 后置摄像头 */
  BACK = 'back',

  /** 前置摄像头 */
  FRONT = 'front',
}
