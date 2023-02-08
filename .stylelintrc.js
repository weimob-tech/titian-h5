const sortOrderSmacss = require('stylelint-config-property-sort-order-smacss/generate');

module.exports = {
  customSyntax: 'postcss-less',
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  plugins: ['stylelint-order'],
  rules: {
    'declaration-empty-line-before': null,
    // 'max-nesting-depth': [2, {}], // 此规则不适用于less， 因为less中的嵌套层级没有限制, 只适用于css
    'at-rule-no-unknown': null,
    'order/properties-order': [
      sortOrderSmacss({
        emptyLineBefore: 'always',
        noEmptyLineBetween: true,
      }),
    ],
    'font-family-no-missing-generic-family-keyword': null,
    'unit-no-unknown': [true],
    'no-duplicate-selectors': null,
    'value-no-vendor-prefix': null,
    'color-function-notation': 'legacy',
    'declaration-block-no-redundant-longhand-properties': null,
    'selector-class-pattern': null,
    'keyframes-name-pattern': null,
    "selector-pseudo-class-no-unknown": [
      true,
      {
        "ignorePseudoClasses": ["global"]
      }
    ]
  },
};
