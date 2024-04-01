<script setup>
import { data as posts } from '../posts.data.js'
import { useData, withBase } from "vitepress";
import { computed, ref, onMounted, watch } from 'vue';
const { theme, isDark } = useData()
const scrollDown = () => {
    window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
    })
}


let pageSize = 5;
const blogConfig=theme.value.blog;


// 分页功能
if (blogConfig && blogConfig.pageSize) {
    pageSize = blogConfig.pageSize;
}
const total = posts.length;
const currentPage = ref(1);
const totalPage = computed(() => Math.ceil(total / pageSize));
const paginatedPosts = computed(() => {
    const start = (currentPage.value - 1) * pageSize;
    const end = start + pageSize;
    return posts.slice(start, end);
})
const changePage = (curr) => {
    currentPage.value = curr;
}

//首页图片

//默认图片路径
const defaultImgUrl = '';

let lightImg = defaultImgUrl;
let darkImg;

let lightBgImg='';
let darkBgImg='';



const homeImg = ref('');
const homeBgImg = ref('');


if (blogConfig) {
    if (blogConfig.homeImg) {
        lightImg = blogConfig.homeImg;
    }
    if (blogConfig.homeImgDark) {
        darkImg = blogConfig.homeImgDark;
    }
    else {
        darkImg = lightImg;
    }
    if (blogConfig.ornateStyle) {
        blogConfig.homeBgImg?lightBgImg=blogConfig.homeBgImg:lightBgImg=lightImg;
        blogConfig.homeBgImgDark?darkBgImg=blogConfig.homeBgImgDark:darkBgImg=darkImg;
    }
}

onMounted(() => {
    updateImg()
})

const updateImg = () => {
    if (isDark.value) {
        homeImg.value = darkImg;
        homeBgImg.value = darkBgImg;
    }
    else {
        homeImg.value = lightImg;
        homeBgImg.value = lightBgImg;
    }
}

watch(isDark, () => {
    updateImg();
});


</script>

<template>
    <div class="flex w-full flex-col justify-center items-center pt-0 my-0 ">
        <!-- 首页大图 -->
        <div class="w-full h-screen bg-fixed bg-cover bg-center bg-no-repeat flex justify-center items-center flex-col gap-16 relative"
            :style="{ 'background-image': `url(${homeImg})` }">
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
        <div class="flex py-20 justify-center items-center gap-5 flex-col w-full bg-fixed bg-no-repeat bg-cover bg-center" :style="{ 'background-image': `url(${homeBgImg})` }"   >
            <a :href="withBase(post.url)" class="w-full flex justify-center items-center relative"
                v-for="post of paginatedPosts">

                <div
                    class="flex justify-center items-start rounded-lg min-h-32 w-full md:w-7/12 flex-col gap-5 px-5 md:px-16 py-6 md:py-12
                     bg-opacity-50 backdrop-blur-sm border-2
                    "
                    :class="{' bg-gray-800 border-gray-500': isDark, 'border-2 bg-white': !isDark}"
                    
                    >
                    <div class="text-2xl hover:underline underline-offset-4 text-center flex items-center gap-1"><svg
                            v-if="post.frontmatter.pin" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                            class="w-6 h-6 text-[var(--vp-c-indigo-1)]">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" />
                        </svg>
                        <span>{{ post.frontmatter.title }}</span>
                    </div>
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
        </div>
        <div class="flex justify-center items-center gap-2 border-0 flex-row">
            <div @click="changePage(i)" v-for="i in totalPage" v-if="totalPage > 1"
                class="border-2 w-7 h-7 text-center flex justify-center items-center cursor-pointer  border-[var(--vp-c-indigo-1)]"
                :class="{
                'bg-[var(--vp-c-indigo-1)] text-white': i === currentPage,
                'bg-transparent': i !== currentPage,
            }">{{ i }}</div>
        </div>
    </div>

</template>

<style>
.blog-home .VPContent {
    padding-top: 0 !important;
}
</style>