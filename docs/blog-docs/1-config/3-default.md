# 默认配置

主题提供了开箱即用的基本配置,可以在`config.js`中进行继承
```js
// .vitepress/config.js
import { defineConfig } from 'vitepress'
import baseConfig from 'vitepress-theme-open17/config'

export default defineConfig({
  extends: baseConfig,
})
```

默认配置如下:

<<< @/../@open17-theme\libs\config.mjs {js}