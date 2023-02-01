# 🎉 特性
- 60+ 高质量组件
- 适配移动端交互
- 支持多框架，包括Web Components 、React和Vue 3.0
- 支持按需加载
- 支持主题定制，内置三种风格
- 支持 SSR
- 国际化支持

# 🔥 安装
React 项目
```shell
npm install @titian-design/react
```

Vue 3.0 项目
```shell
npm install @titian-design/vue
```

# 👍 使用
React 项目
```js
import { TiButton } from '@titian-design/react';

const App = () => (
  <div className="App">
    <TiButton type="primary">Button</TiButton>
  </div>
);

export default App;
```

Vue 3.0 项目
```js
import { createApp } from 'vue'
import { TitianUI } from '@titian-design/vue'
import App from './App.vue'

const app = createApp(App)

app.use(TitianUI)
app.mount('#app')
```
# 🔨 本地开发

```bash
$ git clone git@github.com:weimob-tech/titian-h5.git
$ cd titian-h5
$ npm install pnpm -g
$ pnpm install
$ pnpm start
```

## packages

| 代码路径          | npm 包名               | 说明                                         | 依赖于                 |
| ----------------- | ---------------------- | -------------------------------------------- | ---------------------- |
| packages/h5       | `@titian-design/h5`    | `H5` 组件库源文件，是以 [`stencil`](https://stenciljs.com/docs/introduction) 为基础。            | `@stencil/core`        |
| packages/h5-react | `@titian-design/react` | 基于 `@titian-design/h5` 搭建的 react 组件库 | `@titian-design/h5`    |
| packages/h5-vue   | `@titian-design/vue`   | 基于 `@titian-design/h5` 搭建的 vue 3 组件库 | `@titian-design/h5`    |
| packages/doc-web  | -                      | 基于 `docusaurus` 搭建的 API 文档            | `@titian-design/react` |

# 🎈 协议

Titian Design 使用 [MIT 协议](LICENSE)
