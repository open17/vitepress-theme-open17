<template>
  <!-- loading -->
  <Transition>
    <div id="Loading" v-if="isLoading"></div>
  </Transition>

  <Layout class="bg-no-repeat bg-center bg-fixed bg-cover" :style="bgImg ? { 'background-image': `url(${bgImg})` } : {}"
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
import Comment from '../components/Comment.vue';

const { Layout } = DefaultTheme;


// TODO 待优化
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const { isLoading } = useLoading(() => import('../../tailwind'));

const { frontmatter, isDark, theme } = useData<Open17Config>();
const blogConfig = theme.value.blog;
const title = computed(() => frontmatter.value?.title ?? null);
const isBlogTop = ref<boolean>(frontmatter.value.layout === 'blog');
const bgImg = ref<string | null>(null);
const route = useRoute();

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
