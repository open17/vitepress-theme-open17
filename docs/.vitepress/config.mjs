import { defineConfig } from 'vitepress'
import baseConfig from 'vitepress-theme-open17/config'

export default defineConfig({
  extends: baseConfig,
  markdown: {
    math: true
  },
  head: [['link', { rel: 'icon', href: '/logo.png' }]],
  themeConfig: {
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
      { text: 'Demo', link: '/page/demo' },
      { text: 'Tags', link: '/page/tags' },
      { text: 'Archive', link: ' /page/archive' },
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
  }
})
