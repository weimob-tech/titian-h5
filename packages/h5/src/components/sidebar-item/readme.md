# ti-sidebar-item



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute   | Description | Type                                   | Default |
| ---------- | ----------- | ----------- | -------------------------------------- | ------- |
| `badge`    | `badge`     |             | `string`                               | `''`    |
| `disabled` | `disabled`  |             | `boolean`                              | `false` |
| `dot`      | `dot`       |             | `boolean`                              | `false` |
| `extClass` | `ext-class` |             | `string`                               | `''`    |
| `extStyle` | `ext-style` |             | `string \| { [key: string]: string; }` | `''`    |
| `label`    | `label`     |             | `string`                               | `''`    |


## Methods

### `updateDataFromParent() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [ti-tree-select](../tree-select)

### Depends on

- [ti-badge](../badge)

### Graph
```mermaid
graph TD;
  ti-sidebar-item --> ti-badge
  ti-badge --> ti-icon
  ti-tree-select --> ti-sidebar-item
  style ti-sidebar-item fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
