import axios, { AxiosResponse } from 'axios';

const robot = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=some-key';

export default function webhook(data: Record<string, unknown>): Promise<void> {
  return new Promise((resolve, reject) => {
    axios.post<any, AxiosResponse<{ errcode?: number }>>(robot, data.data).then(res => {
      const { errcode } = res.data;
      if (errcode === 0) {
        resolve();
      } else {
        reject();
      }
    }, reject);
  });
}
