---
title: 博客示例
date: 2024-04-26
tags:
    - 示例
    - theme
pin: true
layout: page
---

<script setup>
    import BlogCard from '../components/BlogCard.vue'
    import BlogCardPage from '../components/BlogCardPage.vue'
    const blog=[
        {
            img:'https://cdn.jsdelivr.net/gh/open17/Pic/img/202404061020261.png',
            title:'open17主题demo',
            desc:'open17主题博客的简单示例',
            url:'/page/demo'
        },
        {
            img:'https://cdn.jsdelivr.net/gh/open17/Pic/img/202404102116657.png',
            title:'xcpc note',
            desc:'算法练习,笔记与模板',
            url:'https://xcpc.open17.vip'
        },
    ];
</script>

<BlogCardPage>
<template #title>下面是本主题的一些博客示例</template>
<BlogCard :blog="blog" />
</BlogCardPage>
