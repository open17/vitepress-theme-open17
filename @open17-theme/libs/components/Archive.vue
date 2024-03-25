<template>
  <div class="flex w-full flex-col justify-center items-center">
    <div class="text-5xl mt-32 font-bold">Archive</div>
    <!-- 博客文章 -->
    <div class="flex mt-10 justify-center items-center">
      <ul>
        <li v-for="(yearPosts, year) of groupedPosts" :key="year">
          <h2 class="text-3xl my-10 font-bold">{{ year }}</h2>
          <ul>
            <li v-for="(monthPosts,month) in yearPosts" :key="month">
              <h3 class="text-xl my-5 font-bold">{{ month }}</h3>
              <ul>
                <li v-for="post in monthPosts" :key="post.id">
                  <div class="flex items-center gap-10 justify-between mb-3">
                    <a :href="withBase(post.url)" class="mr-2 hover:underline">{{ post.frontmatter.title }}</a>
                    <span class="text-gray-400">{{ post.frontmatter.date.substring(0, 10)}}</span>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { data as posts } from '../posts.data.js';
import { useData, withBase } from 'vitepress';

const { frontmatter, theme } = useData();

const groupedPosts = computed(() => {
  const grouped = {};
  posts.forEach(post => {
    const date = new Date(post.frontmatter.date);
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' });
    if (!grouped[year]) {
      grouped[year] = {};
    }
    if (!grouped[year][month]) {
      grouped[year][month] = [];
    }
    grouped[year][month].push(post);
  });
  return grouped;
});
</script>
