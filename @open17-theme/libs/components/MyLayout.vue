<template>
    <Layout :class="{
        'blog-home': isBlogTop && frontmatter.layout === 'blog',
        'light-post': !isDark,
        'dark-post': isDark
    }" class=" bg-no-repeat bg-center bg-fixed bg-cover" :style="{ 'background-image': `url(${getImg()})` }"
        v-show="!isLoading">
        <template #doc-before>
            <div class="text-3xl font-bold">{{ frontmatter.title }}</div>
        </template>
        <template #doc-after>
            <!-- 评论 -->
        </template>
    </Layout>
    <div class="absolute z-0 top-0 max-w-0 max-h-0" v-if="!isLoading"></div>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from "vitepress";
import { onMounted, ref } from 'vue';
const { frontmatter, isDark, theme } = useData();
const { Layout } = DefaultTheme;

const isLoading = ref(true);
const isBlogTop = ref(frontmatter.value.layout === 'blog');

onMounted(() => {
    import('../../tailwind').then(() => {
        isLoading.value = false;
    })
    window.addEventListener('scroll', () => {
        isBlogTop.value = window.scrollY <= 50;
    });
});


const getImg = () => {
    if (!theme.value.blog || !theme.value.blog.ornateStyle) return null;
    if (frontmatter.value.bgImg) return frontmatter.value.bgImg;
    if (theme.value.blog && (frontmatter.value.layout === 'docs' || !frontmatter.value.layout)) {
        return theme.value.blog.bgImg;
    }
    return null;
}
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;



.blog-home {
    --vp-nav-bg-color: transparent;
    --vp-c-gutter: transparent;
}



.light-post #VPContent {
    background: #ffffffcb;
}

.dark-post #VPContent {
    background: #1b1b1fc3;
}


#VPContent .aside-curtain {
    display: none;
}

.MathJax {
    overflow-y: hidden;
    overflow-x: auto;
}

/* 修复默认样式问题 */
@media (min-width: 960px) {
    .VPNavBar[data-v-cf6e7c5e]:not(.home) {
        background-color: var(--vp-nav-bg-color) !important;
    }
}
</style>
