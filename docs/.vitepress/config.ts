import type { ThemeConfig } from "vitepress-theme-open17/config";
import { genFeed } from "vitepress-theme-open17/genFeed";
import { defineConfigWithTheme } from "vitepress";

import { generateSidebar } from "vitepress-sidebar";

const vitepressSidebarOptions = [
  {
    documentRootPath: "docs",
    scanStartPath: "guide",
    resolvePath: "/guide/",
    collapsed: true,
    useTitleFromFileHeading: true,
    useFolderTitleFromIndexFile: true,
    useFolderLinkFromIndexFile: true,
    rootGroupCollapsed: true,
  },
];

export default defineConfigWithTheme<ThemeConfig>({
  title: "VitePress Open17",
  lang: "zh-CN",
  description: "A beautiful & simple blog theme of vitepress",
  markdown: {
    math: true,
  },
  sitemap: {
    hostname: "https://vitepress.open17.vip",
  },
  head: [
    ["link", { rel: "icon", href: "/logo.png" }],
    [
      "script",
      {},
      `
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?0a05ed98f94a5486639ae0f97c7b6fff";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();
    `,
    ],
    ["meta", { name: "keywords", content: "vitepress, theme, blog, open17" }],
  ],
  themeConfig: {
    sidebar: generateSidebar(vitepressSidebarOptions),
    search: {
      provider: "local",
      options: {
        _render(src, env, md) {
          const html = md.render(src, env);
          if (env.frontmatter?.title)
            return md.render(`# ${env.frontmatter.title}`) + html;
          return html;
        },
      },
    },
    editLink: {
      pattern:
        "https://github.com/open17/vitepress-theme-open17/edit/master/docs/:path",
      text: "帮我优化文章~"
    },
    feed: {
      baseUrl: "https://vitepress.open17.vip",
      copyright: "Copyright © 2023-present open17",
      image: "https://cdn.jsdelivr.net/gh/open17/Pic/img/202405071726176.png",
    },
    blog: {
      tagPageLink: "/page/tags",
      bgImage: { dark: "/bg_dark.jpg" },
      direct: "lft",
      user: {
        name: "Open17",
        avatar: "/ava.jpg",
        describe: "A beautiful & simple blog theme of vitepress",
      },
    },
    home: {
      maxTagsDisplayed: 20,
      postsPerPage: 5,
    },
    comment: {
      use: true,
      repo: "open17/vitepress-theme-open17",
      repoId: "R_kgDOLkFVUg",
      category: "Announcements",
      categoryId: "DIC_kwDOLkFVUs4ChFZx",
      mapping: "pathname",
      strict: "0",
      reactionsEnabled: "1",
      emitMetadata: "0",
      inputPosition: "top",
      lang: "en",
    },
    logo: {
      dark: "/logo.png",
      light: "/logo_light.png",
    },
    lastUpdated: {
      text: "Updated at",
      formatOptions: {
        dateStyle: "full",
        timeStyle: "medium",
      },
    },
    nav: [
      { text: "Home", link: "/" },
      { text: "Guide", link: "/guide/0-intro/" },
      {
        text: "Demo",
        items: [
          { text: "Blog", link: "/page/blog" },
          { text: "Tags", link: "/page/tags" },
          { text: "Archive", link: " /page/archive" },
        ],
      },
    ],
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/open17/vitepress-theme-open17/",
      },
    ],
  },
  buildEnd: genFeed,
});
