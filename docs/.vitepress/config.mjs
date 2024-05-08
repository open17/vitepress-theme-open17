import { defineConfig } from 'vitepress'
import baseConfig from 'vitepress-theme-open17/config'
import { genFeed } from 'vitepress-theme-open17/genFeed'
import AutoSidebar from 'vite-plugin-vitepress-auto-sidebar';


export default defineConfig({
  vite: {
    plugins: [
      AutoSidebar({
        ignoreList: ['page', 'posts', 'public'],
        titleFromFile: true,
        beforeCreateSideBarItems: (data) => {
          const indexIndex = data.indexOf("index.md");
          if (indexIndex !== -1) {
            const indexValue = data[indexIndex];
            data.splice(indexIndex, 1);
            data.unshift(indexValue);
          }
          return data;
        }
      })
    ]
  },
  extends: baseConfig,
  title: 'VitePress Open17',
  description: 'A beautiful & simple blog theme of vitepress',
  markdown: {
    math: true
  },
  sitemap: {
    hostname: 'https://vitepress.open17.vip'
  },
  head: [['link', { rel: 'icon', href: '/logo.png' }]],
  themeConfig: {
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
      pageSize:3,
      tagPageLink:'/page/tags',
      widgets:[
        {
          name:"🍰示例",
          link:'/blog-docs/1-config/0-home.html#自定义组件栏',
          html:`<div id="custom1"></div>`,
        },
      ]
    },
    logo: '/logo.png',
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
