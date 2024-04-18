<script setup>
import { data as posts } from '../posts.data.js'
import { useData, withBase } from "vitepress";
import { computed, ref, onMounted, watch } from 'vue';
const { theme } = useData()
const blogConfig = theme.value.blog;
let Tags = ref({ '': posts.length });

let activeTag = ref('');

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

const getTagArray = () => {
    let tagArray = [];
    tagArray = Object.entries(Tags.value);
    tagArray.sort((a, b) => b[1] - a[1]);
    return tagArray;
}

</script>

<template>
    <div class="flex w-full md:flex-row justify-center items-start pt-0 my-0 gap-16 flex-col">
        <!-- 博客信息 -->
        <div class="flex bg-transparent w-full md:w-[22rem] justify-center items-start py-16 flex-col gap-5">
            <div
                class="flex w-full rounded-3xl p-5 flex-col justify-center items-center gap-5 dark:shadow-none shadow-0 bg-white dark:bg-gray-700">
                <img :src="blogConfig.avatar" v-if="blogConfig.avatar" alt="avatar"
                    class=" object-cover object-center w-full rounded-3xl" />
                <div class="text-xl font-bold mt-5">{{ blogConfig.title }}</div>
                <div class="text-center">{{ blogConfig.desc }}</div>
            </div>
            <div
                class="flex w-full rounded-3xl p-10 flex-col justify-center  gap-5 dark:shadow-none shadow-0 bg-white dark:bg-gray-700">
                <div class=" flex w-full justify-between items-center">
                    <div class="text-xl font-bold">Tags</div>
                    <a v-if="blogConfig.tagPageLink" :href="blogConfig.tagPageLink">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                    </a>
                </div>
                <div class="flex justify-center items-center flex-wrap gap-3 flex-col">
                    <div v-for="(tag, i) in getTagArray()" class="w-full py-1 cursor-pointer border-b-2 tag relative flex justify-between items-center hover:border-[var(--vp-c-indigo-1)] 
                         " :class="{ 'border-[var(--vp-c-indigo-1)]': activeTag === tag[0] }"
                        @click="activeTag = tag[0]" v-show="(!blogConfig.maxTags) || i < blogConfig.maxTags">
                        <div class="tag">{{ tag[0] == '' ? 'All' : tag[0] }}</div>
                        <span class="px-2 scale-[70%] font-bold bg-[var(--vp-c-indigo-1)] text-white">{{
                            tag[1] }}</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- 博客文章 -->
        <div class="flex md:w-7/12 py-20 justify-center items-center gap-5 flex-col w-full">
            <slot :activeTag="activeTag" />
        </div>

    </div>

</template>

<style>
.blog-home .VPContent {
    padding-top: 0 !important;
}

.shadow-0 {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1)
}
</style>
