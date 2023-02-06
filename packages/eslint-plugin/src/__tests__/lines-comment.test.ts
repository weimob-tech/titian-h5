import { RuleTester } from 'eslint';
import { lineComment } from '../rules/lines-comment';

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 6 },
  parser: require.resolve('@typescript-eslint/parser'),
});

const objcodedisabled = `const obj =  {
  /** 无状态 */
  NOT_STATUS: '',
  // @ts-check
  STATUS: 'selected',
};`;

const objcode1 = `const obj =  {
    /** 无状态 */
    NOT_STATUS: '',

    /** 选中状态 */
    STATUS: 'selected',
  };`;

const objcode2 = `const obj =  {
    /** 无状态 */
    NOT_STATUS: '',
    STATUS: 'selected', /** 选中状态 */
  };`;

const objcode3 = `const obj =  {
    /** 无状态 */
    NOT_STATUS: '',

    /** 选中状态 */
  };`;

const objcode4 = `const obj =  {
    // 无状态
    NOT_STATUS: '',

    // 选中状态
    STATUS: 'selected',
  };`;

const objcode5 = `const obj =  {
    // 无状态
    NOT_STATUS: '',
    STATUS: 'selected', // 选中状态
  };`;

const objcode6 = `const obj =  {
    // 无状态
    NOT_STATUS: '',

    // 选中状态
  };`;

const arraycode1 = `const array =  [
    /** 无状态 */
    0,

    /** 选中状态 */
    1,
  ]`;

const arraycode2 = `const array =  [
    /** 无状态 */
    0,

    /** 选中状态 */ 1,
  ]`;

const arraycode3 = `const array =  [
    /** 无状态 */
    0,

    /** 选中状态 */
  ]`;

const arraycode4 = `const array =  [
    // 无状态
    0,

    // 选中状态
    1,
  ]`;

const arraycode5 = `const array =  [
    // 无状态
    0,

    // 选中状态 1,
  ]`;

const arraycode6 = `const array =  [
    // 无状态
    0,

    // 选中状态
  ]`;

const enumcode1 = `enum  StatusEnum {
    /** 无状态 */
    'NOT_STATUS' = '',

    /** 选中状态 */
    'STATUS' = 'selected',
  }`;
const enumcode2 = `enum  StatusEnum {
    /** 无状态 */
    'NOT_STATUS' = '',
    'STATUS' = 'selected',/** 选中状态 */
  }`;
const enumcode3 = `enum  StatusEnum {
    /** 无状态 */
    'NOT_STATUS' = '',

    /** 选中状态 */
  }`;

const enumcode4 = `enum  StatusEnum {
    // 无状态
    'NOT_STATUS' = '',

    // 选中状态
    'STATUS' = 'selected',
  }`;
const enumcode5 = `enum  StatusEnum {
    // 无状态
    'NOT_STATUS' = '',
    'STATUS' = 'selected',// 选中状态
  }`;
const enumcode6 = `enum  StatusEnum {
    // 无状态
    'NOT_STATUS' = '',

    // 选中状态
  }`;
const obj = [objcodedisabled, objcode1, objcode2, objcode3, objcode4, objcode5, objcode6];
const arr = [arraycode1, arraycode2, arraycode3, arraycode4, arraycode5, arraycode6];
const enumcode = [enumcode1, enumcode2, enumcode3, enumcode4, enumcode5, enumcode6];
const valid = [...obj, ...arr, ...enumcode];

const fixObj1 = {
  code: `const obj =  {
        /** 无状态 */
        NOT_STATUS: '',
        /** 选中状态 */

        STATUS: 'selected',
      };`,
  errors: [{ message: `单独一行注释需要在注释前面有空行` }, { message: `注释需要跟随内容` }],
  output: `const obj =  {
        /** 无状态 */
        NOT_STATUS: '',

        /** 选中状态 */
        STATUS: 'selected',
      };`,
};
const fixArr1 = {
  code: `const array =  [
        /** 无状态 */

        0,
        /** 选中状态 */
        1,
      ]`,
  errors: [{ message: `注释需要跟随内容` }, { message: '单独一行注释需要在注释前面有空行' }],
  output: `const array =  [
        /** 无状态 */
        0,

        /** 选中状态 */
        1,
      ]`,
};
const fixEnum1 = {
  code: `enum  StatusEnum {
        // 无状态
        'NOT_STATUS' = '',
        // 选中状态

        'STATUS' = 'selected',
      }`,
  errors: [{ message: `单独一行注释需要在注释前面有空行` }, { message: `注释需要跟随内容` }],
  output: `enum  StatusEnum {
        // 无状态
        'NOT_STATUS' = '',

        // 选中状态
        'STATUS' = 'selected',
      }`,
};
const fixObj = [fixObj1];
const fixArr = [fixArr1];
const fixEnum = [fixEnum1];

const invalid = [...fixObj, ...fixArr, ...fixEnum];

ruleTester.run('lines-around', lineComment, {
  valid,
  invalid,
});
