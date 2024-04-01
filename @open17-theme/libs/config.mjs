import { defineConfig } from 'vitepress'


export default defineConfig({
    title: "Vitepress Open17",
    description: "A VitePress Site",
    themeConfig: {
        footer: {
            message: 'Released under the <a href="https://github.com/open17/vitepress-theme-open17/blob/template/LICENSE">Apache 2.0 License</a>.',
            copyright: 'Copyright © 2023-present <a href="https://github.com/open17">open17</a>'
        },
        search: {
            provider: 'local'
        },
        blog: {
            homeImg:"https://cdn.jsdelivr.net/gh/open17/Pic/img/202403031455554.png",
            homeImgDark: "https://cdn.jsdelivr.net/gh/open17/Pic/img/202403302344601.png",
            title: "Open17's Blog",
            desc: "Hello,world"
        },
    }
})
