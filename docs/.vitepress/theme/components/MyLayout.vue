<template>
    <Blog v-if="frontmatter.blog && frontmatter.blog === 'home'" />
    <Archive v-else-if="frontmatter.blog && frontmatter.blog === 'archive'" />
    <Tags v-else-if="frontmatter.blog && frontmatter.blog === 'tags'" />
    <Layout :class="{ 'blog': frontmatter.blog && frontmatter.blog === 'home' }">
        <template #doc-before>
            <div class="text-3xl font-bold">{{ frontmatter.title }}</div>
        </template>
    </Layout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from "vitepress";
import Blog from './Blog.vue';
import Archive from './Archive.vue';
import Tags from './Tags.vue';
const { frontmatter } = useData()
const { Layout } = DefaultTheme
</script>


<style>
@tailwind base;
@tailwind components;
@tailwind utilities;



.blog {
    --vp-nav-bg-color: transparent;
    --vp-c-gutter: transparent;
}
.blog{
    min-height:0 !important; 
}
</style>
