const visit = require('unist-util-visit');

const remarkVariable = options => {
  const siteConfig = options;

  const transformer = tree => {
    visit(tree, ['text', 'code', 'inlineCode'], node => {
      if (node.value.includes('{{')) {
        const { value } = node;

        // 使用正则表达式查找变量占位符
        const regex = /\{\{([^{}]+)\}\}/g;
        let match;
        let modifiedValue = value;

        while ((match = regex.exec(value))) {
          const variable = match[1].trim();
          if (siteConfig[variable] !== undefined) {
            const variableValue = siteConfig[variable];
            modifiedValue = modifiedValue.replace(match[0], variableValue);
          }
          // 将变量占位符替换为实际值
        }
        // 更新节点的值
        node.value = modifiedValue;
      }
    });
  };

  return transformer;
};

module.exports = remarkVariable;
