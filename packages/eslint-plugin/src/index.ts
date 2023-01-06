import { Rule, Linter } from 'eslint';
import { checkLifeItems } from './rules/check-life-items';

import { lineComment } from './rules/lines-comment';
import { noMoreArgs } from './rules/no-more-args';
import { noOptionKey } from './rules/no-option-key';

export interface Config {
  rules?: Record<string, Rule.RuleModule>;
  configs?: Record<string, Linter.BaseConfig>;
}

const config: Config = {
  rules: {
    'no-more-args': noMoreArgs,
    'line-comment': lineComment,
    'check-life-items': checkLifeItems,
    'no-option-key': noOptionKey,
  },
  configs: {
    recommended: {
      env: {
        es6: true,
        browser: true,
        jest: true,
        node: true,
      },
      plugins: ['@typescript-eslint', '@titian'],
      extends: [
        /**
         * airbnb 规范
         * @see https://github.com/lin-123/javascript
         */
        'airbnb',
        'airbnb-typescript',

        /**
         * @typescript-eslint/eslint-plugin 来自官方推荐
         *
         * @see https://github.com/typescript-eslint/typescript-eslint
         * */
        'plugin:@typescript-eslint/recommended',

        'plugin:import/typescript',

        // TODO: 开启官方推荐类型检查
        // 'plugin:@typescript-eslint/recommended-requiring-type-checking',
        /**
         * eslint-config-prettier 关闭风格检查
         *
         * @see https://github.com/prettier/eslint-config-prettier
         * */
        'prettier',
      ],
      rules: {
        // 允许没有默认导出
        'import/prefer-default-export': 'warn',

        // {} 大括号作用域
        'no-lone-blocks': 'off',
        'import/order': [
          'error',
          {
            alphabetize: {
              order: 'asc' /* 按升序排序。选项：['ignore', 'asc', 'desc'] */,
              caseInsensitive: true /* 忽略大小写。选项：[true, false] */,
            },
          },
        ],

        // 自定义
        '@titian/no-more-args': 'error',

        '@titian/no-option-key': 'warn',

        '@titian/check-life-items': 'warn',

        '@titian/line-comment': 'error',
      },
    },
  },
};

export default config;
