<template>
  <!-- loading -->
  <Transition>
    <div id="Loading" v-if="isLoading"></div>
  </Transition>

  <!-- 切换按钮 -->
  <div class="fixed top-20 right-5 z-50" v-if="isPostPage">

    <button 
      @click="togglePostPage" 
      class="layout-toggle-btn"
      :title="switchPageStyle ? getLocalizedString('switchToNormalPage', lang) : getLocalizedString('switchToPostPage', lang)"
    >
      <svg v-if="switchPageStyle" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
      <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
      </svg>
    </button>
  </div>

  <!-- 文章详情页使用带侧边栏布局 -->
  <div v-if="isPostPage && switchPageStyle" class="post-page bg-no-repeat bg-center bg-fixed bg-cover" :class="{ loadingStyle: isLoading }"
       :style="bgImg ? { 'background-image': `url(${bgImg})` } : {}">
    <div class="w-full flex justify-center">
      <div class="flex w-full max-w-screen-2xl justify-center items-start pt-0 my-0 gap-5 md:px-20 flex-col-reverse md:flex-row">
        <!-- 文章详情页侧边栏 -->
        <div class=" sticky top-5 hidden h-screen md:flex bg-transparent w-full md:w-1/4 justify-start items-start py-16 mt-5 md:mt-5 flex-col gap-5">
          <div class=" flex flex-col gap-5 w-full">
            <!-- 电脑端个人信息 -->
            <UserCard :isMobile="false" />
            <div class=" h-48 overflow-auto opacity-85 backdrop-blur-md flex w-full md:rounded-xl px-5 py-5 flex-col justify-start dark:shadow-none shadow-md border-2 border-[var(--blog-border-c)] bg-[var(--vp-c-blog-bg)]">
              <VPDocAsideOutline />
            </div>
            <!-- 分类 -->
            <!-- <div class="flex w-full md:rounded-xl px-5 py-7 flex-col justify-center gap-5 dark:shadow-none shadow-md border-2 border-[var(--blog-border-c)] bg-[var(--vp-c-blog-bg)]">
              <div class="text-base font-bold">{{ getLocalizedString('category', lang) }}</div>
              <div class="flex justify-start items-center flex-wrap gap-2">
                <div v-for="(category, i) in getCategoryArray()" class="cursor-pointer relative mt-1" @click="activeCategory = category[0]">
                  <div class="text-sm px-2 rounded-sm border" :class="{
                    'bg-[var(--blog-tag-bg-2)] text-[var(--blog-tag-text-2)] border-[var(--blog-tag-text-2)]': activeCategory === category[0],
                    'bg-[var(--blog-tag-bg-1)] text-[var(--blog-tag-text-1)] border-[var(--blog-tag-text-1)]': activeCategory !== category[0]
                  }">
                    {{ category[0] == '' ? getLocalizedString('all', lang) : category[0] }}
                  </div>
                </div>
              </div>
            </div> -->
            <!-- 侧边栏Tag -->
            <!-- <div class="flex w-full md:rounded-xl px-5 py-7 flex-col justify-center gap-5 dark:shadow-none shadow-md border-2 border-[var(--blog-border-c)] bg-[var(--vp-c-blog-bg)]">
              <div class="text-base font-bold">Tags</div>
              <div class="flex justify-start items-center flex-wrap gap-2">
                <div v-for="(tag, i) in getTagArray()" class="cursor-pointer relative mt-1" @click="activeTag = tag[0]">
                  <div class="text-sm px-2 rounded-sm border" :class="{
                    'bg-[var(--blog-tag-bg-2)] text-[var(--blog-tag-text-2)] border-[var(--blog-tag-text-2)]': activeTag === tag[0],
                    'bg-[var(--blog-tag-bg-1)] text-[var(--blog-tag-text-1)] border-[var(--blog-tag-text-1)]': activeTag !== tag[0]
                  }">
                    {{ tag[0] == '' ? getLocalizedString('all', lang) : tag[0] }}
                  </div>
                </div>
              </div>
            </div> -->
            <!-- 用户自定义组件 -->
            <!-- <WidgetCard /> -->
          </div>
        </div>
        <!-- 文章内容区域 -->
        <div class="flex md:w-3/4 md:py-20 py-0 justify-center items-center gap-5 flex-col w-full md:px-3 px-0">
          <Layout class="w-full">
            <template #doc-before>
              <div class="text-3xl font-bold">{{ title }}</div>
            </template>
            <template #doc-after>
              <!-- 评论 -->
              <Comment />
            </template>
          </Layout>
        </div>
      </div>
    </div>
  </div>

  <!-- 其他页面使用默认主题布局 -->
  <Layout v-else class="bg-no-repeat bg-center bg-fixed bg-cover" :style="bgImg ? { 'background-image': `url(${bgImg})` } : {}"
    :class="{ loadingStyle: isLoading }">
    <template #doc-before>
      <div class="text-3xl font-bold">{{ title }}</div>
    </template>
    <template #doc-after>
      <!-- 评论 -->
      <Comment />
    </template>
  </Layout>
