<script setup>
import { data as posts } from '../posts.data.js'
import { useData, withBase } from "vitepress";
import { computed, ref, onMounted } from 'vue';
import IconMore from './icon/IconMore.vue'
import IconLink from './icon/IconLink.vue';

const props = defineProps({
    showContent: Boolean,
})
const { theme, frontmatter } = useData();



const blogConfig = theme.value.blog;

const widgets = [...(blogConfig.widgets || []), ...(frontmatter.value.widgets || [])];

const direct = blogConfig.direct || "lft";


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
    <div class="w-full flex justify-center">
        <div class="flex w-full max-w-screen-2xl justify-center items-start pt-0 my-0 gap-5 md:px-20 flex-col-reverse"
            :class="{ 'md:flex-row': direct == 'lft', 'md:flex-row-reverse': direct == 'rgt' }">
            <!-- 博客侧边栏 -->
            <div class="flex bg-transparent w-full md:w-1/4 justify-center items-start py-16 flex-col gap-5">
                <!-- 电脑端个人信息 -->
                <div
                    class="hidden md:flex w-full md:rounded-xl p-5 flex-col justify-center items-center gap-3 dark:shadow-none shadow-0 bg-[var(--vp-c-blog-bg)]">
                    <!-- 头像 -->
                    <img :src="blogConfig.avatar" v-if="blogConfig.avatar" alt="avatar"
                        class=" object-cover object-center w-full rounded-xl " />
                    <div class="mt-3" v-else></div>
                    <!-- 昵称 -->
                    <div class="text-xl font-bold text-center mb-2 mt-2">{{ blogConfig.title }}</div>
                    <!-- 签名 -->
                    <div class="text-center mb-2 text-sm">{{ blogConfig.desc }}</div>
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
                <!-- 侧边栏Tag -->
                <div
                    class="flex w-full md:rounded-xl p-10 flex-col justify-center gap-5 dark:shadow-none shadow-0 bg-[var(--vp-c-blog-bg)]">
                    <!-- 标题 -->
                    <div class=" flex w-full justify-between items-center">
                        <div class="text-xl font-bold">Tags</div>
                        <a v-if="blogConfig.tagPageLink" :href="blogConfig.tagPageLink">
                            <IconMore />
                        </a>
                    </div>
                    <!-- Tags -->
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
                    class="flex w-full md:rounded-xl flex-col py-4 justify-center gap-5 dark:shadow-none shadow-0 bg-[var(--vp-c-blog-bg)]">
                    <div class=" flex w-full justify-between items-center px-5">
                        <div class="text-base font-bold" v-if="widget.name">{{ widget.name }}</div>
                        <a v-if="widget.link" :href="widget.link">
                            <IconLink />
                        </a>
                    </div>
                    <div v-html="widget.html" class="w-full relative">
                    </div>
                </div>
            </div>
            <!-- 博客文章 -->
            <div class="flex md:w-3/4 py-20 justify-center items-center gap-5 flex-col w-full px-3">
                <slot :activeTag="activeTag" />
            </div>

            <!-- 移动端个人信息显示 -->
            <div class="flex md:hidden justify-center items-center w-full mt-10 flex-col gap-3">
                <img :src="blogConfig.avatar" v-if="blogConfig.avatar" alt="avatar"
                    class=" object-cover object-center w-32 rounded-full" />
                <!-- 昵称 -->
                <div class="text-2xl font-bold text-center">{{ blogConfig.title }}</div>
                <!-- 签名 -->
                <div class="text-center text-sm">{{ blogConfig.desc }}</div>
            </div>

        </div>
        <Content v-if="showContent" />
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
