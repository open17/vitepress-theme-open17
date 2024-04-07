import { defineConfig } from 'vitepress'
import baseConfig from 'vitepress-theme-open17/config'
import { genFeed } from 'vitepress-theme-open17/genFeed'

export default defineConfig({
  extends: baseConfig,
  markdown: {
    math: true
  },
  sitemap: {
    hostname: 'https://www.open17.vip'
  },
  head: [['link', { rel: 'icon', href: '/logo.png' }]],
  themeConfig: {
    editLink: {
      pattern: 'https://github.com/open17/vitepress-theme-open17/edit/template/docs/:path'
    },
    feed: {
      baseUrl: "https://www.open17.vip",
      copyright: "Copyright © 2023-present open17",
      image: "https://www.open17.vip/logo.png",
    },
    blog: {
      avatar: "https://cdn.jsdelivr.net/gh/open17/Pic/img/202404061142156.webp",
      ornateStyle: true,
      bgImg: "https://cdn.jsdelivr.net/gh/open17/Pic/img/202404020226261.png",
      bgImgDark: "https://cdn.jsdelivr.net/gh/open17/Pic/img/202404061333172.jpeg"
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
      { text: 'Docs', link: '/' },
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
    sidebar: {
      '/blog-docs/': [
        {
          text: '博客文档',
          items: [
            { text: '博客配置与使用', link: '/blog-docs/' }
          ]
        },
        {
          text: '默认示例',
          items: [
            { text: 'Markdown Examples', link: '/blog-docs/example/markdown-examples' },
            { text: 'Runtime API Examples', link: '/blog-docs/example/api-examples' }
          ]
        }
      ],
    },
  },
  buildEnd: genFeed
})
