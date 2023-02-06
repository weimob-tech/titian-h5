import * as namespace from '../namespace';

describe('namespace funciton test', () => {
  const name = 'grid';
  it(`join('${name}') to equal '${namespace.PREFIX}-${name}'`, () => {
    expect(namespace.join(name)).toEqual(`${namespace.PREFIX}-${name}`);
  });

  it(`join('${name}', 'item') to equal '${namespace.PREFIX}-${name} ${namespace.PREFIX}-${name}-item'`, () => {
    expect(namespace.join(name, 'item')).toEqual(`${namespace.PREFIX}-${name} ${namespace.PREFIX}-${name}-item`);
  });

  it(`join('${name}', ['content']) to equal '${namespace.PREFIX}-${name} ${namespace.PREFIX}-${name}-content'`, () => {
    expect(namespace.join(name, ['content'])).toEqual(
      `${namespace.PREFIX}-${name} ${namespace.PREFIX}-${name}-content`,
    );
  });

  it(`join('${name}', [{ s1: true, s2: false, s3: '', s4: '1231', s5: ['1231'] }]) to equal '${namespace.PREFIX}-${name} ${namespace.PREFIX}-${name}-s1 ${namespace.PREFIX}-${name}-s4 ${namespace.PREFIX}-${name}-s5'`, () => {
    expect(namespace.join(name, [{ s1: true, s2: false, s3: '', s4: '1231', s5: ['1231'] }])).toEqual(
      `${namespace.PREFIX}-${name} ${namespace.PREFIX}-${name}-s1 ${namespace.PREFIX}-${name}-s4 ${namespace.PREFIX}-${name}-s5`,
    );
  });

  it(`join('${name}', [{ s1: false, s2: false }]) to equal '${namespace.PREFIX}-${name}'`, () => {
    expect(namespace.join(name, [{ s1: false, s2: false }])).toEqual(`${namespace.PREFIX}-${name}`);
  });

  it(`join('${name}', { s1: true, s2: false, s3: '', s4: '1231', s5: ['1231'] }) to equal '${namespace.PREFIX}-${name} ${namespace.PREFIX}-${name}-s1 ${namespace.PREFIX}-${name}-s4 ${namespace.PREFIX}-${name}-s5'`, () => {
    expect(namespace.join(name, { s1: true, s2: false, s3: '', s4: '1231', s5: ['1231'] })).toEqual(
      `${namespace.PREFIX}-${name} ${namespace.PREFIX}-${name}-s1 ${namespace.PREFIX}-${name}-s4 ${namespace.PREFIX}-${name}-s5`,
    );
  });

  it(`handle('${name}') to equal ''`, () => {
    expect(namespace.handle(name)).toEqual('');
  });

  it(`handle('${name}', 'item') to equal '${namespace.PREFIX}-${name}-item'`, () => {
    expect(namespace.handle(name, 'item')).toEqual(`${namespace.PREFIX}-${name}-item`);
  });

  it(`handle('${name}', ['content']) to equal '${namespace.PREFIX}-${name}-content'`, () => {
    expect(namespace.handle(name, ['content'])).toEqual(`${namespace.PREFIX}-${name}-content`);
  });

  it(`handle('${name}', [{ s1: true, s2: false, s3: '', s4: '1231', s5: ['1231'] }]) to equal '${namespace.PREFIX}-${name}-s1 ${namespace.PREFIX}-${name}-s4 ${namespace.PREFIX}-${name}-s5'`, () => {
    expect(namespace.handle(name, [{ s1: true, s2: false, s3: '', s4: '1231', s5: ['1231'] }])).toEqual(
      `${namespace.PREFIX}-${name}-s1 ${namespace.PREFIX}-${name}-s4 ${namespace.PREFIX}-${name}-s5`,
    );
  });

  it(`handle('${name}', { s1: true, s2: false, s3: '', s4: '1231', s5: ['1231'] }) to equal '${namespace.PREFIX}-${name}-s1 ${namespace.PREFIX}-${name}-s4 ${namespace.PREFIX}-${name}-s5'`, () => {
    expect(namespace.handle(name, { s1: true, s2: false, s3: '', s4: '1231', s5: ['1231'] })).toEqual(
      `${namespace.PREFIX}-${name}-s1 ${namespace.PREFIX}-${name}-s4 ${namespace.PREFIX}-${name}-s5`,
    );
  });
});
