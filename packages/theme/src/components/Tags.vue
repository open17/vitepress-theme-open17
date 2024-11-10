<template>
  <ThemeLayout>
    <div
      class="flex w-full flex-col bg-opacity-90 backdrop-blur-sm dark:shadow-none shadow-md border-2 border-[var(--blog-border-c)] bg-[var(--vp-c-blog-bg)] rounded-xl py-10 px-10">
      <!-- tags list -->
      <div class="flex justify-left items-center flex-wrap md:mx-10 md:gap-3 gap-2">
        <span v-for="(num, tag) in Tags" :key="tag" class=" px-2 rounded-sm cursor-pointer border"
          :class="{ 'bg-[var(--blog-tag-bg-2)] text-[var(--blog-tag-text-2)] border-[var(--blog-tag-text-2)]': ActiveTag == tag, 'bg-[var(--blog-tag-bg-1)] text-[var(--blog-tag-text-1)] border-[var(--blog-tag-text-1)]': ActiveTag != tag }"
          @click="ActiveTag = tag">
          {{ tag == '' ? 'All' : tag }}
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
import { ref, computed, onMounted } from 'vue';
import { data as posts } from '../posts.data.js';
import { withBase } from 'vitepress';
import ThemeLayout from './ThemeLayout.vue';

let Tags = ref({ '': posts.length });
let ActiveTag = ref('');
onMounted(() => {
  posts.forEach((post) => {
    const tags = post.frontmatter.tags;
    if (tags) {
      tags.forEach((tag) => {
        if (Tags.value[tag]) {
          Tags.value[tag]++;
        } else {
          Tags.value[tag] = 1;
        }
      });
    }
  });
});

const filteredList = computed(() => {
  let list = posts;
  if (ActiveTag.value) {
    list = list.filter(
      (item) =>
        item.frontmatter.tags && item.frontmatter.tags.includes(ActiveTag.value)
    );
  }
  return list;
});
</script>
