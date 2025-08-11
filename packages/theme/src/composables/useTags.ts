import { ref, computed, watch } from 'vue';
// typed by src/types/posts-data.d.ts
import { data as posts } from '../posts.data.js';

// 单例状态：确保不同组件间共享 activeTag 与 tagsMap
const tagsMap = ref<Record<string, number>>({ '': posts.length });

// 从 URL 参数初始化 activeTag
const getInitialTag = () => {
  if (typeof window === 'undefined') return '';
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('tag') || '';
};

const activeTag = ref(getInitialTag());

// 监听 activeTag 变化，同步到 URL
watch(activeTag, (newTag) => {
  if (typeof window === 'undefined') return;
  
  const url = new URL(window.location.href);
  if (newTag) {
    url.searchParams.set('tag', newTag);
  } else {
    url.searchParams.delete('tag');
  }
  
  // 使用 replaceState 避免产生新的历史记录
  window.history.replaceState(null, '', url.toString());
});

// 初始化标签计数（只执行一次）
posts.forEach((post) => {
  const tags = post.frontmatter.tags as string[] | undefined;
  if (tags) {
    tags.forEach((tag) => {
      tagsMap.value[tag] = (tagsMap.value[tag] || 0) + 1;
    });
  }
});

export function useTags() {
  const getTagArray = () => {
    const arr = Object.entries(tagsMap.value);
    arr.sort((a, b) => (b[1] as number) - (a[1] as number));
    return arr;
  };

  const uniqueTagCount = computed(() => {
    const set = new Set<string>();
    Object.keys(tagsMap.value).forEach((k) => {
      if (k) set.add(k);
    });
    return set.size;
  });

  const filterPostsByActiveTag = (tag?: string) => {
    const t = tag ?? activeTag.value;
    if (!t) return posts;
    return posts.filter(
      (item) => item.frontmatter.tags && item.frontmatter.tags.includes(t)
    );
  };

  return {
    tagsMap,
    activeTag,
    getTagArray,
    uniqueTagCount,
    filterPostsByActiveTag,
  } as const;
}