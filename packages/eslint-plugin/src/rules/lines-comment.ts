import type { Rule, SourceCode } from 'eslint';
import type { Comment, Program } from 'estree';

/**
 * Return an array with with any line numbers that are empty.
 * @param {Array} lines An array of each line of the file.
 * @returns {Array} An array of line numbers.
 */
function getEmptyLineNums(lines: string[]) {
  const emptyLines = lines
    .map((line, i) => ({
      code: line.trim(),
      num: i + 1,
    }))
    .filter(line => !line.code)
    .map(line => line.num);

  return emptyLines;
}

/**
 * Return an array with with any line numbers that contain comments.
 * @param {Array} comments An array of comment tokens.
 * @returns {Array} An array of line numbers.
 */
function getCommentLineNums(comments: Program['comments']): number[] {
  const lines: number[] = [];

  comments?.forEach(token => {
    const start = token.loc?.start.line;
    const end = token.loc?.end.line;
    if (start && end) {
      lines.push(start, end);
    }
  });
  return lines;
}

export const lineComment: Rule.RuleModule = {
  meta: {
    fixable: 'code',
    messages: {
      before: '单独一行注释需要在注释前面有空行',
      after: '注释需要跟随内容',
    },
  },
  create(context: Rule.RuleContext): Rule.RuleListener {
    return {
      Program(node: Program) {
        const sourceCode: SourceCode = context.getSourceCode();
        const { lines } = sourceCode;
        const { comments } = node;
        /** 相邻合并 */
        const commentList = comments
          ?.reduce((target, token: Comment) => {
            const before = sourceCode.getTokenBefore(token, { includeComments: true });
            const after = sourceCode.getTokenAfter(token, { includeComments: true });
            // 去掉注释与内容同行的情况
            if (
              (before && before.loc?.start.line === token.loc?.start.line) ||
              (after && after.loc?.start.line === token.loc?.start.line)
            ) {
              return target;
            }
            if (target.length === 0) {
              target.push(token);
            } else {
              const last = target[target.length - 1];
              if (Array.isArray(last)) {
                if (before === last[last.length - 1]) {
                  last.push(token);
                } else {
                  target.push(token);
                }
              } else if (before === last) {
                target[target.length - 1] = [last, token];
              } else {
                target.push(token);
              }
            }
            return target;
          }, [] as Array<Comment | Comment[]>)
          .filter(token => {
            // 去掉相连注释
            if (Array.isArray(token)) {
              return false;
            }
            // 去掉关键字注释
            if (/eslint-disable-next-line|ts-ignore|ts-check|ts-expect-error|ts-nocheck|TODO/.test(token.value)) {
              return false;
            }
            const parent = token.range?.[0] && sourceCode.getNodeByRangeIndex(token.range[0]);
            if (!parent) {
              return false;
            }
            const after = sourceCode.getTokenAfter(token, { includeComments: true });
            // 去掉父类Program 全局 && 父类函数体内的注释 && 无后续内容注释
            return parent.type !== 'Program' && parent?.type !== 'BlockStatement' && after?.type !== 'Punctuator';
          });

        const beforeComments = (commentList as Comment[]).filter(token => {
          const parent = token.range?.[0] && sourceCode.getNodeByRangeIndex(token.range[0]);
          // 去掉首行注释
          return token.loc && parent && parent?.loc && token.loc.start.line - parent.loc.start.line !== 1;
        });
        const afterComments = commentList;
        const commentLines = getCommentLineNums(comments);
        const emptyLines = getEmptyLineNums(lines);
        const commentAndEmptyLines = commentLines.concat(emptyLines);
        beforeComments.forEach((token: any) => {
          const prevLineNum = token.loc.start.line - 1;
          //  上一行不是空行或者注释则提示
          if (!commentAndEmptyLines.includes(prevLineNum)) {
            const lineStart = token.range[0] - token.loc.start.column;
            const range: Program['range'] = [lineStart, lineStart];
            context.report({
              node: token,
              messageId: 'before',
              fix(fixer) {
                return fixer.insertTextBeforeRange(range, '\n');
              },
            });
          }
        });
        afterComments?.forEach((token: any) => {
          const nextLineNum = token.loc.end.line + 1;
          if (emptyLines.includes(nextLineNum)) {
            const after = sourceCode.getTokenAfter(token, { includeComments: true });
            if (after?.range && after?.loc) {
              const range: Program['range'] = [token.range[1], after.range[0] - after.loc.start.column];
              context.report({
                node: token,
                messageId: 'after',
                fix(fixer) {
                  return fixer.replaceTextRange(range, '\n');
                },
              });
            }
          }
        });
      },
    };
  },
};
