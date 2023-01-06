import { toTypeString, isPlainObject, isPlainArray, isString, isUndefined } from '../index';

describe('util functions', () => {
  it('toTypeString success', () => {
    expect(toTypeString([])).toEqual('[object Array]');
    expect(toTypeString({})).toEqual('[object Object]');
    expect(toTypeString('')).toEqual('[object String]');
    expect(toTypeString(0)).toEqual('[object Number]');
    expect(toTypeString(true)).toEqual('[object Boolean]');
  });

  it('isPlainObject success', () => {
    expect(isPlainObject({})).toBeTruthy();
    expect(isPlainObject([])).toBeFalsy();
  });

  it('isPlainArray success', () => {
    expect(isPlainArray({})).toBeFalsy();
    expect(isPlainArray([])).toBeTruthy();
  });

  it('isString success', () => {
    expect(isString({})).toBeFalsy();
    expect(isString('')).toBeTruthy();
  });

  it('isUndefined success', () => {
    expect(isUndefined(undefined)).toBeTruthy();
    expect(isUndefined('')).toBeFalsy();
  });
});
