import { ref, computed, watch } from 'vue';
// typed by src/types/posts-data.d.ts
import { data as posts } from '../posts.data.js';

// 单例状态：确保不同组件间共享 activeCategory 与 categoriesMap
const categoriesMap = ref<Record<string, number>>({ '': posts.length });

// 从 URL 参数初始化 activeCategory
const getInitialCategory = () => {
  if (typeof window === 'undefined') return '';
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('category') || '';
};

const activeCategory = ref(getInitialCategory());

// 从文件路径中提取分类（如 posts/vue/article.md => vue）
const extractCategoryFromUrl = (url: string): string => {
  // url 格式通常是 /posts/category/article.html
  const match = url.match(/^\/posts\/([^\/]+)\//);
  if (match && match[1]) {
    return match[1]; // 返回第一级目录作为分类
  }
  // 如果直接在 posts 根目录，返回 "其他"
  if (url.startsWith('/posts/') && url.match(/^\/posts\/[^\/]+\.html$/)) {
    return '其他';
  }
  return ''; // 非博客文章
};

// 初始化分类映射
const initializeCategoriesMap = () => {
  const map: Record<string, number> = { '': 0 };
  
  posts.forEach((post) => {
    const category = extractCategoryFromUrl(post.url);
    if (category) {
      map[category] = (map[category] || 0) + 1;
      map['']++; // "全部"计数
    }
  });
  
  categoriesMap.value = map;
};

// 初始化分类映射
initializeCategoriesMap();

// activeCategory 变化时同步到 URL
watch(activeCategory, (newCategory) => {
  if (typeof window === 'undefined') return;
  const url = new URL(window.location.href);
  if (!newCategory) {
    url.searchParams.delete('category');
  } else {
    url.searchParams.set('category', newCategory);
  }
  window.history.replaceState(null, '', url.toString());
});

export function useCategories() {
  const getCategoryArray = () => {
    const arr = Object.entries(categoriesMap.value);
    // 按文章数量降序排列，但保持"全部"在最前
    arr.sort((a, b) => {
      if (a[0] === '') return -1;
      if (b[0] === '') return 1;
      return (b[1] as number) - (a[1] as number);
    });
    return arr;
  };

  const uniqueCategoryCount = computed(() => {
    const set = new Set<string>();
    Object.keys(categoriesMap.value).forEach((k) => {
      if (k) set.add(k);
    });
    return set.size;
  });

  const filterPostsByActiveCategory = (category?: string) => {
    const c = category ?? activeCategory.value;
    if (!c) return posts; // "全部"
    
    return posts.filter((item) => {
      const postCategory = extractCategoryFromUrl(item.url);
      return postCategory === c;
    });
  };

  const getCategoryFromUrl = extractCategoryFromUrl;

  return {
    categoriesMap,
    activeCategory,
    getCategoryArray,
    uniqueCategoryCount,
    filterPostsByActiveCategory,
    getCategoryFromUrl,
  } as const;
}