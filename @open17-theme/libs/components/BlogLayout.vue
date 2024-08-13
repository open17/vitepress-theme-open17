<script setup>
import { data as posts } from '../posts.data.js'
import { useData, withBase } from "vitepress";
import { computed, ref, onMounted } from 'vue';

const props = defineProps({
    showContent: Boolean,
})
const { theme,frontmatter } = useData();



const blogConfig = theme.value.blog;

const widgets=[...(blogConfig.widgets||[]),...(frontmatter.value.widgets||[])];

console.log(widgets);

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
    <div class="flex w-full md:flex-row justify-center items-start pt-0 my-0 gap-5 flex-col">
        <!-- 博客信息 -->
        <div class="flex bg-transparent w-full md:w-[20rem] justify-center items-start py-16 flex-col gap-5">
            <div
                class="flex w-full md:rounded-xl p-5 flex-col justify-center items-center gap-3 dark:shadow-none shadow-0 bg-[var(--vp-c-bg-soft)]">
                <img :src="blogConfig.avatar" v-if="blogConfig.avatar" alt="avatar"
                    class=" object-cover object-center w-full rounded-xl" />
                <div class="text-xl font-bold text-center">{{ blogConfig.title }}</div>
                <div class="text-center">{{ blogConfig.desc }}</div>
                <!-- 统计信息 -->
                <div class="flex justify-center items-center gap-20 w-full border-t-2 pt-5 border-dashed mt-2">
                    <div class="flex flex-col justify-center items-center gap-1">
                        <div class="text-sm">POSTS</div>
                        <div class="text-2xl font-bold">{{ posts.length }}</div>
                    </div>
                    <div class="flex flex-col justify-between items-center gap-1">
                        <div class="text-sm">TAGS</div>
                        <div class="text-2xl font-bold">{{ Object.keys(Tags).length }}</div>
                    </div>
                </div>

            </div>

            <div
                class="flex w-full md:rounded-xl p-10 flex-col justify-center  gap-5 dark:shadow-none shadow-0 bg-[var(--vp-c-bg-soft)]">
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
                    <div v-for="(tag, i) in getTagArray()" class="w-full py-1 cursor-pointer border-b-2 tag relative flex justify-between items-center hover:border-[var(--vp-c-brand-1)] 
                         " :class="{ 'border-[var(--vp-c-brand-1)]': activeTag === tag[0] }"
                        @click="activeTag = tag[0]" v-show="(!blogConfig.maxTags) || i < blogConfig.maxTags">
                        <div class="tag">{{ tag[0] == '' ? 'All' : tag[0] }}</div>
                        <span class="px-2 scale-[70%] font-bold bg-[var(--vp-c-brand-1)] text-white">{{
                            tag[1] }}</span>
                    </div>
                </div>
            </div>

            <!-- 用户自定义组件 -->
            <div v-for="widget in widgets"
                class="flex w-full md:rounded-xl p-10 flex-col justify-center  gap-5 dark:shadow-none shadow-0 bg-[var(--vp-c-bg-soft)]">
                <div class=" flex w-full justify-between items-center">
                    <div class="text-xl font-bold">{{ widget.name }}</div>
                    <a v-if="widget.link" :href="widget.link">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>
                    </a>
                </div>
                <div v-html="widget.html" class="w-full relative"></div>
            </div>


        </div>
        <!-- 博客文章 -->
        <div class="flex md:w-7/12 py-20 justify-center items-center gap-5 flex-col w-full">
            <slot :activeTag="activeTag" />
        </div>

    </div>
    <Content v-if="showContent"/> 
</template>

<style>
.blog-home .VPContent {
    padding-top: 0 !important;
}

.shadow-0 {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1)
}
</style>
