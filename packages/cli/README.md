# Titian Cli

提供基础的 `start`、`build`、`release` 命令

当执行命令时，会加载指定的 `compiler` 包，例如: `@titian-design/compiler`、`@titian-design/wechat-compiler`;

## 配置

#### 设置 titian.config.ts

```typescript
import type { UserConfig } from '@titian-design/cli';

const config: UserConfig = {
  // compiler: join(__dirname, 'packages/compiler'),
  compiler: '@titian-design/wechat-compiler',
};
```

## 运行命令

```json
{
  "scripts": {
    "start": "titian-cli start",
    "build": "titian-cli build",
    "release": "titian-cli release"
  }
}
```
