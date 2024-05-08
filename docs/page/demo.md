---
layout: blog
lastUpdated: false
bgImg: "https://cdn.jsdelivr.net/gh/open17/Pic/img/202404020238396.png"
bgImgDark: 'https://cdn.jsdelivr.net/gh/open17/Pic/img/202405071545259.jpg'
---

<script setup>
import BlogCard from '../components/BlogCard.vue'
import { onMounted, createApp,h } from 'vue';
const blog=[
    {
        img:'https://cdn.jsdelivr.net/gh/open17/Pic/img/202405080238501.png',
        desc:'算法练习,笔记与模板',
        url:'https://alg.open17.vip'
    },
];
onMounted(() => {
    const el = document.getElementById('custom1');
    const app = createApp({
      render() {
        return h(BlogCard, {
          blog: blog
        });
      }
    });
    app.mount(el);
});
</script>

