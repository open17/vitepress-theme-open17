---
tags:
    - 主题
    - 视频
title: 「漂流少年」toe
date: 2024-07-21
---

<br>

<div class="w-full h-full md:w-[48vw] md:h-[25vw] ">
    <iframe src="//player.bilibili.com/player.html?isOutside=true&aid=422023151&bvid=BV1q3411b7ps&cid=453243438&p=1&autoplay=0" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" width="100%" height="100%"></iframe>
</div>


---

## 实现

如何嵌入视频?原理也很简单,直接嵌入iframe即可

b站的视频直接点击分享就可以复制到相关代码

想展示在博客首页的话就放在摘要里

```html
<div class="w-full h-full md:w-[48vw] md:h-[25vw] ">
    <iframe src="//player.bilibili.com/player.html?isOutside=true&aid=422023151&bvid=BV1q3411b7ps&cid=453243438&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" width="100%" height="100%"></iframe>
</div>
```

另外在链接中加入`autoplay=0`可以关闭b站的自动播放,避免占用资源