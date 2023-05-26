// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

/* eslint-disable */
const navbar = require('./config/navbar');
const prism = require('./prism');
const remarkVariable = require('./plugin/remark-variable');

let sideIframeBaseurl = process.env.EG_IFRAME_BASE_URL;
let packageWeappName = '@titian-design/weapp';
let packageWeappReact = '@titian-design/mobile-react';
let packageWeappVue = '@titian-design/mobile-vue';
let packageWeappH5 = '@titian-design/h5';
let titianTip = '如果您是内网用户，欢迎访问[Titian内部文档](http://titian.show.hsmob.com/)。';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Titian - 多渠道移动端组件库',

  // tagline: 'Titian UI is cool',
  url: 'https://titian.design.weimob.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Weimob', // Usually your GitHub org/user name.
  projectName: 'Titian UI', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  trailingSlash: true, // 这个选项允许你自定义 URL/链接后是否添加末尾斜杠，以及静态 HTML 会如何被生成。algolia搜索，sitemap.xml

  plugins: ['docusaurus-plugin-sass'],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./config/sidebar.js'),
          breadcrumbs: false,
          remarkPlugins: [
            [
              remarkVariable,
              {
                packageWeappName: packageWeappName,
                packageWeappReact: packageWeappReact,
                packageWeappVue: packageWeappVue,
                packageWeappH5: packageWeappH5,
                titianTip: titianTip,
              },
            ],
          ],
        },
        theme: {
          customCss: require.resolve('./src/css/custom.scss'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    // /** @type {import('@docusaurus/theme-search-algolia').ThemeConfig} */
    ({
      metadata: [
        {
          name: 'keywords',
          content:
            'Titian, Titian Design, Titian UI, 移动端组件库, 小程序组件库, React组件库, Vue组件库, Web Components组件库',
        },
        {
          name: 'description',
          content:
            'Titian Mobile 源自微盟移动端核心业务，支持业界主流的 MiniProgram、React、Vue 3开发技术栈；我们的目标是通过 Titian 组件库，帮助广大开发者，并不断的完善与努力打造良好的移动端产品体验。',
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no',
        },
      ],
      navbar,
      sideIframe: {
        baseUrl: sideIframeBaseurl,
      },
      colorMode: {
        disableSwitch: true,
      },
      // algolia: {
      //   // The application ID provided by Algolia
      //   appId: 'YOUR_APP_ID',

      //   // Public API key: it is safe to commit it
      //   apiKey: 'YOUR_SEARCH_API_KEY',

      //   indexName: 'YOUR_INDEX_NAME',

      //   // Optional: see doc section below
      //   contextualSearch: false,

      //   // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
      //   // externalUrlRegex: 'external\\.com|domain\\.com',

      //   // Optional: Algolia search parameters
      //   // searchParameters: {},

      //   // Optional: path for search page that enabled by default (`false` to disable it)
      //   // searchPagePath: 'search',

      //   //... other Algolia params
      // },
      prism,
    }),

  stylesheets: ['//at.alicdn.com/t/c/font_3677201_mzebjta0hfe.css'],
};

module.exports = config;
