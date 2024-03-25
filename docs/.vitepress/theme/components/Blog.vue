<script setup>
import { data as posts } from '../posts.data.js'
import { useData, withBase } from "vitepress";
const { frontmatter, theme, isDark } = useData()
const scrollDown = () => {
    window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
    })
}
</script>

<template>
    <div class="flex w-full flex-col gpa-5  justify-center items-center pt-0">
        <!-- 首页大图 -->
        <div class="w-full h-screen bg-fixed bg-cover bg-center flex justify-center items-center flex-col gap-16 relative"
            :style="{ 'background-image': `url(${isDark ? theme.blog.imgDark : theme.blog.img})` }">
            <div class=" text-5xl font-bold">{{ theme.blog.title }}</div>
            <div class=" text-3xl">{{ theme.blog.desc }}</div>
            <!-- 下滑图标 -->
            <svg @click="scrollDown" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="currentColor"
                class="w-10 h-10 animate-bounce absolute bottom-16 cursor-pointer">
                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
        </div>
        <!-- 博客文章 -->
        <div class="flex mt-20 justify-center items-center gap-5 flex-col w-full">
            <a :href="withBase(post.url)" class="w-full flex justify-center items-center relative"
                v-for="post of posts">
                <div
                    class="flex justify-center items-start border-2 rounded-lg min-h-32 w-7/12 flex-col gap-4 px-16 py-6">
                    <div class="text-2xl hover:underline underline-offset-4">{{ post.frontmatter.title }}</div>
                    <div v-html="post.excerpt"></div>
                    <div class="flex justify-between w-full items-center">
                        <div>{{ post.frontmatter.date.substring(0, 10) }}</div>
                        <div class="flex justify-end items-end gap-2">
                            <a class="cursor-pointer text-[var(--vp-c-indigo-1)]"
                                v-for="(tag, idx) in post.frontmatter.tags">{{
                idx === post.frontmatter.tags.length - 1 ? tag : tag + ',' }}</a>
                        </div>
                    </div>
                </div>
            </a>
            <!-- <div class="flex justify-center items-center gap-2">
                <span v-for="i in 5" class="border-2 w-7 h-7 text-center flex justify-center items-center cursor-pointer">{{ i }}</span>
            </div> -->
        </div>
    </div>

</template>

<style>
.blog-home .VPContent {
    padding-top: 0 !important;
}
</style>