<template>
  <BlogLayout>
    <div class="flex w-full flex-col justify-center items-center bg-opacity-90 backdrop-blur-sm
                    dark:shadow-none shadow-0 bg-[var(--vp-c-bg-soft)] md:rounded-xl py-20 px-10">
      <div class="text-5xl font-bold">Archive</div>
      <!-- 博客文章 -->
      <div class="flex mt-10 justify-center items-center">
        <ul>
          <li v-for="year of years">
            <h2 class="text-3xl my-10 font-bold text-center">{{ year }}</h2>
            <ul>
              <li v-for="(monthPosts, month) in grouped[year]" :key="month">
                <h3 class="text-xl my-5 font-bold text-[--vp-c-brand-3]">{{ monthPosts.monthName }}</h3>
                <ul>
                  <li v-for="post in monthPosts.posts" :key="post.id">
                    <div class="flex items-center gap-10 justify-between mb-3">
                      <a :href="withBase(post.url)" class="mr-2 hover:underline">{{ post.frontmatter.title }}</a>
                      <span class="text-[var(--vp-c-text-3)]">{{ post.frontmatter.date.substring(0, 10) }}</span>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </BlogLayout>
</template>

<script setup>
import { ref, computed } from 'vue';
import { data as posts } from '../posts.data.js';
import { useData, withBase } from 'vitepress';
import BlogLayout from './BlogLayout.vue';
const { frontmatter, theme } = useData();

const grouped = {};
const sortedPosts = [...posts].sort((a, b) => {
  const dateA = new Date(a.frontmatter.date);
  const dateB = new Date(b.frontmatter.date);
  return dateA - dateB;
});


const years = [];

sortedPosts.forEach(post => {
  const date = new Date(post.frontmatter.date);
  const year = date.getFullYear();
  const monthNumber = date.getMonth();
  const monthName = date.toLocaleString('default', { month: 'long' });

  if (!grouped[year]) {
    years.push(year);
    grouped[year] = {};
  }
  if (!grouped[year][monthNumber]) {
    grouped[year][monthNumber] = {
      monthName: monthName,
      posts: []
    };
  }
  grouped[year][monthNumber].posts.push(post);
});

</script>

