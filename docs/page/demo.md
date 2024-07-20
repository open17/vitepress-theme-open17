---
layout: blog
lastUpdated: false
bgImg: "/bg2.jpg"
bgImgDark: '/bg_dark.jpg'
widgets:
  - name: "🍰广告时间"
    link: "/blog-docs/1-config/0-home.html#自定义组件栏"
    html: "主题博客示例<br><br><div id='custom1'></div>"
---

<script setup>
import BlogCard from '../components/BlogCard.vue'
import { onMounted, createApp,h } from 'vue';
const blog=[
    {
        img:'https://cdn.jsdelivr.net/gh/open17/Pic/img/202405080238501.png',
        desc:'算法练习,笔记与模板',
        url:'https://www.open17.vip'
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

