/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [{ type: 'autogenerated', dirName: '.' }],

  // But you can create a sidebar manually
  design: [{ type: 'autogenerated', dirName: 'design' }],
  // resources: [{ type: 'autogenerated', dirName: 'resources' }],
  // tools: [{ type: 'autogenerated', dirName: 'tools' }],
  sidebar1: [{ type: 'autogenerated', dirName: 'react/components' }],
  sidebar2: [{ type: 'autogenerated', dirName: 'mini-program/components' }],
  sidebar3: [{ type: 'autogenerated', dirName: 'vue/components' }],
  sidebar4: [{ type: 'autogenerated', dirName: 'web-components/components' }],
};

module.exports = sidebars;
