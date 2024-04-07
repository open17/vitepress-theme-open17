---
title: vitepress与open17主题使用小指南
date: 2024-04-26
tags:
    - 小技巧
    - 指南
    - theme
---

简单介绍一下vitepress与本博客主题的常用功能与配置

---

下面是一些我常用的功能与配置,排序不分先后:

## 基本配置

在config.js中可以继承本主题提供懒人式基本配置:

```js
// .vitepress/config.js
import { defineConfig } from 'vitepress'
import baseConfig from 'vitepress-theme-open17/config'

export default defineConfig({
  extends: baseConfig,
})
``` 


## 背景图片设置

前提是开启了博客装饰样式,即在config中设置`ornateStyle:true`

bgImg和bgImgDark分别用于设置白天和黑夜的背景图片

若在config.js中设置了bgImg和bgImgDark，则会在所有`文章页面`显示背景图片

要想在非文章页面显示背景图片，需要在对应`md文件`中的[frontmatter](https://vitepress.dev/guide/frontmatter)添加`bgImg`和`bgImgDark`属性

## Markdown引入

很多时候比如我们希望README和博客的某篇内容是完全同步的,但是我们不想每次修改一边还需要再修改另一边,我们可以直接引入对应的markodwn文件,会直接渲染成页面

使用参考[这里](https://vitepress.dev/guide/markdown#markdown-file-inclusion)

比如本博客的更新公告就是引入CHANGELOG的

<<< ./update.md

## RSS配置

本主题支持RSS,配置如下,会在build的时候生成路径为`baseUrl+feed.rss`

```js
// .vitepress/config.js
import { genFeed } from 'vitepress-theme-open17/genFeed'
export default defineConfig({
  //...
  themeConfig: {
    // ...
    feed: {
      baseUrl: "https://www.open17.vip", // 你的部署的域名,必须
      copyright:"Copyright © 2023-present open17", //版权声明,可选
      image:"https://www.open17.vip/logo.png", // RSS图片,可选
      favicon:"https://www.open17.vip/logo.ico" //RSS图标,可选
    },
  },
  buildEnd: genFeed,
})
```

## Sitemap

vitepress本身即支持sitemap，只需要在config.js中配置站点域名即可,例如:
```js
export default defineConfig({
    sitemap: {
        hostname: 'https://www.open17.vip'
      },
})
```


## 数学公式支持

vitepress本身支持mathjax，只需要在config.js中配置即可，例如:
```js
export default defineConfig({
    markdown: {
    math: true
  },
})
```

## 自定义容器

**输入**

```md
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::
```

**输出**

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

## 导入代码片段

虽然之前有个小冲突,但现在修复了还是很好用的

我的[算法仓库](xcpc.open17.vip)基本上依赖于这个功能

详见[import-code-snippets](https://vitepress.dev/guide/markdown#import-code-snippets)

## 置顶博客文章

在对应`md文件`中的[frontmatter](https://vitepress.dev/guide/frontmatter)设置`pin: true`即可置顶博客