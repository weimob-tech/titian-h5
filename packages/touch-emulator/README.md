# Touch Emulator

用来在 PC 浏览器上兼容 touch 事件。

根据 [touchemulator](https://github.com/hammerjs/touchemulator) 实现。

增加： Web Components 内部 dom 元素的 touch 能力。

## 安装

NPM:

```bash
npm install @titian-design/touchemulator
```

```javascript
import * as TouchEmulator from '@titian-design/touchemulator';

new window.TouchEmulator(document.body);
```

## CDN 地址

```html
<script src="//unpkg.com/@titian-design/touchemulator@1.0.0/touch-emulator.js"></script>
<script>
  TouchEmulator();
</script>
```

## Bookmarklet

```js
javascript: !(function (a) {
  var b = a.createElement('script');
  (b.onload = function () {
    TouchEmulator();
  }),
    (b.src = '//unpkg.com/@titian-design/touchemulator@1.0.0/touch-emulator.js'),
    a.body.appendChild(b);
})(document);
```
