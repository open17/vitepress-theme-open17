<!-- eslint-disable vue/require-v-for-key -->
<template>
  <ThemeLayout>
    <div
      class="flex w-full flex-col bg-opacity-90 backdrop-blur-sm dark:shadow-none shadow-md border-2 border-[var(--blog-border-c)] bg-[var(--vp-c-blog-bg)] rounded-xl py-10 px-10">
      <ol class="border-s-2 mt-5" v-for="year in years" :key="year">
        <template v-for="i in 12">
          <li v-if="grouped[year][i]">
            <div class="flex items-center mb-8 -mt-3">
              <div
                class="-ms-[0.3rem] me-3 flex h-2 w-2 items-center justify-center rounded-full bg-[var(--blog-time-line-c)] animate-bounce">
              </div>
              <h4 class="text-lg font-bold">{{ year }} {{ grouped[year][i].monthName }}</h4>
            </div>
          </li>
          <li v-for="post in grouped[year][i].posts" :key="post.id" v-if="grouped[year][i] && grouped[year][i].posts">
            <div class="flex items-center mb-6 -mt-3">
              <div
                class="-ms-[0.3rem] me-3 flex h-2 w-2 items-center justify-center rounded-full bg-[var(--blog-time-line-c2)]">
              </div>
              <div
                class="px-5 py-2 flex justify-between w-full hover:text-[var(--blog-time-line-text)] hover:bg-[var(--blog-time-line-text-bg)] rounded-md flex-col md:flex-row gap-1">
                <a class="text-sm font-medium" :href="withBase(post.url)">
                  {{ post.frontmatter.title }}
                </a>
                <div class="text-sm transition duration-150 ease-in-out">
                  {{ post.frontmatter.date.slice(5, 10) }}
                </div>
              </div>
            </div>
          </li>
        </template>
      </ol>
    </div>
  </ThemeLayout>
</template>

<script setup lang="ts">
// @ts-ignore
import { data as posts } from '../posts.data.js';
import { withBase } from 'vitepress';
import ThemeLayout from './ThemeLayout.vue';

interface DatePosts {
  monthName: string;
  posts: Array<any>;
}

const monthSum = 12;
const grouped: Record<number, Array<DatePosts>> = {};
const years = Array<number>();

const sortedPosts = [...posts].sort((a, b) => {
  const dateA = new Date(a.frontmatter.date);
  const dateB = new Date(b.frontmatter.date);
  return + dateB - +dateA;
});

sortedPosts
  .forEach((post) => {
    const date = new Date(post.frontmatter.date);
    const year = date.getFullYear();
    const monthNumber = date.getMonth();
    const monthName = date.toLocaleString('default', { month: 'long' });
    if (!grouped[year]) {
      years.push(year);
      grouped[year] = Array(12).fill(null);
    }
    let idx = monthSum - monthNumber;
    if (!grouped[year][idx]) {
      grouped[year][idx] = {
        monthName,
        posts: [],
      };
    }
    grouped[year][idx].posts.push(post);
  });
</script>
