import type { Rule } from 'eslint';
import type { ArrowFunctionExpression, FunctionDeclaration, FunctionExpression } from 'estree';

function checkDestructure(node: FunctionDeclaration | ArrowFunctionExpression, context: Rule.RuleContext) {
  if (Array.isArray(node?.params)) {
    node.params.forEach(param => {
      if (param.type === 'ObjectPattern') {
        if (param.properties.length >= 4) {
          context.report({
            node,
            message: 'arguments destructuring should not have more than 4 property',
          });
        }
      }
    });
  }
}

export const noMoreArgs: Rule.RuleModule = {
  create(context: Rule.RuleContext): Rule.RuleListener {
    return {
      FunctionDeclaration(node) {
        if (node?.params.length >= 4) {
          context.report({
            node,
            message: `The parameter of ${node?.id?.name} method cannot exceed 4`,
          });
        }
        checkDestructure(node, context);
      },
      ArrowFunctionExpression(node) {
        if (node?.params.length >= 4) {
          context.report({
            node,
            message: `The parameter of ${(node.parent as FunctionExpression)?.id?.name} method cannot exceed 4`,
          });
        }

        checkDestructure(node, context);
      },
    };
  },
};
