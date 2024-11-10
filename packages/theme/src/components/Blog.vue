<!-- eslint-disable vue/require-v-for-key -->
<script setup>
import { data as posts } from '../posts.data.js';
import { useData, withBase } from 'vitepress';
import { ref } from 'vue';
import ThemeLayout from './ThemeLayout.vue';

const { theme } = useData();
const scrollUp = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

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
};

const nextGroup = () => {
  pageGroup.value++;
  currentPage.value = pageGroup.value * pageGroupSize.value + 1;
  if (currentPage.value > totalPage.value) {
    toFirstPage();
  }
};

const toFirstPage = () => {
  currentPage.value = 1;
  pageGroup.value = 0;
};

const lastGroup = () => {
  pageGroup.value--;
  currentPage.value = pageGroup.value * pageGroupSize.value + 1;
};

const realPage = (page) => {
  return page + pageGroup.value * pageGroupSize.value;
};

const isFirstPageGroup = () => {
  return pageGroup.value == 0;
};

const changePage = (curr) => {
  currentPage.value = curr;
  scrollUp();
};

const filteredList = (activeTag) => {
  if (activeTag) {
    return posts.filter(
      (item) =>
        item.frontmatter.tags && item.frontmatter.tags.includes(activeTag)
    );
  }
  return posts;
};

const getData = (date) => {
  const language = typeof navigator !== 'undefined' ? navigator.language || navigator.userLanguage : 'en-US';
  return new Date(date).toLocaleDateString(language, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

</script>

<template>
  <ThemeLayout v-slot="{ activeTag }" :showContent="true">
    <!-- 博客文章 -->
    <div class="w-full flex justify-center items-center relative" v-for="post of paginatedPosts(activeTag)">
      <a :href="withBase(post.url)" class="w-full rounded-xl">
        <div
          class="  flex justify-center items-start w-full rounded-xl flex-col gap-5 md:gap-2 px-6 md:px-10 py-8 md:py-8 bg-opacity-90 backdrop-blur-sm dark:shadow-none shadow-md border-2 border-[var(--blog-border-c)] bg-[var(--vp-c-blog-bg)] relative">
          <!-- 置顶标识 -->
          <div v-if="post.frontmatter.pin" class=" absolute top-0 left-0 w-0 h-0">
            <div
              class="z-20 absolute top-0 left-0 w-0 h-0 border-t-[2rem] border-r-transparent border-r-[2rem] border-[var(--vp-c-blog-bg)] rounded-tl-xl">
            </div>
            <div
              class="z-10 absolute top-0 left-0 w-0 h-0 border-t-[3rem] border-r-transparent border-r-[3rem] border-[var(--vp-c-brand-2)] rounded-tl-xl">
            </div>
          </div>
          <!-- 文章图片 -->
          <div class="w-full md:h-64 md:-mb-2 h-48 -mb-6" v-if="post.frontmatter.cover">
            <img :src="post.frontmatter.cover" alt=""
              class="absolute top-0 left-0 rounded-t-xl w-full h-48 md:h-64 object-cover" />
          </div>
          <!-- 标题 -->
          <div class="text-xl font-bold">
            <span>{{ post.frontmatter.title }}</span>
          </div>
          <!-- 摘要 -->
          <div v-html="post.excerpt || post.frontmatter.desc" class="text-sm my-2"></div>
          <!-- 文章信息 -->
          <div class="flex justify-between w-full items-center flex-wrap text-sm gap-2">
            <div class="flex justify-end items-end gap-2">
              <div v-for="(tag, idx) in post.frontmatter.tags"
                class="bg-[var(--blog-tag-bg-2)] text-[var(--blog-tag-text-2)] border-[var(--blog-tag-text-2)] px-2 rounded-sm">
                <span>{{ tag }}</span>
              </div>
            </div>
            <div>{{ getData(post.frontmatter.date.substring(0, 10)) }}</div>
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
          Prev
        </div>
      </div>
      <div class="flex justify-center items-center gap-2">
        <div @click="changePage(realPage(i))" v-for="i in Math.min(totalPage, pageGroupSize)"
          v-show="realPage(i) <= totalPage"
          class="border-2 w-7 h-7 text-center flex justify-center items-center cursor-pointer rounded-md" :class="{
            'bg-[var(--vp-c-brand-1)] text-white': realPage(i) === currentPage,
            'bg-[var(--vp-c-blog-bg)]': realPage(i) !== currentPage,
          }">
          {{ realPage(i) }}
        </div>
      </div>
      <!-- 下一页 -->
      <div class="w-14">
        <div @click="nextGroup()"
          class="border-2 w-full h-8 text-center flex justify-center items-center cursor-pointer bg-[var(--vp-c-blog-bg)] rounded-md text-sm">
          Next
        </div>
      </div>
    </div>
  </ThemeLayout>
</template>
