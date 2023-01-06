# Titian UI

## 安装之前

```bash
npm install pnpm -g
```

## 安装

```bash
pnpm install
```

## packages

| 代码路径          | npm 包名          | 说明                                 | 依赖于            |
| ----------------- | ----------------- | ------------------------------------ | ----------------- |
| packages/h5       | `titian-h5`       | 基于 stencil.js 搭建的 h5 组件库     | `@stencil/core`   |
| packages/h5-react | `titian-h5-react` | 基于 `titian-h5` 搭建的 react 组件库 | `titian-h5`       |
| packages/h5-vue   | `titian-h5-vue`   | 基于 `titian-h5` 搭建的 vue 3 组件库 | `titian-h5`       |
| packages/doc-web  | -                 | 基于 `docusaurus` 搭建的 API 文档    | `titian-h5-react` |

#### packages/h5

这个是 `H5` 组件库源文件，是由 [`stencil`](https://stenciljs.com/docs/introduction) 为基础。

#### packages/h5-react

React 组件包代码

#### packages/h5-vue

Vue 组件包代码

## 创建 WebComponent 组件

第一种方式：在根目录创建

```bash
pnpm --filter titian-h5 run generate
```

第二种方式：在 `packages/h5` 目录下创建

```bash
# pnpm
pnpm run generate

# npm
npm run generate
```

> 输入的名字为`ti-xxxx`，其中`xxxx`是你想要创建的组件名称。 例如：`ti-button`、`ti-input`、`ti-back-top` 等。
> 自动创建组件后，会生成文件夹，例如`ti-button`。同时会生成一些文件，例如：`ti-button.tsx`、`ti-button.css`、`readme.md` 等。

#### !!!修改生成的内容

1. 需要将文件夹名称改为组件名称(不带`ti-`前缀)。例如： `ti-button` -> `button`。
2. 需要将文件重命名为`index`，例如： `ti-button.tsx` -> `index.tsx`、`ti-button.css` -> `index.less`。
3. 需要修改 `tsx` 文件中的内容，将 `ti-button.css` 改为 `index.less`。
4. 到 `packages/h5-react/index.tsx` 中，将以 `react`
   方式进行导出。例如：`export const TiIcon = ComponentWrap<jsx.TiIcon>(components.TiIcon);`, 并导出类型定义`export type TiIconProps = jsx.TiIcon;`

##### 添加 React 组件导出

修改 `packages/h5-react/src/index.tsx`

```typescript tsx
export const TiButton = ComponentWrap<JSX.TiButton, HTMLTiButtonElement>(components.TiButton);

export type TiButtonProps = JSX.TiButton;
```

修改 `TiButton`、`HTMLTiButtonElement` 为新创建的组件名

##### 添加 vue 组件导出

修改 `packages/h5-vue/src/index.tsx`

```typescript
export const { TiButton } = components;

export type TiButtonProps = JSX.TiButton;
```

修改 `TiButton`、`HTMLTiButtonElement` 为新创建的组件名

##### 开发模式

在根目录启动

```bash
npm run start
```

##### 编译打包

在根目录编译

```bash
npm run build
```
