<!-- eslint-disable vue/require-v-for-key -->
<script setup>
import { useData, withBase } from 'vitepress';
import { ref, computed, watch } from 'vue';
import ThemeLayout from './ThemeLayout.vue';
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_GROUP_SIZE, getLocalizedString } from '../utils/constants';
import { useTags } from '../composables/useTags';
import { useCategories } from '../composables/useCategories';

const { theme, lang } = useData();
const blogConfig = theme.value.blog;

const pageSize = computed(() => blogConfig?.pageSize || theme.value.home?.postsPerPage || DEFAULT_PAGE_SIZE);

// 从 URL 初始化页码
const getInitialPage = () => {
  if (typeof window === 'undefined') return 1;
  const p = parseInt(new URLSearchParams(window.location.search).get('page') || '1', 10);
  return Number.isFinite(p) && p > 0 ? p : 1;
};

const currentPage = ref(getInitialPage());
const totalPage = ref(1);

const { filterPostsByActiveTag, activeTag } = useTags();
const { filterPostsByActiveCategory, activeCategory } = useCategories();

// 监听 activeTag / activeCategory 变化，重置分页状态
watch([activeTag, activeCategory], () => {
  toFirstPage();
});

// 将当前页写入 URL（与 tag、category 共存）
const syncPageToUrl = () => {
  if (typeof window === 'undefined') return;
  const url = new URL(window.location.href);
  if (currentPage.value === 1) {
    url.searchParams.delete('page');
  } else {
    url.searchParams.set('page', String(currentPage.value));
  }
  window.history.replaceState(null, '', url.toString());
};

watch(currentPage, () => {
  syncPageToUrl();
});

const getFilteredPosts = () => {
  // 先按分类过滤，再按标签过滤
  const byCategory = filterPostsByActiveCategory(activeCategory.value);
  if (!activeTag.value) return byCategory;
  return byCategory.filter(
    (item) => item.frontmatter.tags && item.frontmatter.tags.includes(activeTag.value)
  );
};

const paginatedPosts = () => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  const postsList = getFilteredPosts();
  totalPage.value = Math.ceil(postsList.length / pageSize.value);
  if (totalPage.value < currentPage.value && totalPage.value > 0) {
    toFirstPage();
  }
  return postsList.slice(start, end);
};

const toFirstPage = () => {
  currentPage.value = 1;
};

// 上一页
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

// 下一页
const nextPage = () => {
  if (currentPage.value < totalPage.value) {
    currentPage.value++;
  }
};

// 计算显示的页码范围（显示当前页前后各2页，共5页）
const pageRange = computed(() => {
  const range = 2; // 当前页前后显示页数
  const start = Math.max(1, currentPage.value - range);
  const end = Math.min(totalPage.value, currentPage.value + range);
  
  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});

const changePage = (page) => {
  currentPage.value = page;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// 输入页码跳转
const gotoPageVal = ref('');
const jumpToPage = () => {
  const n = parseInt(gotoPageVal.value, 10);
  if (!Number.isFinite(n)) return;
  const target = Math.min(Math.max(n, 1), totalPage.value || 1);
  changePage(target);
};

const formatDate = (date) => {
  const language = typeof navigator !== 'undefined' ? navigator.language || navigator.userLanguage : 'en-US';
  return new Date(date).toLocaleDateString(language, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
</script>

<template>
  <ThemeLayout v-slot="{ activeTag, activeCategory }" :showContent="true">
    <!-- 博客文章 -->
    <div class="w-full flex justify-center items-center relative" v-for="post of paginatedPosts()">
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
            <div>{{ formatDate(post.frontmatter.date.substring(0, 10)) }}</div>
          </div>
        </div>
      </a>
    </div>
    <!-- 分页 -->
    <div class="flex justify-center items-center gap-2 border-0 flex-row w-full px-5" v-if="totalPage > 1">
      <!-- 上一页 -->
      <button @click="prevPage()" :disabled="currentPage <= 1"
        class="border-2 px-3 h-8 text-center flex justify-center items-center cursor-pointer bg-[var(--vp-c-blog-bg)] rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed">
        {{ getLocalizedString('prev', lang) }}
      </button>

      <!-- 页码 -->
      <div class="flex justify-center items-center gap-2">
        <!-- 第一页（如果不在范围内） -->
        <template v-if="pageRange[0] > 1">
          <div @click="changePage(1)"
            class="border-2 w-8 h-8 text-center flex justify-center items-center cursor-pointer rounded-md bg-[var(--vp-c-blog-bg)]">
            1
          </div>
          <span v-if="pageRange[0] > 2" class="text-sm">...</span>
        </template>

        <!-- 页码范围 -->
        <div @click="changePage(page)" v-for="page in pageRange" :key="page"
          class="border-2 w-8 h-8 text-center flex justify-center items-center cursor-pointer rounded-md" :class="{
            'bg-[var(--vp-c-brand-1)] text-white border-[var(--vp-c-brand-1)]': page === currentPage,
            'bg-[var(--vp-c-blog-bg)]': page !== currentPage,
          }">
          {{ page }}
        </div>

        <!-- 最后一页（如果不在范围内） -->
        <template v-if="pageRange[pageRange.length - 1] < totalPage">
          <span v-if="pageRange[pageRange.length - 1] < totalPage - 1" class="text-sm">...</span>
          <div @click="changePage(totalPage)"
            class="border-2 w-8 h-8 text-center flex justify-center items-center cursor-pointer rounded-md bg-[var(--vp-c-blog-bg)]">
            {{ totalPage }}
          </div>
        </template>
      </div>

      <!-- 跳转到页 -->
      <div class="flex items-center gap-2 ml-2">
        <input type="number" min="1" :max="totalPage" v-model.trim="gotoPageVal" @keyup.enter="jumpToPage"
          class="w-16 h-8 border-2 rounded-md bg-[var(--vp-c-blog-bg)] px-2 text-sm" :placeholder="`${currentPage}/${totalPage}`" />
        <button @click="jumpToPage"
          class="border-2 px-3 h-8 text-center flex justify-center items-center cursor-pointer bg-[var(--vp-c-blog-bg)] rounded-md text-sm">
          跳转
        </button>
      </div>

      <!-- 下一页 -->
      <button @click="nextPage()" :disabled="currentPage >= totalPage"
        class="border-2 px-3 h-8 text-center flex justify中心 items-center cursor-pointer bg-[var(--vp-c-blog-bg)] rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed">
        {{ getLocalizedString('next', lang) }}
      </button>
    </div>
  </ThemeLayout>
</template>
