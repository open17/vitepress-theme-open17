<template>
  <ThemeLayout>
    <div
      class="flex w-full flex-col bg-opacity-80 backdrop-blur-sm dark:shadow-none shadow-md border-2 border-[var(--blog-border-c)] bg-[var(--vp-c-blog-bg)] rounded-xl py-10 px-10">
      <!-- tags list -->
      <div class="flex justify-left items-center flex-wrap md:mx-10 md:gap-3 gap-2">
        <span v-for="(num, tag) in tagsMap" :key="tag" class=" px-2 rounded-sm cursor-pointer border"
          :class="{ 'bg-[var(--blog-tag-bg-2)] text-[var(--blog-tag-text-2)] border-[var(--blog-tag-text-2)]': ActiveTag == tag, 'bg-[var(--blog-tag-bg-1)] text-[var(--blog-tag-text-1)] border-[var(--blog-tag-text-1)]': ActiveTag != tag }"
          @click="ActiveTag = tag">
          {{ tag == '' ? allText : tag }}
        </span>
      </div>
      <div class="text-2xl w-full text-center border-dashed border-t-2 pt-5 mt-10 mb-5"></div>
      <!--  posts with tags-->
      <div class="flex justify-center flex-col gap-10 md:gap-5 px-10">
        <div class="flex items-center gap-2 flex-col md:flex-row md:gap-20 md:justify-between"
          v-for="post in filteredList" :key="post.url">
          <a :href="withBase(post.url)" class="hover:underline text-base">
            {{ post.frontmatter.title }}
          </a>
          <div class="flex justify-end items-end gap-2">
            <span class=" cursor-pointer text-sm px-2 rounded-sm border"
              :class="{ 'bg-[var(--blog-tag-bg-2)] text-[var(--blog-tag-text-2)] border-[var(--blog-tag-text-2)]': ActiveTag == tag, 'bg-[var(--blog-tag-bg-1)] text-[var(--blog-tag-text-1)] border-[var(--blog-tag-text-1)]': ActiveTag != tag }"
              v-for="(tag, idx) in post.frontmatter.tags" @click="ActiveTag = tag">
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </ThemeLayout>
</template>

<script setup>
import { computed } from 'vue';
import { withBase, useData } from 'vitepress';
import ThemeLayout from './ThemeLayout.vue';
import { getLocalizedString } from '../utils/constants';
import { useTags } from '../composables/useTags';

const { lang } = useData();
const allText = getLocalizedString('all', lang.value);

const { tagsMap, activeTag: ActiveTag, filterPostsByActiveTag } = useTags();

const filteredList = computed(() => filterPostsByActiveTag());
</script>
