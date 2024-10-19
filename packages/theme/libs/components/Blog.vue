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





let pageSize = 5;
if (blogConfig && blogConfig.pageSize) {
    pageSize = blogConfig.pageSize;
}


const currentPage = ref(1);
const totalPage = ref(1);
const pageGroup = ref(0);
const pageGroupSize = ref(5);

const paginatedPosts = (activeTag) => {
    const start = (currentPage.value - 1) * pageSize;
    const end = start + pageSize;
    let postsList = filteredList(activeTag);
    totalPage.value = Math.ceil(postsList.length / pageSize);
    if (totalPage.value < currentPage.value) {
        toFirstPage();
    }
    return postsList.slice(start, end);
}

const nextGroup = () => {
    pageGroup.value++;
    currentPage.value = pageGroup.value * pageGroupSize.value + 1;
    if (currentPage.value > totalPage.value) {
        toFirstPage();
    }
}


const toFirstPage = () => {
    currentPage.value = 1;
    pageGroup.value = 0;
}

// const toLastPage = () => {
//     pageGroup.value = Math.ceil(totalPage.value / pageGroupSize.value) - 1;
//     currentPage.value = totalPage.value;
// }

const lastGroup = () => {
    pageGroup.value--;
    currentPage.value = pageGroup.value * pageGroupSize.value + 1;
}

const realPage = (page) => {
    return page + pageGroup.value * pageGroupSize.value;
}

// const isLastPageGroup = () => {
//     return (pageGroup.value + 1) * pageGroupSize.value >= totalPage.value;
// }

const isFirstPageGroup = () => {
    return pageGroup.value == 0;
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
    <BlogLayout v-slot="{ activeTag }" :showContent="true">
        <!-- 博客文章 -->
        <div class="w-full flex justify-center items-center relative" v-for="post of paginatedPosts(activeTag)">
            <a :href="withBase(post.url)" class="w-full">
                <div class="flex justify-start items-start rounded-xl min-h-36 w-full flex-col gap-5 md:gap-2 px-6 md:px-10 py-8 md:py-8
                     bg-opacity-90 backdrop-blur-sm
                    dark:shadow-none shadow-0 bg-[var(--vp-c-blog-bg)] relative">
                    <!-- 置顶小三角 -->
                    <div class=" z-20 absolute top-0 left-0 w-0 h-0 border-t-[1.5rem] border-r-transparent border-r-[1.5rem] border-[var(--vp-c-brand-1)]"
                        v-if="post.frontmatter.pin"></div>
                    <!-- 文章图片 -->
                    <div class="w-full md:h-64 md:-mb-2 h-48 -mb-6" v-if="post.frontmatter.img">
                        <img :src="post.frontmatter.img" alt=""
                            class=" absolute top-0 left-0 rounded-t-xl w-full h-48 md:h-64 object-cover">
                    </div>
                    <!-- 标题 -->
                    <div class="text-xl font-bold ">
                        <span>{{ post.frontmatter.title }}</span>
                    </div>
                    <!-- 摘要 -->
                    <div v-html="post.excerpt || post.frontmatter.desc" class=" text-sm mt-2"></div>
                    <!-- 文章信息 -->
                    <div class="flex justify-end w-full items-center flex-wrap text-sm gap-2">

                        <div class="flex justify-end items-end gap-1">
                            <div v-for="(tag, idx) in post.frontmatter.tags">{{
                                idx === post.frontmatter.tags.length - 1 ? tag : tag + ' · ' }}</div>
                        </div>
                        <div class="">|</div>
                        <div>{{ post.frontmatter.date.substring(0, 10) }}</div>
                    </div>
                </div>
            </a>
        </div>
        <!-- 分页 -->
        <div class="flex justify-between items-center gap-2 border-0 flex-row w-full px-5" v-if="totalPage > 1">
            <!-- 上一页 -->
            <div class="w-14">
                <div @click="lastGroup()"
                    class="border-2 w-full h-8 text-center flex justify-center items-center cursor-pointer bg-[var(--vp-c-blog-bg)] rounded-md text-sm"
                    v-show="!isFirstPageGroup()">
                    Prev </div>
            </div>
            <div class="flex justify-center items-center gap-2">
                <div @click="changePage(realPage(i))" v-for="i in Math.min(totalPage, pageGroupSize)"
                    v-show="realPage(i) <= totalPage"
                    class="border-2 w-7 h-7 text-center flex justify-center items-center cursor-pointer rounded-md"
                    :class="{
                        'bg-[var(--vp-c-brand-1)] text-white': realPage(i) === currentPage,
                        'bg-[var(--vp-c-blog-bg)]': realPage(i) !== currentPage,
                    }">{{ realPage(i) }}
                </div>
            </div>
            <!-- 下一页 -->
            <div class="w-14">
                <div @click="nextGroup()"
                    class="border-2 w-full h-8 text-center flex justify-center items-center cursor-pointer  bg-[var(--vp-c-blog-bg)] rounded-md text-sm">
                    Next
                </div>
            </div>
        </div>
    </BlogLayout>

</template>