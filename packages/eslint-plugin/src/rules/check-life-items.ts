import { Rule } from 'eslint';
import { PrivateIdentifier, Property } from 'estree';

const lifeItems = ['created', 'attached', 'ready', 'detached', 'error', 'moved'];

export const checkLifeItems: Rule.RuleModule = {
  create(context: Rule.RuleContext): Rule.RuleListener {
    return {
      Property(node) {
        if (lifeItems.includes((node.key as PrivateIdentifier).name) && node.parent.type === 'ObjectExpression') {
          if (((node.parent.parent as Property).key as PrivateIdentifier)?.name !== 'lifetimes') {
            context.report({
              node,

              // 组件的生命周期函数需放在 lifetimes 字段内进行声明
              message: `${(node?.key as PrivateIdentifier).name} method should be declared in lifetimes field`,
            });
          }
        }
      },
    };
  },
};
