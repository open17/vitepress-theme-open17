<script setup>
import { useData } from 'vitepress';
import { computed, watch } from 'vue';
import IconMore from './icon/IconMore.vue';
import UserCard from './UserCard.vue';
import WidgetCard from './WidgetCard.vue';
import { useTags } from '../composables/useTags';
import { getLocalizedString } from '../utils/constants';
import { useCategories } from '../composables/useCategories';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
  showContent: Boolean,
});

const { theme, lang } = useData();

const blogConfig = theme.value.blog;
const direct = blogConfig.direct || 'lft';


const { tagsMap, activeTag, getTagArray, filterPostsByActiveTag } = useTags();
const { categoriesMap, activeCategory, getCategoryArray, filterPostsByActiveCategory, getCategoryFromUrl } = useCategories();

const maxTagsDisplayed = computed(() => theme.value.home?.maxTagsDisplayed);
const allText = computed(() => getLocalizedString('all', lang.value));

watch(
  activeCategory,
  (newCat) => {
    if (!activeTag.value) return; 
    const postsInCategory = filterPostsByActiveCategory(newCat);
    const tagExistsInCategory = postsInCategory.some(
      (p) => p.frontmatter.tags && p.frontmatter.tags.includes(activeTag.value)
    );
    if (!tagExistsInCategory) {
      activeTag.value = ''; 
    }
  },
  { immediate: true }
);


watch(
  activeTag,
  (newTag) => {
    if (!activeCategory.value) return; 
    if (!newTag) return; 
    const postsWithTag = filterPostsByActiveTag(newTag);
    const categoryExistsForTag = postsWithTag.some(
      (p) => getCategoryFromUrl(p.url) === activeCategory.value
    );
    if (!categoryExistsForTag) {
      activeCategory.value = '';
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="w-full flex justify-center">
    <div class="flex w-full max-w-screen-2xl justify-center items-start pt-0 my-0 gap-5 md:px-20 flex-col-reverse"
      :class="{
        'md:flex-row': direct == 'lft',
        'md:flex-row-reverse': direct == 'rgt',
      }">
      <!-- 博客侧边栏 -->
      <div class="flex bg-transparent w-full md:w-1/4 justify-center items-start py-16 flex-col gap-5"
        v-if="!theme.blog.pureMode">
        <!-- 电脑端个人信息 -->
        <UserCard :isMobile="false" />

        <!-- 侧边栏Category -->
        <div
          class="flex w-full md:rounded-xl px-5 py-7 flex-col justify-center gap-5 dark:shadow-none shadow-md border-2 border-[var(--blog-border-c)] bg-[var(--vp-c-blog-bg)] ">
          <div class="text-sm opacity-70">{{ getLocalizedString('category', lang) || 'Category' }}</div>
          <div class="flex justify-start items-center flex-wrap gap-2">
            <div v-for="(cat, i) in getCategoryArray()" :key="cat[0]" class="cursor-pointer relative mt-1"
              @click="activeCategory = cat[0]">
              <div class="text-sm px-2 rounded-sm border" :class="{
                'bg-[var(--blog-tag-bg-2)] text-[var(--blog-tag-text-2)] border-[var(--blog-tag-text-2)]': activeCategory === cat[0],
                'bg-[var(--blog-tag-bg-1)] text-[var(--blog-tag-text-1)] border-[var(--blog-tag-text-1)]': activeCategory !== cat[0]
              }">
                {{ cat[0] == '' ? allText : cat[0] }}
              </div>
            </div>
          </div>
        </div>

        <!-- 侧边栏Tag -->
        <div
          class="flex w-full md:rounded-xl px-5 py-7 flex-col justify-center gap-5 dark:shadow-none shadow-md border-2 border-[var(--blog-border-c)] bg-[var(--vp-c-blog-bg)] ">
          <!-- Tags -->
          <div class="flex justify-start items-center flex-wrap gap-2">
            <div v-for="(tag, i) in getTagArray()" class="cursor-pointer relative mt-1" @click="activeTag = tag[0]"
              v-show="!maxTagsDisplayed || i <= maxTagsDisplayed">
              <div class="text-sm px-2 rounded-sm border" :class="{
                'bg-[var(--blog-tag-bg-2)] text-[var(--blog-tag-text-2)] border-[var(--blog-tag-text-2)]': activeTag === tag[0],
                'bg-[var(--blog-tag-bg-1)] text-[var(--blog-tag-text-1)] border-[var(--blog-tag-text-1)]': activeTag !== tag[0]
              }">
                {{ tag[0] == '' ? allText : tag[0] }}
              </div>
            </div>
            <a v-if="blogConfig.tagPageLink" :href="blogConfig.tagPageLink">
              <IconMore />
            </a>
          </div>
        </div>
        <!-- 用户自定义组件 -->
        <WidgetCard />
      </div>
      <!-- 博客文章 -->
      <div class="flex md:w-3/4 py-20 justify-center items-center gap-5 flex-col w-full px-3">
        <slot :activeTag="activeTag" :activeCategory="activeCategory" />
      </div>
      <!-- 移动端个人信息显示 -->
      <UserCard :isMobile="true" />
    </div>
    <Content v-if="showContent" />
  </div>
</template>

<style>
.blog-home .VPContent {
  padding-top: 0 !important;
}

.shadow-0 {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
