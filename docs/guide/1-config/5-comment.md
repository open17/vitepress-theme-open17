# 评论配置 <Badge type="warning" text="beta" />

## 说明

目前评论功能基于[giscus](https://giscus.app/)

你可以在 giscus 中查询更多的配置信息

## 全局评论配置

将 use 设置为 true 后会对 docs 类型页面加载评论。

```ts
// .vitepress/config.ts
import { defineConfigWithTheme } from 'vitepress'
export default defineConfigWithTheme({
  themeConfig: {
    comment: {
      use: true,
      repo: "owner/repo",
      repoId: "",          // 仓库的 repoId
      category: "Announcements",
      categoryId: "",      // Discussion 分类的 categoryId
      mapping: "pathname", // url | title | og:title | specific | number | pathname
      strict: "0",         // '0' | '1'
      reactionsEnabled: "1",
      emitMetadata: "0",
      inputPosition: "top", // 'top' | 'bottom'
      lang: "zh-CN"
    }
  }
})
```

## 单页面评论设置

可以在页面 frontmatter 覆盖是否开启评论，优先级高于全局配置：

```md
---
comment: true # 或 false
---
```

小贴士：
- 当 comment.use = true 时，会在文档型页面（非博客列表）末尾渲染评论组件。
- giscus 的语言可通过全局 comment.lang 配置，例如 zh-CN 或 en。