</template>

<script lang="ts" setup>
import DefaultTheme from 'vitepress/theme';
import { useData, useRoute } from 'vitepress';
import { onMounted, ref, watch, computed } from 'vue';
import { useLoading } from '../composables/useLoading';
import { useTags } from '../composables/useTags';
import { useCategories } from '../composables/useCategories';
import { getLocalizedString } from '../utils/constants';
import Comment from '../components/Comment.vue';
import UserCard from '../components/UserCard.vue';
import WidgetCard from '../components/WidgetCard.vue';
import VPDocAsideOutline from 'vitepress/dist/client/theme-default/components/VPDocAsideOutline.vue';

const { Layout } = DefaultTheme;

// TODO 待优化
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const { isLoading } = useLoading(() => import('../../tailwind'));

const { frontmatter, isDark, theme, lang } = useData<Open17Config>();
const blogConfig = theme.value.blog;
const title = computed(() => frontmatter.value?.title ?? null);
const isBlogTop = ref<boolean>(frontmatter.value.layout === 'blog');
const bgImg = ref<string | null>(null);
const route = useRoute();


const isPostPage = computed(() => route.path.startsWith('/posts/'));
const switchPageStyle = ref<boolean>(true);

const togglePostPage = () => {
  switchPageStyle.value = !switchPageStyle.value;
};

// 导入分类和标签功能
// const { tagsMap, activeTag, getTagArray } = useTags();
// const { categoriesMap, activeCategory, getCategoryArray } = useCategories();

onMounted(() => {
  window.addEventListener('scroll', () => {
    isBlogTop.value = window.scrollY <= 50;
  });
  updateBgImg();
});

const trigger = computed(() => ({
  isDark: isDark.value,
  route: route.path,
}));

watch(trigger, () => {
  updateBgImg();
});

const updateBgImg = () => {
  bgImg.value = getBgImg();
};

const getBgImg = (): string | null => {
  const getBgImageByType = (imageType: 'dark' | 'light'): string | null => {
    const globalImage = typeof blogConfig?.bgImage === 'object'
      ? blogConfig?.bgImage[imageType]
      : blogConfig?.bgImage;
    const localImage = typeof frontmatter.value.bgImage === 'object'
      ? frontmatter.value.bgImage[imageType]
      : frontmatter.value.bgImage;
    return localImage || globalImage || null;
  };
  return isDark.value ? getBgImageByType('dark') : getBgImageByType('light');
};
</script>

<style>
#VPContent {
  background: #ffffff74;
}

.dark #VPContent {
  background: #1b1b1fc3;
}

#VPContent .aside-curtain {
  display: none;
}

.MathJax {
  overflow-y: hidden;
  overflow-x: auto;
}

/* 修复默认样式问题 */
@media (min-width: 960px) {
  .VPNavBar[data-v-cf6e7c5e]:not(.home) {
    background-color: var(--vp-nav-bg-color) !important;
  }
}
</style>

<style scoped>
#Loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000000;
  margin: 0;
  padding: 0%;
  z-index: 10000;
}

.loadingStyle {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>

<style>
 /* 仅在文章详情页为正文容器增加边框与圆角（桌面端显示，移动端不显示） */
 @media (min-width: 768px) {
   .post-page #VPContent {
     border: 2px solid var(--blog-border-c);
     border-radius: 0.75rem; /* rounded-xl */
     box-shadow: 0 8px 24px rgba(0,0,0,0.08);
   }
   /* 非移动端博客详情页隐藏 VPLocalNav */
   .post-page .VPLocalNav {
     display: none !important;
   }
   /* 非移动端博客详情页隐藏默认主题右侧 aside */
   .post-page .VPDoc .aside {
     display: none !important;
   }
  }
  .post-page .VPFooter {
     display: none !important;
   }
 
 /* 移动端：移除博客详情页顶部与左右间距 */
 @media (max-width: 767px) {
   .post-page #VPContent,
   .post-page #VPContent .VPDoc,
   .post-page #VPContent .container {
     margin: 0 !important;
   }
 }
 </style>

<style scoped>
.layout-toggle-btn {
  width: 2.5rem;
  height: 2.5rem;
  background-color: var(--vp-c-brand-1);
  color: var(--vp-c-white);
  border-radius: 50%;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
}

.layout-toggle-btn:hover {
  background-color: var(--vp-c-brand-2);
  transform: scale(1.05);
}

.layout-toggle-btn:active {
  transform: scale(0.95);
}
</style>
