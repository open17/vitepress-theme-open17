# 快速开始

推荐使用主题提供的模板,也可以手动开始

## :star: 一键开始 <Badge type="warning" text="推荐" />

利用 GitHub Template 一键开始: [点击这里](https://github.com/open17/vitepress-theme-open17/generate)

## :hammer_and_wrench: 手动开始

在此之前应该先初始化 VitePress 项目,然后再安装主题,如果你还没有初始化,详见这里[初始化 VitePress 项目](https://vitepress.dev/zh/guide/getting-started)

在初始化完成后, 安装主题:

:::code-group
```shell [yarn]
yarn add -D vitepress-theme-open17
```
```shell [npm]
npm i vitepress-theme-open17 -D
```
```shell [pnpm]
pnpm add -D vitepress-theme-open17
```
:::

在 VitePress 主题入口中启用主题:
```js
// .vitepress/theme/index.js
import Theme from 'vitepress-theme-open17'
export default Theme
```

使用类型安全的方式编写配置:
```ts
// .vitepress/config.ts
import type { ThemeConfig } from 'vitepress-theme-open17/config'
import { defineConfigWithTheme } from 'vitepress'

export default defineConfigWithTheme<ThemeConfig>({
  themeConfig: {
    // 你的主题配置
  }
})
```

你可以在配置文档中了解更多相关信息

现在主题已经初始化完毕! 🎊
