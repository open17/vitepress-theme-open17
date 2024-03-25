import { defineConfig } from 'vitepress'
import baseConfig from './theme/config.mjs'

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
      { text: 'Home', link: '/' },
      { text: 'tags', link: '/page/tags' },
      { text: 'archive', link: ' /page/archive' },
      { text: 'docs', link: '/page/docs' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/open17/vitepress-theme-open17/' }
    ],
    sidebar: {
      '/example/': [
        {
          text: 'Examples',
          items: [
            { text: 'Markdown Examples', link: '/example/markdown-examples' },
            { text: 'Runtime API Examples', link: '/example/api-examples' }
          ]
        }
      ],
    },
  }
})
