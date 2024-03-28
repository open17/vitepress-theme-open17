<template>
    <Layout :class="{ 'blog-home': isBlogTop && frontmatter.layout === 'blog' }" v-if="!isLoading">
        <template #doc-before>
            <div class="text-3xl font-bold">{{ frontmatter.title }}</div>
        </template>
    </Layout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from "vitepress";
import { onMounted, ref } from 'vue';
const { frontmatter } = useData();
const { Layout } = DefaultTheme;

const isLoading = ref(true);
const isBlogTop = ref(frontmatter.value.layout === 'blog');

onMounted(() => {
    import('../../tailwind').then(() => {
        isLoading.value = false;
    })
    if (frontmatter.value.layout === 'blog') {
        window.addEventListener('scroll', () => {
            isBlogTop.value = window.scrollY <= 50;
        });
    }
});
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;



.blog-home {
    --vp-nav-bg-color: transparent;
    --vp-c-gutter: transparent;
}
</style>
