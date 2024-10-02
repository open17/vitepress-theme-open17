---
tags:
    - 主题
    - 视频
title: 视频 - 「漂流少年」TOE
date: 2024-07-21
img: https://cdn.jsdelivr.net/gh/open17/Pic/img/202402082335721.jpg
---

如何嵌入视频?原理也很简单,直接嵌入iframe即可

---



## 效果

<div class="w-full h-96 mt-5">
    <iframe src="//player.bilibili.com/player.html?isOutside=true&aid=422023151&bvid=BV1q3411b7ps&cid=453243438&p=1&autoplay=0" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" width="100%" height="100%"></iframe>
</div>

## 实现

b站的视频直接点击分享就可以复制到相关代码

想展示在博客首页的话就放在摘要里,另外在链接中加入`autoplay=0`可以关闭b站的自动播放,避免占用资源

```html
<div class="w-full h-96 mt-5">
    <iframe src="//player.bilibili.com/player.html?isOutside=true&aid=422023151&bvid=BV1q3411b7ps&cid=453243438&p=1&autoplay=0" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" width="100%" height="100%"></iframe>
</div>
```

