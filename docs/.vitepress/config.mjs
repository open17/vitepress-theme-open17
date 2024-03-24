import { defineConfig } from 'vitepress'


// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Vitepress Open17",
  description: "A VitePress Site",
  markdown: {
    math: true
  },
  themeConfig: {
    footer: {
      message: 'Released under the <a href="https://github.com/open17/vitepress-theme-open17/blob/main/LICENSE">Apache 2.0 License</a>.',
      copyright: 'Copyright © 2023-present <a href="https://github.com/Open17">Open17</a>'
    },
    search: {
      provider: 'local'
    },
    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },
    blog:{
      imgDark:'https://cdn.jsdelivr.net/gh/open17/Pic/img/202403011548000.png',
      img:'https://cdn.jsdelivr.net/gh/open17/Pic/img/202403241444361.png',
      title:"Open17's Blog",
      desc:"Hello,world"
    },
    nav: [
      { text: 'Home', link: '/' },
      {text:'tags',link:'/page/tags'},
      {text:'archive',link:' /page/archive'},
      {text:'docs',link:'/page/docs'}
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
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
