/* eslint-disable class-methods-use-this */
import { ComponentInterface } from '@stencil/core';
import { JSXBase } from '@stencil/core/internal';

// child: 子节点，descendant: 子孙节点
export type RelationWithChild = 'child' | 'descendant';

// parent: 父节点，ancestor: 祖先节点，
export type RelationWithParent = 'parent' | 'ancestor';

export interface BasicComponentAbstract extends ComponentInterface {
  /**
   * 额外的类名，添加到根节点的元素上
   *
   * @example <ti-row ext-style={color: 'red'} />
   */
  readonly extClass?: string;

  /**
   * 额外的样式
   *
   * @example <ti-row ext-style={color: 'red'} />
   */
  readonly extStyle?: JSXBase.HTMLAttributes<Record<string, unknown>>['style'] | string;

  /**
   * 更新子节点属性
   * @param attrs
   * @param tagName
   */
  updateChildren?: (
    tagName: keyof HTMLElementTagNameMap,
    attrs: Record<string, unknown>,
    type?: RelationWithChild,
  ) => void;
}

export declare type Constructor<T> = new (...args: any[]) => T;

export type Mixin<T> = Constructor<T> | object;

function getMixables(clientKeys: string[], mixin: Mixin<any>, ctorKeys?: string[]) {
  function getMixable(obj: object): PropertyDescriptorMap {
    const map: PropertyDescriptorMap = {};
    Object.getOwnPropertyNames(obj).forEach(key => {
      if (clientKeys.indexOf(key) < 0 && ctorKeys.indexOf(key) < 0) {
        const descriptor = Object.getOwnPropertyDescriptor(obj, key);
        if (descriptor === undefined) return;
        if (descriptor.get || descriptor.set) {
          map[key] = descriptor;
        } else if (typeof descriptor.value === 'function') {
          map[key] = descriptor;
        }
      }
    });
    return map;
  }
  let descriptors: PropertyDescriptorMap = {};
  switch (typeof mixin) {
    case 'object':
      descriptors = getMixable(mixin);
      break;
    case 'function':
      descriptors = getMixable((mixin as Constructor<any>).prototype);
      break;
    default:
      break;
  }
  return descriptors;
}

export function use<T>(SupersType: Constructor<T>) {
  return function useHandler(target: any, prop: string) {
    if (prop === 'this') {
      target.prototype = Object.create(SupersType.prototype, {
        constructor: {
          value: target,
          writable: true,
          configurable: true,
        },
      });
      const targetKeys = Object.getOwnPropertyNames(target.prototype);
      const targetCtorKeys = Object.getOwnPropertyNames(target);
      const mixinMixables = getMixables(targetKeys, SupersType, targetCtorKeys);
      Object.defineProperties(target.constructor.prototype, mixinMixables);
    }
  };
}
