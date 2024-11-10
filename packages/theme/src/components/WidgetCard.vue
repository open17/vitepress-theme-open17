<template>
    <div v-for="widget in widgets"
        class="flex w-full md:rounded-xl flex-col py-4 justify-center gap-5 dark:shadow-none shadow-md border-2 border-[var(--blog-border-c)] bg-[var(--vp-c-blog-bg)]">
        <div class="flex w-full justify-between items-center px-5">
            <div class="text-base font-bold" v-if="widget.name">
                {{ widget.name }}
            </div>
            <a v-if="widget.link" :href="widget.link">
                <IconLink />
            </a>
        </div>
        <div v-html="widget.html" class="w-full relative"></div>
    </div>
</template>


<script lang="ts" setup>
import IconLink from './icon/IconLink.vue';
import { useData } from 'vitepress';
const { theme, frontmatter } = useData<Open17Config>();
const widgets = [
    ...(theme.value.blog?.widgets || []),
    ...(frontmatter.value.widgets || []),
];
</script>