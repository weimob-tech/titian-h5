import { Rule } from 'eslint';

export const noOptionKey: Rule.RuleModule = {
  create(context: Rule.RuleContext) {
    return {
      Property(node) {
        if ((node?.key as any).name === 'option') {
          context.report({
            node,

            // 不要出现以option为key的对象, 请使用 options 代替
            message: "don't use 'option' as key, please replace with 'options'",
          });
        }
      },
    };
  },
};
