# ti-action-sheet



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description | Type           | Default     |
| ------------ | ------------- | ----------- | -------------- | ----------- |
| `actions`    | --            |             | `ActionItem[]` | `[]`        |
| `cancelText` | `cancel-text` |             | `string`       | `undefined` |
| `hoverClass` | `hover-class` |             | `string`       | `undefined` |
| `title`      | `title`       |             | `string`       | `undefined` |
| `visible`    | `visible`     |             | `boolean`      | `false`     |


## Events

| Event    | Description | Type                      |
| -------- | ----------- | ------------------------- |
| `cancel` |             | `CustomEvent<never>`      |
| `close`  |             | `CustomEvent<never>`      |
| `select` |             | `CustomEvent<ActionItem>` |


## Dependencies

### Depends on

- [ti-loading](../loading)
- [ti-icon](../icon)
- [ti-popup](../popup)
- [ti-button](../button)

### Graph
```mermaid
graph TD;
  ti-action-sheet --> ti-loading
  ti-action-sheet --> ti-icon
  ti-action-sheet --> ti-popup
  ti-action-sheet --> ti-button
  ti-popup --> ti-transition
  ti-popup --> ti-safe-area
  ti-button --> ti-loading
  ti-button --> ti-icon
  style ti-action-sheet fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
