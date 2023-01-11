/* eslint-disable class-methods-use-this */
type IAnyObject = Record<string, any>;

type UploadFileParams = {
  name: string;
  url: string;
  header?: IAnyObject;
  complete: (...agrn: unknown[]) => void;
  success: (...agrn: unknown[]) => void;
  fail: (...agrn: unknown[]) => void;
  timeout?: number;
  [key: string]: any;
};

type XHRParams = {
  url: string;
  method?: 'get' | 'post' | 'put' | 'delete' | 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  header?: IAnyObject;
  timeout?: number;
  responseType?: XMLHttpRequestResponseType;
  complete?: () => void;
  success?: () => void;
  fail?: () => void;
};
export default class XHR {
  #xhr: XMLHttpRequest;

  complete: () => void = () => {};

  success: (response?: any) => void = () => {};

  fail: (response?: any) => void = () => {};

  body: any;

  progress: ((params: number) => void)[] = [];

  constructor({
    url,
    method = 'GET',
    header,
    body,
    timeout = 10 * 1000,
    responseType = 'json',
    complete,
    success,
    fail,
  }: XHRParams) {
    this.#xhr = new XMLHttpRequest();
    if (complete) {
      this.complete = complete;
    }
    if (success) {
      this.success = success;
    }
    if (fail) {
      this.fail = fail;
    }
    this.#xhr.timeout = timeout;
    this.#xhr.responseType = responseType;

    this.#xhr.upload.addEventListener('progress', this.#updateProgress, false);
    this.#xhr.addEventListener('timeout', this.#transferTimeout);
    this.#xhr.addEventListener('load', this.#transferComplete);
    this.#xhr.addEventListener('error', this.#transferFailed);
    this.#xhr.addEventListener('readystatechange', this.#readystatechange);
    this.#xhr.open(method, url, true);
    if (header) {
      Object.keys(header).forEach(key => {
        this.#xhr.setRequestHeader(key, header[key]);
      });
    }

    this.#xhr.send(body);
  }

  abort() {
    this.#xhr.abort();
  }

  #updateProgress = (event: ProgressEvent) => {
    if (event.lengthComputable) {
      const percent = Math.floor((event.loaded / event.total) * 100);
      this.progress.forEach(fn => {
        fn(percent);
      });
    }
  };

  #transferTimeout = (event: Event) => {
    this.fail(event);
  };

  #transferComplete = () => {
    this.complete();
  };

  #transferFailed = (error: Event) => {
    this.fail(error);
  };

  onProgressUpdate(fn: (params: number) => void) {
    if (!this.progress.some(item => item === fn)) {
      this.progress.push(fn);
    }
  }

  #readystatechange = () => {
    if (this.#xhr.readyState === this.#xhr.DONE) {
      if (this.#xhr.status === 200) {
        // 请求成功
        this.success({
          statusCode: this.#xhr.status,
          data: this.#xhr.response,
        });
      } else {
        this.fail(this.#xhr.response);
      }
    }
  };
}
export function uploadFile(uploadFileParams: UploadFileParams): XHR {
  const { url, name, header = {}, file, data, ...other } = uploadFileParams;
  const formData = new FormData();
  formData.append(name, file);
  Object.keys(data || {}).forEach(key => {
    formData.append(key, data[key]);
  });
  return new XHR({
    ...other,
    url,
    method: 'post',
    header,
    body: formData,
  });
}
