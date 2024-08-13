import { defineConfig } from 'vitepress'
import baseConfig from 'vitepress-theme-open17/config'
import { genFeed } from 'vitepress-theme-open17/genFeed'

import { generateSidebar } from 'vitepress-sidebar';

const vitepressSidebarOptions = [{
  documentRootPath: 'docs',
  scanStartPath: 'blog-docs',
  resolvePath: '/blog-docs/',
  collapsed: true,
  useTitleFromFileHeading: true,
  useFolderTitleFromIndexFile: true,
  useFolderLinkFromIndexFile: true,
  rootGroupCollapsed: true,
}];

export default defineConfig({
  extends: baseConfig,
  title: 'VitePress Open17',
  lang: 'zh-CN',
  description: 'A beautiful & simple blog theme of vitepress',
  markdown: {
    math: true
  },
  sitemap: {
    hostname: 'https://vitepress.open17.vip'
  },
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
    ['script', {}, `
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?0a05ed98f94a5486639ae0f97c7b6fff";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();
    `],
    ['meta', { name: 'keywords', content: 'vitepress, theme, blog, open17' }],],
  themeConfig: {
    sidebar: generateSidebar(vitepressSidebarOptions),
    editLink: {
      pattern: 'https://github.com/open17/vitepress-theme-open17/edit/template/docs/:path'
    },
    feed: {
      baseUrl: "https://vitepress.open17.vip",
      copyright: "Copyright © 2023-present open17",
      image: "https://cdn.jsdelivr.net/gh/open17/Pic/img/202405071726176.png",
    },
    blog: {
      avatar: "https://avatars.githubusercontent.com/u/125687556?v=4",
      ornateStyle: true,
      maxTags: 5,
      pageSize: 4,
      tagPageLink: '/page/tags',
    },
    comment: {
      use: true,
      repo: "open17/vitepress-theme-open17",
      repo_id: "R_kgDOLkFVUg",
      category: "Announcements",
      category_id: "DIC_kwDOLkFVUs4ChFZx", 
      mapping: "pathname", 
      strict: "0", 
      reactions_enabled: "1",
      emit_metadata: "0", 
      input_position: "top",
      lang:"en"
    },
    logo: {
      dark: '/logo.png',
      light: '/logo_light.png'
    },
    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Demo', items: [
          { text: 'Blogs', link: '/page/demo' },
          { text: 'Tags', link: '/page/tags' },
          { text: 'Archive', link: ' /page/archive' },
        ],
      },
      // { text: 'Example', link: '/posts/example' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/open17/vitepress-theme-open17/' }
    ],
  },
  buildEnd: genFeed
})
