---
layout: blog
lastUpdated: false
bgImg: "/bg2.jpg"
bgImgDark: '/bg2_dark.jpg'
widgets:
  - name: "🍰 更多示例"
    link: "/blog-docs/1-config/0-home.html#自定义组件栏"
    html: "我的博客~<br><br><div id='custom1'></div>"
---

<script setup>
import BlogCard from '../components/BlogCard.vue'
import { onMounted, createApp,h } from 'vue';
const blog=[
    {
        img:'https://cdn.jsdelivr.net/gh/open17/Pic/img/202405080238501.png',
        desc:'我滴博客',
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

