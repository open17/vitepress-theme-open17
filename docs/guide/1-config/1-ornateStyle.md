# 背景图片配置

你可以为页面配置背景图片，支持全局配置和单页面配置。

背景图片支持明暗两种主题，可以分别配置不同的图片。

## 全局背景图片配置

```js
themeConfig: {
  blog: {
    bgImage: "/bg.jpg",               // 单一背景图片
    // 或者使用明暗主题配置
    bgImage: { 
      light: "/bg.jpg",              // 浅色主题背景
      dark: "/bg_dark.jpg"           // 深色主题背景
    }
  }
}
```

## 单页面背景图片配置

在页面的 frontmatter 中配置，优先级高于全局配置：

```md
---
bgImage: "/custom-bg.jpg"           # 单一背景图片
# 或者使用明暗主题配置
bgImage:
  light: "/custom-bg-light.jpg"    # 浅色主题背景
  dark: "/custom-bg-dark.jpg"      # 深色主题背景
---
```

## 使用示例

参考本主题的示例页面配置：

- 博客页：/page/blog - 配置了不同的明暗背景
- 标签页：/page/tags - 使用相同的背景配置
- 归档页：/page/archive - 统一的背景样式


