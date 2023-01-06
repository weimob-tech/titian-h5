// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

/* eslint-disable */
const navbar = require('./config/navbar');
const prism = require('./prism');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Titian - 多渠道移动端组件库',

  // tagline: 'Titian UI is cool',
  url: 'https://titian.design.weimob.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.svg',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Weimob', // Usually your GitHub org/user name.
  projectName: 'Titian UI', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  // i18n: {
  //   defaultLocale: 'en',
  //   locales: ['en'],
  // },

  plugins: ['docusaurus-plugin-sass'],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./config/sidebar.js'),
          breadcrumbs: false,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.scss'),
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/components/**', '/home-pages/**'],
          filename: 'sitemap.xml',
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
      ],
      navbar,
      sideIframe: {
        baseUrl: process.env.EG_IFRAME_BASE_URL,
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
