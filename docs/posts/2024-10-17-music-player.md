---
title: 食用指南:音乐播放小组件
date: 2024-10-17
tags:
    - 指南
    - 组件
    - Aplayer
img: https://cdn.jsdelivr.net/gh/open17/Pic/img/202402082335721.jpg
---

博客主题中[自定义组件栏](/guide/1-config/0-home.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%84%E4%BB%B6%E6%A0%8F)配置的小应用,基于Aplayer

---


## 什么是Aplayer?

:::tip 说明

由于这里示例音乐链接是网易云的,可能会因为非国内网络问题导致无法播放

:::

一款简单美观的音乐播放器:

<div id='custom1' class="mx-5"></div>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
onMounted(async () => {
    await import('aplayer/dist/APlayer.min.css');
    const APlayer = (await import('aplayer')).default;
    const ap = new APlayer({
        container: document.getElementById('custom1'),
        theme:'var(--vp-c-brand-1)',
        audio: [{
            name: '孤独患者',
            artist: '陈奕迅',
            url: 'http://music.163.com/song/media/outer/url?id=64093.mp3',
            cover: 'http://p1.music.126.net/1qr8a9G8pWEMoruLJaBv8A==/109951169014564421.jpg?param=640y300'
        },
        {
            title: '泪桥',
            author: 'AI陶喆 / 伍佰',
            url: 'http://music.163.com/song/media/outer/url?id=2602320199.mp3',
            pic: 'https://p1.music.126.net/yhIdL8Ez0tCvTN1BCYNePQ==/109951169670480040.jpg?param=300x300'
        },
        {
            title: '打上花火',
            author: 'Daoko / 米津玄師',
            url: 'http://music.163.com/song/media/outer/url?id=496869422.mp3',
            pic: 'http://p2.music.126.net/ZUCE_1Tl_hkbtamKmSNXEg==/109951163009282836.jpg?param=300x300'
        },]
    });
});
</script>

## 安装APlayer

```shell
yarn add APlayer
```

## 注入组件

在你的博客首页对应的markdown文件的widgets中注入一个有id的div
```md
---
layout: blog
widgets:
  - name: "音乐播放器"
    html: "<div id='custom1'></div>"
---
```

## 加载播放器

在刚刚的markdown中写入如下代码

```vue
<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
onMounted(async () => {
    await import('aplayer/dist/APlayer.min.css');
    const APlayer = (await import('aplayer')).default;
    const ap = new APlayer({
        container: document.getElementById('custom1'),
        theme:'var(--vp-c-brand-1)',
        audio: [{
            name: '孤独患者',
            artist: '陈奕迅',
            url: 'http://music.163.com/song/media/outer/url?id=64093.mp3',
            cover: 'http://p1.music.126.net/1qr8a9G8pWEMoruLJaBv8A==/109951169014564421.jpg?param=640y300'
        },
        {
            title: '泪桥',
            author: 'AI陶喆 / 伍佰',
            url: 'http://music.163.com/song/media/outer/url?id=2602320199.mp3',
            pic: 'https://p1.music.126.net/yhIdL8Ez0tCvTN1BCYNePQ==/109951169670480040.jpg?param=300x300'
        },
        {
            title: '打上花火',
            author: 'Daoko / 米津玄師',
            url: 'http://music.163.com/song/media/outer/url?id=496869422.mp3',
            pic: 'http://p2.music.126.net/ZUCE_1Tl_hkbtamKmSNXEg==/109951163009282836.jpg?param=300x300'
        },]
    });
});
</script>
```

APlayer的更多参数可以参考[APlayer官网](https://aplayer.js.org/)

这里还简单配置了一下css:

```css
.aplayer {
  margin-left: 1rem !important;
  margin-right: 1rem !important;
  border-radius: 0.75rem !important;
}
```

现在就可以在博客页/标签页等支持widgets配置的布局显示啦!

## 完整代码

```md
---
layout: blog
widgets:
  - name: "音乐播放器"
    link: "/blog-docs/1-config/0-home.html#自定义组件栏"
    html: "<div id='custom1' class='mx-4 rounded-xl'></div>"
---

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
onMounted(async () => {
    await import('aplayer/dist/APlayer.min.css');
    const APlayer = (await import('aplayer')).default;
    const ap = new APlayer({
        container: document.getElementById('custom1'),
        theme:'var(--vp-c-brand-1)',
        audio: [{
            name: '孤独患者',
            artist: '陈奕迅',
            url: 'http://music.163.com/song/media/outer/url?id=64093.mp3',
            cover: 'http://p1.music.126.net/1qr8a9G8pWEMoruLJaBv8A==/109951169014564421.jpg?param=640y300'
        },
        {
            title: '泪桥',
            author: 'AI陶喆 / 伍佰',
            url: 'http://music.163.com/song/media/outer/url?id=2602320199.mp3',
            pic: 'https://p1.music.126.net/yhIdL8Ez0tCvTN1BCYNePQ==/109951169670480040.jpg?param=300x300'
        },
        {
            title: '打上花火',
            author: 'Daoko / 米津玄師',
            url: 'http://music.163.com/song/media/outer/url?id=496869422.mp3',
            pic: 'http://p2.music.126.net/ZUCE_1Tl_hkbtamKmSNXEg==/109951163009282836.jpg?param=300x300'
        },]
    });
});
</script>
```
