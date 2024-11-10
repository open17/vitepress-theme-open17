# 默认配置

主题提供了开箱即用的基本配置,可以在`config.js`中进行继承

```js
// .vitepress/config.js
import { defineConfig } from "vitepress";
import baseConfig from "vitepress-theme-open17/config";

export default defineConfig({
  extends: baseConfig,
});
```

默认配置如下:

```js
import { defineConfig } from "vitepress";
export default defineConfig({
  title: "Vitepress Open17",
  description: "A VitePress Site",
  themeConfig: {
    footer: {
      message:
        'Released under the <a href="https://github.com/open17/vitepress-theme-open17/blob/template/LICENSE">Apache 2.0 License</a>.',
      copyright:
        'Copyright © 2023-present <a href="https://github.com/open17">open17</a>',
    },
    search: {
      provider: "local",
    },
    blog: {
      title: "My Awesome Blog",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      direct: "rgt",
    },
  },
});
```
