<template>
    <Layout :class="{ 'blog-home': frontmatter.layout && frontmatter.layout === 'blog'}">
        <template #doc-before>
            <div class="text-3xl font-bold">{{ frontmatter.title }}</div>
        </template>
    </Layout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from "vitepress";
const { frontmatter } = useData()
const { Layout } = DefaultTheme
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
