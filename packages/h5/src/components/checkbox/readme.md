# ti-checkbox

<!-- Auto Generated Below -->


## Properties

| Property         | Attribute         | Description          | Type                             | Default             |
| ---------------- | ----------------- | -------------------- | -------------------------------- | ------------------- |
| `checked`        | `checked`         | 指定当前是否选中, 此模式下为控制型组件 | `boolean`                        | `null`              |
| `color`          | `color`           | 单选框颜色配置              | `string`                         | `undefined`         |
| `defaultChecked` | `default-checked` | 初始是否选中, 此模式下为非控制型组件  | `boolean`                        | `null`              |
| `disabled`       | `disabled`        | 指定当前是否禁用             | `boolean`                        | `false`             |
| `extClass`       | `ext-class`       | 额外的类名，添加到根节点的元素上     | `string`                         | `undefined`         |
| `icon`           | `icon`            | 自定义图标名称              | `boolean \| string`              | `'checkbox-hollow'` |
| `iconClass`      | `icon-class`      |                      | `string`                         | `undefined`         |
| `label`          | `label`           | 文字内容                 | `string`                         | `undefined`         |
| `labelDisabled`  | `label-disabled`  | 指定当前文字是否禁用点击         | `boolean`                        | `false`             |
| `shape`          | `shape`           | 单选框圆角度数              | `"circle" \| "none" \| "square"` | `'circle'`          |
| `size`           | `size`            | 自定义图标尺寸              | `number`                         | `32`                |
| `value`          | `value`           | 根据 value 进行比较，判断是否选中 | `number \| string`               | `null`              |


## Events

| Event    | Description | Type                   |
| -------- | ----------- | ---------------------- |
| `change` |             | `CustomEvent<boolean>` |


## Methods

### `updateDataFromParent(parent: ParentAttrs) => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [ti-checkbox-group](../checkbox-group)

### Depends on

- [ti-icon](../icon)

### Graph
```mermaid
graph TD;
  ti-checkbox --> ti-icon
  ti-checkbox-group --> ti-checkbox
  style ti-checkbox fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
