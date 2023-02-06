# ti-countdown



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute   | Description      | Type      | Default     |
| --------------------- | ----------- | ---------------- | --------- | ----------- |
| `autoplay`            | `autoplay`  |                  | `boolean` | `false`     |
| `extClass`            | `ext-class` | 额外的类名，添加到根节点的元素上 | `string`  | `undefined` |
| `extStyle`            | --          | 额外的样式            | `{}`      | `{}`        |
| `format` _(required)_ | `format`    |                  | `string`  | `undefined` |
| `time`                | `time`      |                  | `number`  | `1200`      |
| `useSlot`             | `use-slot`  |                  | `boolean` | `false`     |


## Events

| Event    | Description | Type                     |
| -------- | ----------- | ------------------------ |
| `change` |             | `CustomEvent<TimeGroup>` |
| `finish` |             | `CustomEvent<never>`     |


## Methods

### `pause() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `reset() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `start() => Promise<void>`



#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
