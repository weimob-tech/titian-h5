import axios, { AxiosResponse } from 'axios';

const robot = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=954d8e87-afa2-49b5-9805-6f6afa3125ba';

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
