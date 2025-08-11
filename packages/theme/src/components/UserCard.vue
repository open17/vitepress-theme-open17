<template>
    <!-- 电脑端 -->
    <div class="hidden md:flex w-full md:rounded-xl p-5 flex-col justify-center items-center gap-2 dark:shadow-none shadow-md border-2 border-[var(--blog-border-c)] bg-[var(--vp-c-blog-bg)]"
        v-if="!props.isMobile">
        <!-- Avatar -->
        <img :src="userConfig?.avatar" v-if="userConfig?.avatar" alt="avatar"
            class="object-cover object-center w-full rounded-xl" />
        <div class="mt-3" v-else></div>
        <!-- Name -->
        <div class="text-xl font-bold text-center mt-2">
            {{ userConfig?.name }}
        </div>
        <!-- Description -->
        <div class="text-center text-sm font-semibold">{{ userConfig?.describe }}</div>
        <!-- Stats -->
        <div class="flex justify-center items-center gap-20 w-full border-t-2 pt-5 border-dashed mt-2">
            <div class="flex flex-col justify-center items-center gap-1">
                <div class="text-sm">{{ postsText }}</div>
                <div class="text-xl">{{ posts.length }}</div>
            </div>
            <div class="flex flex-col justify-center items-center gap-1">
                <div class="text-sm">{{ tagsText }}</div>
                <div class="text-xl">{{ uniqueTagCount }}</div>
            </div>
        </div>
    </div>
    <!-- 移动端个人信息显示 -->
    <div class="flex md:hidden justify-center items-center w-full mt-10 flex-col gap-3" v-else>
        <img :src="userConfig?.avatar" v-if="userConfig?.avatar" alt="avatar"
            class="object-cover object-center w-32 rounded-full" />
        <!-- 昵称 -->
        <div class="text-2xl font-bold text-center">{{ userConfig?.name }}</div>
        <!-- 签名 -->
        <div class="text-center text-sm">{{ userConfig?.describe }}</div>
    </div>
</template>

<script setup lang="ts">

// TODO 待优化
// @ts-ignore
import { data as posts } from '../posts.data.js';

import { useData } from 'vitepress';
import { defineProps, computed } from 'vue';
import { getLocalizedString } from '../utils/constants';
import { useTags } from '../composables/useTags';

const { theme, lang } = useData<Open17Config>();

const userConfig = theme.value.blog ? theme.value.blog.user : null;

const { uniqueTagCount } = useTags();

const postsText = computed(() => getLocalizedString('posts', lang.value));
const tagsText = computed(() => getLocalizedString('tags', lang.value));

const props = defineProps<{
    isMobile: Boolean
}>();
</script>