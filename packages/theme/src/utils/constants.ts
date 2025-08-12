export const DEFAULT_PAGE_SIZE = 5;
export const DEFAULT_PAGE_GROUP_SIZE = 5;
export const MAX_DISPLAYED_TAGS = 20;

export const LOCALIZED_STRINGS = {
  'zh-CN': {
    prev: '上一页',
    next: '下一页',
    all: '全部',
    posts: '文章',
    tags: '标签',
    category: '分类',
    switchToNormalPage: '切换到普通页面',
    switchToPostPage: '切换到文章页面',
  },
  'en': {
    prev: 'Prev',
    next: 'Next',
    all: 'All',
    posts: 'POSTS',
    tags: 'TAGS',
    category: 'Category',
    switchToNormalPage: 'Switch to Normal Page',
    switchToPostPage: 'Switch to Post Page',
  }
} as const;

export type SupportedLanguage = keyof typeof LOCALIZED_STRINGS;

export function getLocalizedString(key: keyof typeof LOCALIZED_STRINGS['en'], lang?: string): string {
  const language = (lang as SupportedLanguage) || 'en';
  return LOCALIZED_STRINGS[language]?.[key] || LOCALIZED_STRINGS.en[key];
}