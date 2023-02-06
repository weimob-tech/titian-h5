/**
 * @see  https://github.com/leoforfree/cz-
 * commitizen git commit 命令行工具 , 插件  cz-customizable 用于 定义 git  commit 内容格式
 */
module.exports = {
  types: [
    { value: 'feat', name: '✨ feat: 新增一个功能' },
    { value: 'fix', name: '🐞 fix: 修复一个Bug' },
    {
      value: 'style',
      name: '💅 style: 代码格式 （不影响功能，例如空格、分号等格式修正）',
    },
    { value: 'perf', name: '⏫ perf: 改善性能' },
    {
      value: 'build',
      name: '💪 build: 变更项目构建或外部依赖 （例如scopes: webpack、gulp、npm等）',
    },
    { value: 'refactor', name: '🛠  refactor: 代码重构' },
    {
      value: 'ci',
      name: '🎡 ci: 更改持续集成软件的配置文件和package中的scripts命令 例如scopes: Travis, Circle等',
    },
    { value: 'chore', name: '🗯  chore: 变更构建流程或辅助工具' },
    { value: 'revert', name: '⏪ revert: 代码回退' },
    { value: 'docs', name: '📚 docs: 文档变更' },
    { value: 'test', name: '🏁 test: 测试' },
    { value: 'release', name: '🏹 release: 发版' },
  ],

  // allowTicketNumber: false,
  isTicketNumberRequired: false,
  ticketNumberPrefix: 'TICKET-',
  ticketNumberRegExp: '\\d{1,5}',

  // override the messages, defaults are as follows
  messages: {
    type: '提交性质:',
    customScope: '表示此次更改的影响范围:',
    subject: '简要简述本次改动（必写）:\n',
    body: '提供更改的详细说明（可选）。使用“|”换行:\n',
    breaking: '列出重大更改（可选）:\n',
    footer: '列出此更改关闭的所有问题（可选）. E.g.: #31, #34:\n',
    confirmCommit: '确认上面的提交?',
  },

  // 设置只有 type 选择了 feat 或 fix，才询问 breaking message
  allowBreakingChanges: ['feat', 'fix'],

  // 跳过要询问的步骤
  skipQuestions: ['body'],

  // subject 限制长度
  subjectLimit: 100,
};
