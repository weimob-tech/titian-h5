<p align="center">
<img src="https://cdn2.weimob.com/saas/@assets/saas-fe-retail-h5-stc/image/titian/big-logo.svg" width="200" />
</p>

[//]: # 'TODO 发布到 npm 时需要'

<p align="center" style="text-align: center">
  <img src="https://img.shields.io/npm/v/@titian-design/mobile-react.svg?style=flat&color=fa2c19" />
  <img src="https://img.shields.io/npm/dm/@titian-design/mobile-react.svg?style=flat-square&color=green" />
</p>

<p align="center">
  🖥️&nbsp;<a href="https://titian.design.weimob.com/">文档网站</a>
  &nbsp;&nbsp;&nbsp;&nbsp;
  ⚙️&nbsp;<a href="https://stash.weimob.com/fe-ec/bos-fe-titian-web">文档仓库</a>
  &nbsp;
</p>

### 介绍

源自微盟移动端核心业务，我们的目标是通过 Titian 组件库，帮助广大开发者，并不断的完善与努力打造良好的移动端产品体验。

Titian React 是以 Web Components 为基础的 React 组件库，同时与小程序组件库的 API 基本一致，打造一致的开发体验。

### 安装

```shell
# 通过 npm 安装
npm i @titian-design/mobile-react --save

# 通过 yarn 安装
yarn add @titian-design/mobile-react
```

### 使用

```typescript
import { TiButton } from '@titian-design/mobile-react';

const App = () => (
  <div className="App">
    <TiButton type="primary">Button</TiButton>
  </div>
);

export default App;
```

### 其他链接

- [Titian 官网](https://titian.design.weimob.com)
- [React 组件文档](https://titian.design.weimob.com/docs/react/components/start/quickStart)
- [changelog 更新日志](https://stash.weimob.com/WF/ec/titian/blob/dev/packages/weapp/CHANGELOG.md)
- [issue 提出问题](https://stash.weimob.com/WF/ec/titian/issues)
- [小程序组件库](http://npm.weimob.com/-/web/detail/titian-mp)
- [Vue 组件库](http://npm.weimob.com/-/web/detail/@titian-design/mobile-vue)
