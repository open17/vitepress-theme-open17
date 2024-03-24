# 博客主题

::: info 说明
本主题持续更新中
:::

一款简单美观的博客主题,继承于vitepress默认主题

支持**全部**vitepress配置项与默认主题功能,相关配置请见[官方文档](https://vitepress.dev/)

本主题在默认主题的基础上加入了简洁美观的博客功能

## 特征

- 开箱即用: 继承vitepress默认主题,无需额外更改原本配置,支持默认主题全部功能
- 博客增强: 支持标签分类,摘要,归档,博客封面等常见功能
- 轻松配置: 自动生成博客文章无需额外配置,博客功能页配置清晰简单


## 快速开始
直接克隆本主题的[github template](https://github.com/open17/vitepress-theme-open17)即可快速开始

## 博客使用

本主题会把`posts`文件夹下的所有md文件作为博客文章,并生成对应的博客链接
一个博客文章必须提供的有title和date字段,title为文章标题,date为文章创建时间,格式为`YYYY-MM-DD`

可选的字段是tags,同时支持excerpt(摘要),下面是一个简单的示例:

```md
---
title: 我的第一篇博客
date: 2024-03-23
tags:
    - hello world
    - 标签1

---

Hello World

---

这是我的第一篇`vitepress-theme-open17`的博客

```

其中`Hello World`为摘要,会显示在博客主页的列表中

值得一提的是博客无需再写`# (你的大标题)`,主题会自动注入title字段于文章中

## 博客配置

### 主题配置
目前配置主要作用于博客首页
```js
themeConfig:{
    blog:{
      imgDark:'https://cdn.jsdelivr.net/gh/open17/Pic/img/202403011548000.png',  //博客首页图片(暗黑模式)
      img:'https://cdn.jsdelivr.net/gh/open17/Pic/img/202403241444361.png',     //博客首页图片(正常模式)
      title:"Open17's Blog",        //博客首页标题
      desc:"Hello,world"            //博客首页描述
    },
}
```


### 博客主页
在要作为博客主页的markdown页面加入,推荐在`index.md`中配置
```md

---
blog: home

---
```

### 博客标签页

在要作为博客标签页的markdown页面加入
```md
---
blog: tags

---
```

### 博客归档页
在要作为博客归档页的markdown页面加入
```md
---
blog: archive

---
```