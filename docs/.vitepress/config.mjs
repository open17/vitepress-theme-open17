import { defineConfig } from 'vitepress'


// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Vitepress Open17",
  description: "A VitePress Site",
  markdown: {
    math: true
  },
  themeConfig: {
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
      img:'https://cdn.jsdelivr.net/gh/open17/Pic/img/202403011548000.png',
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
