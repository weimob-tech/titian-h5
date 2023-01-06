<p align="center">
<img src="https://cdn2.weimob.com/saas/@assets/saas-fe-retail-h5-stc/image/titian/big-logo.svg" width="200" />
</p>

[//]: # 'TODO 发布到 npm 时需要'

<p align="center" style="text-align: center">
  <img src="https://img.shields.io/npm/v/titian-h5-vue.svg?style=flat&color=fa2c19" />
  <img src="https://img.shields.io/npm/dm/titian-h5-vue.svg?style=flat-square&color=green" />
</p>

<p align="center">
  🖥️&nbsp;<a href="https://titian.design.weimob.com/">文档网站</a>
  &nbsp;&nbsp;&nbsp;&nbsp;
  ⚙️&nbsp;<a href="https://github.com/weimob-tech/titian-h5">文档仓库</a>
  &nbsp;
</p>

### 介绍

源自微盟移动端核心业务，我们的目标是通过 Titian 组件库，帮助广大开发者，并不断的完善与努力打造良好的移动端产品体验。

Titian Vue 是以 Web Components 为基础的 Vue 3 组件库，同时与小程序组件库的 API 基本一致，打造一致的开发体验。

### 安装

```shell
# 通过 npm 安装
npm i @titian-design/vue --save

# 通过 yarn 安装
yarn add @titian-design/vue
```

### 使用

```typescript
import { createApp } from 'vue';
import { TitianUI } from 'titian-h5-vue';
import App from './App.vue';

const app = createApp(App);

app.use(TitianUI);

app.mount('#app');
```

### 其他链接

- [Titian 官网](https://titian.design.weimob.com)
- [小程序组件文档](https://titian.design.weimob.com/docs/mini-program/components/start/quick-start)
- [Vue 组件文档](https://titian.design.weimob.com/docs/vue/components/start/quick-start)
- [React 组件文档](https://titian.design.weimob.com/docs/react/components/start/quick-start)
- [changelog 更新日志](https://github.com/weimob-tech/titian-h5/blob/master/packages/h5-vue/CHANGELOG.md)
- [issue 提出问题](https://github.com/weimob-tech/titian-h5/issues)
- [小程序组件库](https://www.npmjs.com/package/titian-mp)
- [Vue 组件库](https://www.npmjs.com/package/titian-h5-vue)
- [React 组件库](https://www.npmjs.com/package/titian-h5-react)
