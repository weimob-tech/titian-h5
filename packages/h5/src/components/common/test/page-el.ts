import { E2EPage, newE2EPage } from '@stencil/core/testing';
import { JSX } from '../../../components';

interface IDefaultProp {
  children?: Child | Child[] | string;

  [key: string]: any;
}

type TagName = keyof HTMLElementTagNameMap;

interface Child<T = any> {
  tagName: TagName;
  props?: IDefaultProp & T;
}

export class PageEl {
  instance: E2EPage;
  private childrenKey = 'children';

  private tagName: TagName;

  async init<T>(el: Child<T> | Child<T>[]) {
    if (Array.isArray(el)) {
      this.tagName = el[0].tagName;
    } else {
      this.tagName = el.tagName;
    }
    this.instance = await newE2EPage();
    const content = this.generateChildren(el);
    await this.instance.setContent(content);
  }

  async find(query: string) {
    return this.instance.find(`${this.tagName} >>> ${query}`);
  }

  private generateEl(tagName: TagName, defaultProps: IDefaultProp = {}) {
    const attrs = this.processProps<JSX.TiCheckbox>(defaultProps as unknown);
    return `<${tagName} ${attrs}>${this.generateChildren(defaultProps[this.childrenKey])}</${tagName}>`;
  }

  private generateChildren(el: IDefaultProp['children']) {
    if (!el) return '';
    if (typeof el === 'string') return el;
    if (Array.isArray(el)) return el.map(e => this.generateEl(e.tagName, e.props)).join('');
    return this.generateEl(el.tagName, el.props);
  }

  private upperRegexp = /[A-Z]/gm;

  private processKey(key: string): string {
    let ret = '';
    let execResult: RegExpExecArray;
    while ((execResult = this.upperRegexp.exec(key))) {
      ret += key.slice(0, execResult.index); // 获取当前匹配的前面的小写单词
      ret += '-'; // 连接符
      ret += execResult[0].toLowerCase();
      key = key?.substring(execResult.index + 1);
    }
    return `${ret}${key}`;
  }

  private processProps<T>(props: Partial<T>): string {
    if (!props) return '';
    const attrs = Object.keys(props)
      .filter(key => key !== this.childrenKey)
      .map((key: string) => {
        if (props[key] === true) {
          return this.processKey(key);
        }
        const value = props[key];
        return `${this.processKey(key)}='${typeof value === 'object' ? JSON.stringify(value) : value}'`;
      });
    return attrs.join(' ');
  }
}
