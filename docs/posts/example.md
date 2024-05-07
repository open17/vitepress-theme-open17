---
title: 博客示例
date: 2024-04-26
tags:
    - 示例
    - theme
pin: true
layout: page
desc: 本主题的示例博客
---


<script setup>
    import BlogCard from '../components/BlogCard.vue'
    import BlogCardPage from '../components/BlogCardPage.vue'
    const blog=[
        {
            img:'https://cdn.jsdelivr.net/gh/open17/Pic/img/202405080238501.png',
            title:'xcpc note',
            desc:'算法练习,笔记与模板',
            url:'https://xcpc.open17.vip'
        },
    ];
</script>

<BlogCardPage>
<template #title>本主题的博客示例</template>
<BlogCard :blog="blog" />
</BlogCardPage>
