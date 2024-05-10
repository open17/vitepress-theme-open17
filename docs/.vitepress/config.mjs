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
  rootGroupCollapsed:true,
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
  head: [['link', { rel: 'icon', href: '/logo.png' }]],
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
      maxTags:5,
      pageSize:4,
      tagPageLink:'/page/tags',
    },
    logo: {
      dark:'/logo.png',
      light:'/logo_light.png'
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
          { text: 'Home', link: '/page/demo' },
          { text: 'Tags', link: '/page/tags' },
          { text: 'Archive', link: ' /page/archive' },
        ],
      },
      { text: 'Example', link: '/posts/example' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/open17/vitepress-theme-open17/' }
    ],
  },
  buildEnd: genFeed
})
