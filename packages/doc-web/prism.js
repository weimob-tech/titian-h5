// 数据来源
// https://github.com/FormidableLabs/prism-react-renderer/blob/master/src/themes/palenight.js

const prism = {
  theme: {
    plain: {
      fontWeight: 600,
      color: '#393A34',
      backgroundColor: '#fafafa',
    },
    styles: [
      {
        types: ['comment', 'prolog', 'doctype', 'cdata'],
        style: {
          color: '#757575',
        },
      },
      {
        types: ['namespace'],
        style: {
          opacity: 0.7,
        },
      },
      {
        types: ['string', 'attr-value'],
        style: {
          color: '#BA1809',
        },
      },
      {
        types: ['punctuation', 'operator'],
        style: {
          color: '#393A34',
        },
      },
      {
        types: [
          'entity',
          'url',
          'symbol',
          'number',
          'boolean',
          'variable',
          'constant',
          'property',
          'regex',
          'inserted',
        ],
        style: {
          color: '#03A14F',
        },
      },
      {
        types: ['atrule', 'keyword', 'attr-name', 'selector'],
        style: {
          color: '#DA8B00',
        },
      },
      {
        types: ['function', 'deleted', 'tag'],
        style: {
          color: '#d73a49',
        },
      },
      {
        types: ['function-variable'],
        style: {
          color: '#6f42c1',
        },
      },
      {
        types: ['tag', 'selector', 'keyword'],
        style: {
          color: '#4D6CA9',
        },
      },
    ],
  },
};

module.exports = prism;
