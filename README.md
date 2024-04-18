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

- 博客功能增强: 对于博客主题常见的需求进行进一步加强,增加三种博客布局:标签页布局,归档页布局,博客主页布局,同时支持摘要,归档,博客置顶,头像,昵称,签名,RSS等常见博客功能需求
- 更多体验加强: 自动引用posts文件夹生成博客文章;提供懒人式一键引用默认配置;提供博客装饰模式,支持背景图自定义替换;markdown中支持tailwindcss优化样式书写体验...
- 继承默认主题: 继承vitepress默认主题,无需额外更改配置,兼容默认主题的全部功能,包括但不限于:代码片段导入,Markdown增强,自定义容器,vue组件使用,Sitemap...

## 示例图片<Badge type="tip" text="^1.0.0更新" />
![](https://cdn.jsdelivr.net/gh/open17/Pic/img/202404061019327.png)
![](https://cdn.jsdelivr.net/gh/open17/Pic/img/202404061020261.png)
![](https://cdn.jsdelivr.net/gh/open17/Pic/img/202404020048139.png)
![](https://cdn.jsdelivr.net/gh/open17/Pic/img/202404020303360.png)
![](https://cdn.jsdelivr.net/gh/open17/Pic/img/202404020053342.png)
![](https://cdn.jsdelivr.net/gh/open17/Pic/img/202404020305190.png)

如果觉得这个主题不错的话,欢迎给我一个star,你的支持是我更新的动力!

## 预期更新

- [x] 更多样式配置
- [x] 博客首页
- [ ] 博客评论系统
- [x] RSS订阅
- [x] 标签页
- [x] 归档页
- [x] 文章注入title
- [x] 自动引入博客
- [x] 置顶博客
- [x] 分页
- [x] 独立出主题部分发布npm
- [x] 移动端优化
- [x] cdn资源转本地




## 快速开始

推荐使用模版,当然也可以手动安装配置

### 使用模板一键安装
推荐使用模版,当然也可以手动安装配置

### 使用模板自动安装

点击[github template](https://github.com/open17/vitepress-theme-open17/generate)即可快速开始

### 手动安装与配置

在此之前应该先[初始化vitepress项目](https://vitepress.dev/zh/guide/getting-started),然后再安装主题



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
然后RSS的地址为`你的域名+/feed.rss`

## 博客使用

本主题会把`posts`文件夹下的所有md文件作为博客文章,并生成对应的博客链接
一个博客文章必须提供的有title和date字段,title为文章标题,date为文章创建时间,格式为`YYYY-MM-DD`

可选的字段是tags,pin(置顶),bgImg(背景图片, ornateStyle模式开启时生效,可用于任何页面),同时支持excerpt(摘要),下面是一个简单的示例:

当页面没有摘要的时候,可以设置desc字段作为摘要<Badge type="tip" text="^1.0.2更新" />

```md
---
title: 我的第一篇博客
date: 2024-03-23
tags:
    - hello world
    - 标签1

pin: true
bgImg: "xxxx" 
bgImgDark: "xxxx"

desc: xxxx

---

Hello World

---

这是我的第一篇`vitepress-theme-open17`的博客

```

其中`Hello World`为摘要,会显示在博客主页的列表中

值得一提的是博客无需再写`# (你的大标题)`,主题会自动注入title字段于文章中

## 博客配置

### 主题配置<Badge type="tip" text="^1.0.2更新" />
目前配置主要作用于博客首页
```js
themeConfig:{
    blog:{
      title: "My Awesome Blog",   
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      avatar:"xxxx"               //你的头像
      pageSize:5,                  //每页显示文章数量,默认为5
      ornateStyle:true,             //是否开启博客装饰样式,默认为false,
      bgImg:"xxxx",                  //仅可用于doc文章(包括博客文章)的默认背景图片,可选,当博客装饰样式开启才生效
      bgImgDark:"xxxx",            //仅可用于doc文章(包括博客文章)的默认背景图片(暗黑模式),可选,当博客装饰样式开启才生效
      maxTags:5,                  //博客首页的标签栏显示的最大标签数量,默认为5
      tagPageLink:'/page/tags'    // 如果不为空,则在博客首页的标签栏会显示更多标签的链接,点击后会跳转到该链接
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


## 鸣谢

- [vitepress](https://vitepress.dev/): 本主题是在vitepress及其默认主题的基础上进行开发
- [tailwindcss](https://tailwindcss.com/):大大方便了css的书写与开发效率
- [vuejs/blog](https://github.com/vuejs/blog): vue官方博客,参考了其中一些代码的实现
- [fuwari](https://github.com/saicaca/fuwari): 一款Astro的博客主题,设计上对我有不小的启发
