<script setup>
import { data as posts } from '../posts.data.js'
import { useData, withBase } from "vitepress";
import { computed, ref } from 'vue';
import BlogLayout from './BlogLayout.vue';

const { theme } = useData()
const scrollUp = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

const blogConfig = theme.value.blog;

// 分页功能
let pageSize = 5;
if (blogConfig && blogConfig.pageSize) {
    pageSize = blogConfig.pageSize;
}

const currentPage = ref(1);
const totalPage = ref(1);

const paginatedPosts = (activeTag) => {
    const start = (currentPage.value - 1) * pageSize;
    const end = start + pageSize;
    let postsList = filteredList(activeTag);
    totalPage.value = Math.ceil(postsList.length / pageSize);
    if (totalPage.value < currentPage.value) {
        currentPage.value = 1;
    }
    return postsList.slice(start, end);
}

const changePage = (curr) => {
    currentPage.value = curr;
    scrollUp();
}

const filteredList = (activeTag) => {
    if (activeTag) {
        return posts.filter(item => item.frontmatter.tags && item.frontmatter.tags.includes(activeTag));
    }
    return posts;
}

</script>

<template>
    <BlogLayout v-slot="{ activeTag }">
        <div class="w-full flex justify-center items-center relative" v-for="post of paginatedPosts(activeTag)">
            <div class="flex justify-center items-start md:rounded-xl min-h-32 w-full flex-col gap-5 px-5 md:px-16 py-6 md:py-12
                     bg-opacity-90 backdrop-blur-sm
                    dark:shadow-none shadow-0 bg-[var(--vp-c-bg-soft)]">
                <div :class="{ 'border-l-[--vp-c-red-2]': post.frontmatter.pin,'border-l-[var(--vp-c-indigo-1)]':!post.frontmatter.pin }"
                    class="text-3xl font-bold hover:underline underline-offset-8 text-center flex items-center gap-1 border-l-4 pl-6 relative right-6">
                    <a :href="withBase(post.url)">{{ post.frontmatter.title }}</a>
                </div>
                <div v-html="post.excerpt || post.frontmatter.desc" class=" text-lg"></div>
                <div class="flex justify-between w-full items-center flex-wrap">
                    <span class="text-[var(--vp-c-text-3)]">{{ post.frontmatter.date.substring(0, 10) }}</span>
                    <div class="flex justify-end items-end gap-2">
                        <div class="text-[var(--vp-c-indigo-1)]" v-for="(tag, idx) in post.frontmatter.tags">{{
                            idx === post.frontmatter.tags.length - 1 ? tag : tag + ',' }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex justify-center items-center gap-2 border-0 flex-row bg-t">
            <div @click="changePage(i)" v-for="i in totalPage" v-if="totalPage > 1"
                class="border-2 w-7 h-7 text-center flex justify-center items-center cursor-pointer  border-[var(--vp-c-indigo-1)]"
                :class="{
                    'bg-[var(--vp-c-indigo-1)] text-white': i === currentPage,
                    'bg-transparent': i !== currentPage,
                }">{{ i }}</div>
        </div>
    </BlogLayout>

</template>