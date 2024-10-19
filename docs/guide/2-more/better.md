# 功能增强

这里是一些常用的博客功能增强需求配置/使用方法,其中有部分在本主题已经集成完毕,有部分则没有

没有的原因大抵如下几点:

- 相关功能配置已经足够简单便捷,无需再套入主题中
- 相关功能可能有一定bug
- 相关功能过于笨重,引入增加负担
- 默认主题已经实现

## 基本配置

在config.js中可以继承本主题提供基本配置:

```js
// .vitepress/config.js
import { defineConfig } from 'vitepress'
import baseConfig from 'vitepress-theme-open17/config'

export default defineConfig({
  extends: baseConfig,
})
``` 
详见[默认配置](/guide/1-config/3-default.html)

## 背景图片设置

前提是开启了装饰样式,即在config中设置`ornateStyle:true`

我们便可以通过配置对应的markdown文件来指定背景图片
```md
---
bgImg:"xxxx" 
bgImgDark:"xxxx"
---
```

详见[装饰模式配置](/guide/1-config/1-ornateStyle)

## Markdown引入

很多时候比如我们希望README和博客的某篇内容是完全同步的,但是我们不想每次修改一边还需要再修改另一边,我们可以直接引入对应的markodwn文件,会直接渲染成页面

使用参考[这里](https://vitepress.dev/guide/markdown#markdown-file-inclusion)

比如本博客的更新公告就是引入CHANGELOG的

```md
---
tags:
    - theme
    - 更新
title: 更新公告
pin: true
---

这里是博客的更新公告

---

:::info
内容同步自[CHANGELOG](https://github.com/open17/vitepress-theme-open17/blob/template/CHANGELOG.md)

最新同步时间: {{ Date()}}

:::

<!--@include: @/../CHANGELOG.md -->
```

## RSS配置

本主题支持RSS,配置如下,会在build的时候生成路径为`baseUrl+feed.rss`

详见[RSS](/guide/1-config/4-rss)

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

详见[import-code-snippets](https://vitepress.dev/guide/markdown#import-code-snippets)

## 置顶博客文章

在对应`md文件`中的[frontmatter](https://vitepress.dev/guide/frontmatter)设置`pin: true`即可置顶博客

## 自定义首页组件

详见[这里](/guide/1-config/0-home.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%84%E4%BB%B6%E6%A0%8F)

## 自动侧边栏

已有封装好的vite插件[vite-plugin-vitepress-auto-sidebar](https://github.com/QC2168/vite-plugin-vitepress-auto-sidebar)

个人相关配置如下:

```js
vite: {
    plugins: [
      AutoSidebar({
        ignoreList: ['page', 'posts', 'public'],
        titleFromFile: true,
        beforeCreateSideBarItems: (data) => {
          const indexIndex = data.indexOf("index.md");
          if (indexIndex !== -1) {
            const indexValue = data[indexIndex];
            data.splice(indexIndex, 1);
            data.unshift(indexValue);
          }
          return data;
        }
      })
    ]
  },
```

## 幻灯片

可以参考这篇博客:

- [在vitepress中使用幻灯片](https://www.open17.vip/posts/project/2024-10-15-vitepress-reveal.html)

