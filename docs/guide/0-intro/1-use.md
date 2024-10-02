# 博客使用

在初始化完环境之后,我们便可以开始我们的博客写作啦!

## :bookmark_tabs: 创建博客文章

在vitepress的[站点目录](https://vitepress.dev/zh/guide/getting-started#file-structure)文件夹下建立一个名为`posts`的文件夹

在posts文件夹下创建的所有markdown文件将被视为博客文章

例如你的文件目录结构可能如下:

```
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.js
│  ├─ posts
│  │    ├─ my-blog-0.md
│  │    └─ my-blog-1.md
│  ├─ markdown-examples.md
│  └─ index.md
└─ package.json
```

其中`my-blog-0.md`和`my-blog-1.md`便会被主题自动渲染为博客文章

## :book: 配置博客文章

一些和博客文章相关的配置

- `title` 文章的标题,会自动渲染在文章中
- `date` 文章的创建时间,默认为1900-01-01
- `tags` 文章的标签,支持多组标签
- `pin` 布尔值,是否置顶文章,默认为`false`
- `desc` 简介,当摘要为空的时候会显示desc的内容

摘要即为正文部分第一个`---`分割线前的所有内容


下面是一个包含完整博客配置的文章示例:

```md
---
title: 我的第一篇博客
date: 2024-03-23
tags:
    - hello world
    - 标签1

pin: true
desc: xxxx
---

我是文章的摘要

---

我是一段废话

## 标题A

AAAAAAAAAAAAAAAAAAAAAA

## 标题B

BBBBBBBBBBBBBBB

```


## :house: 搭建博客主页

博客主页会自动的展示所有的博客文章,并且会自动的根据文章的创建时间进行排序

同时还会显示头像昵称签名等其他内容,在<Badge type="tip" text="版本1.1.0" />及以后还可以自己添加相关的主页小组件

例如: [博客主页示例](/page/demo)

对于任意一个vitepress的markdown页面,使用layout配置便可转为博客主页:
```md
---
layout: blog
---
```
也就是说,你可以自由的选择任意的一个甚至多个页面作为博客主页,不过更推荐将`index.md`作为博客主页,以符合博客站点的习惯

如果你还不清楚文件路径和网页路由的对应关系,可以参考vitepress的[相关文档](https://vitepress.dev/zh/guide/routing#file-based-routing)

现在你应该能在对应的博客主页中看到创建的文章了


## :bookmark: 创建标签页与归档页

与博客主页同理

:::code-group
```md [标签页]
---
layout: tags
---
```
```md [归档页]
---
layout: archive
---
```
:::



