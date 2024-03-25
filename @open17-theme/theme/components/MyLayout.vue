<template>
    <Layout :class="{ 'blog-home': frontmatter.layout && frontmatter.layout === 'blog' }" v-if="!isLoading">
        <template #doc-before>
            <div class="text-3xl font-bold">{{ frontmatter.title }}</div>
        </template>
    </Layout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from "vitepress";
import { onMounted,ref } from 'vue';
const isLoading = ref(true);
onMounted(() => {
    let scriptElement = document.createElement('script');
    scriptElement.src = "https://cdn.tailwindcss.com";
    document.head.appendChild(scriptElement);
    scriptElement.onload = function () {
        console.log("Script loaded successfully");  
        isLoading.value = false;
    };
});

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
