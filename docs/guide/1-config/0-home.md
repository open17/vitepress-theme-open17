# 首页配置

## 侧边栏布局方向

```js
themeConfig:{
  blog:{
    direct: 'lft' // 或者 'rgt' 侧边栏在左边或右边
  }
}
```

## 用户信息栏

```js
themeConfig:{
  blog:{
    user: {
      name: 'My Awesome Blog',       // 昵称
      describe: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', // 签名
      avatar: '/path/to/avatar.jpg'  // 头像
    }
  },
}
```

## 隐藏侧边栏（纯模式）

如果你希望隐藏左侧边栏，专注于文章内容，可以启用纯模式：

```js
themeConfig:{
  blog:{
    pureMode: true // 隐藏左边栏，默认为 false
  }
}
```

## 文章分页

优先读取 blog.pageSize，未设置时回退到 home.postsPerPage。

```ts
import { defineConfigWithTheme } from 'vitepress'
export default defineConfigWithTheme({
  themeConfig:{
    blog:{
      pageSize: 5, // 每页显示文章数量
    },
    home: {
      postsPerPage: 5 // 备用：当 blog.pageSize 未设置时生效
    }
  }
})
```

## 标签组件栏

- 首页标签栏显示数量由 home.maxTagsDisplayed 控制。
- 在侧边栏显示“更多”图标时，需设置 blog.tagPageLink。

```js
themeConfig:{
  home:{
    maxTagsDisplayed: 5,               // 首页标签栏显示的最大标签数量
  },
  blog: {
    tagPageLink: '/page/tags'          // “更多标签”跳转链接（可选）
  }
}
```

## 分类栏

- 分类自动从 posts 目录结构中提取：/posts/<目录名>/xxx.md 会归属到对应目录名；直接位于 /posts 根目录的文章归类为“其他”。
- 当前选中的分类会与 URL 同步（?category=xxx），与标签和分页兼容。
- 切换标签或分类时会自动回到第 1 页。

## 自定义组件栏

支持全局 widgets 与单页面 widgets 叠加渲染（单页在 frontmatter 中配置）。

- 全局配置：

```ts
// .vitepress/config.ts
import { defineConfigWithTheme } from 'vitepress'
export default defineConfigWithTheme({
  themeConfig: {
    blog: {
      widgets: [
        { name: '广告位', link: 'https://example.com', html: '<div>AD</div>' },
      ]
    }
  }
})
```

- 单页面配置：

```md
---
widgets:
  - name: "🍰示例"
    link: "/guide/1-config/0-home.html#自定义组件栏"
    html: "<div id='custom1'></div>"
---
```

在页面脚本中，你可以渲染 Vue 组件到自定义容器中，详见本仓库的示例。