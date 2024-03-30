<p align="center">
<img src="https://www.open17.vip/logo.png" width="250"/>
</p>
<p align="center">
<a href="https://www.npmjs.com/package/vitepress-theme-open17" target="_blank"><img src="https://img.shields.io/npm/v/vitepress-theme-open17.svg?style=flat-square&amp;logo=npm" alt="npm" style="display: inline; margin: 0px;"></a> <a href="https://github.com/open17/vitepress-theme-open17/" target="_blank"><img src="https://img.shields.io/badge/GitHub-open17-26A2FF?style=flat-square&amp;logo=github" alt="github" style="display: inline; margin: 0px;"></a> <a href="https://github.com/open17/vitepress-theme-open17/blob/template/LICENSE" target="_blank"><img src="https://img.shields.io/badge/License-Apache_2.0-green?style=flat-square" alt="license" style="display: inline; margin: 0px;"></a><br/>
一款简单美观的博客主题,继承于vitepress默认主题
</p>

# vitepress-theme-open17

## Documentation
To check out docs, visit [vitepress-theme-open17](https://vitepress.open17.vip/)


## 特征

- 开箱即用: 继承vitepress默认主题,无需额外更改原本配置,支持默认主题全部功能
- 博客增强: 支持标签分类,摘要,归档,博客封面等常见功能
- 轻松配置: 自动生成博客文章无需额外配置,博客功能页配置清晰简单

## 预期更新

- [x] 博客首页
- [ ] 博客评论系统
- [x] RSS订阅
- [x] 标签页
- [x] 归档页
- [x] 文章注入title
- [x] 自动引入博客
- [x] 置顶博客
- [ ] tags采用动态路由
- [x] 分页
- [x] 独立出主题部分发布npm
- [ ] markdown-it增强
- [x] 移动端优化
- [x] cdn资源转本地


如果觉得这个主题不错的话,欢迎给我一个star,你的支持是我更新的动力!

## 快速开始

### 使用模板

直接克隆本主题的[github template](https://github.com/open17/vitepress-theme-open17)即可快速开始

### 手动安装与配置

```shell
yarn add vitepress-theme-open17
```

然后使用主题
```js
//.vitepress/theme/index.js
import Theme from 'vitepress-theme-open17'
export default Theme
```

同时主题也提供了基本配置,你也可以在`config.js`中进行引用
```js
// .vitepress/config.js
import { defineConfig } from 'vitepress'
import baseConfig from 'vitepress-theme-open17/config'

export default defineConfig({
  extends: baseConfig,
})
```

同时这里现在支持RSS配置,可以通过一下设置配置RSS,RSS会把所有博客文章引入
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
然后RSS的地址为`你的域名+/feed.rss`,比如[本主题文档的RSS](https://vitepress.open17.vip/feed.rss)

## 博客使用

本主题会把`posts`文件夹下的所有md文件作为博客文章,并生成对应的博客链接
一个博客文章必须提供的有title和date字段,title为文章标题,date为文章创建时间,格式为`YYYY-MM-DD`

可选的字段是tags,pin(置顶),同时支持excerpt(摘要),下面是一个简单的示例:

```md
---
title: 我的第一篇博客
date: 2024-03-23
tags:
    - hello world
    - 标签1

pin: true
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
      desc:"Hello,world" ,          //博客首页描述
      pageSize:5,                  //每页显示文章数量,默认为5
    },
}
```

### 博客布局

用于配置博客页面

#### 博客主页
在要作为博客主页的markdown页面加入,推荐在`index.md`中配置
```md

---
layout: blog

---
```

#### 博客标签页

在要作为博客标签页的markdown页面加入
```md
---
layout: tags

---
```

#### 博客归档页
在要作为博客归档页的markdown页面加入
```md
---
layout: archive

---
```
