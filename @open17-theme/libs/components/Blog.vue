<script setup>
import { data as posts } from '../posts.data.js'
import { useData, withBase } from "vitepress";
import { computed, ref, onMounted, watch } from 'vue';
const { theme } = useData()
const scrollUp = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}


let pageSize = 3;
const blogConfig = theme.value.blog;


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
    scrollUp();
}




let Tags = ref({ '': posts.length });

onMounted(() => {
    posts.forEach(post => {
        const tags = post.frontmatter.tags;
        if (tags) {
            tags.forEach(tag => {
                if (Tags.value[tag]) {
                    Tags.value[tag]++;
                }
                else {
                    Tags.value[tag] = 1;
                }
            })
        }

    });
});



</script>

<template>
    <div class="flex w-full md:flex-row justify-center items-start pt-0 my-0 gap-16 flex-col">
        <!-- 博客信息 -->
        <div class="flex bg-transparent w-full md:w-80 justify-center items-start py-16 flex-col gap-5">
            <div class="flex w-full rounded-3xl p-5 flex-col justify-center items-center gap-5 dark:shadow-none shadow-md bg-white dark:bg-gray-700"
               >
                <img :src="blogConfig.avatar" v-if="blogConfig.avatar" alt="avatar"
                    class=" object-cover object-center w-full rounded-3xl" />
                <div class="text-xl font-bold mt-5">{{ blogConfig.title }}</div>
                <div class="text-center">{{ blogConfig.desc }}</div>
            </div>
            <div class="flex w-full rounded-3xl p-10 flex-col justify-center  gap-5 dark:shadow-none shadow-md bg-white dark:bg-gray-700">
                <div class="text-xl font-bold ">Tags</div>
                <div class="flex justify-center items-center flex-wrap gap-1">
                    <div v-for="(num, tag) in Tags" :key="tag"
                        class=" px-2 py-1 rounded-md m-2 cursor-pointer border-2 tag relative flex justify-between items-center gap-2 border-[var(--vp-c-indigo-1)]"
                        @click="ActiveTag = tag">
                        <div class="tag">{{ tag == '' ? 'All' : tag }}</div>
                        <span class="px-2 scale-[70%] font-bold bg-[var(--vp-c-indigo-1)] text-white">{{
                            num
                            }}</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- 博客文章 -->
        <div class="flex md:w-7/12 py-20 justify-center items-center gap-5 flex-col w-full">
            <div class="w-full flex justify-center items-center relative" v-for="post of paginatedPosts">

                <div class="flex justify-center items-start rounded-3xl min-h-32 w-full flex-col gap-5 px-5 md:px-16 py-6 md:py-12
                     bg-opacity-90 backdrop-blur-sm
                    dark:shadow-none shadow-md bg-white dark:bg-gray-700">
                    <div :class="{'border-l-red-400':post.frontmatter.pin}" class="text-3xl font-bold hover:underline underline-offset-8 text-center flex items-center gap-1 border-l-4 border-l-blue-400 pl-6 relative right-6">
                        <a :href="withBase(post.url)">{{ post.frontmatter.title }}</a>
                    </div>
                    <div v-html="post.excerpt" class=" text-lg"></div>
                    <div class="flex justify-between w-full items-center">
                        <div>{{ post.frontmatter.date.substring(0, 10) }}</div>
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
        </div>

    </div>

</template>

<style>
.blog-home .VPContent {
    padding-top: 0 !important;
}
</style>