# 快速开始

推荐使用主题提供的模板,也可以手动开始

## :star: 一键开始 <Badge type="warning" text="推荐" />

利用github template一键开始: [点击这里](https://github.com/open17/vitepress-theme-open17/generate)

## :hammer_and_wrench: 手动开始

在此之前应该先初始化vitepress项目,然后再安装主题,如果你还没有初始化,详见这里[初始化vitepress项目](https://vitepress.dev/zh/guide/getting-started)

在初始化vitepress项目完毕后,进行本主题的安装

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
然后在vitepress配置中引入本主题
```js
//.vitepress/theme/index.js
import Theme from 'vitepress-theme-open17'
export default Theme
```

同时主题也提供了开箱即用的基本配置,你也可以在`config.js`中进行继承
```js
// .vitepress/config.js
import { defineConfig } from 'vitepress'
import baseConfig from 'vitepress-theme-open17/config'

export default defineConfig({
  extends: baseConfig,
})
```

你可以在配置文档中了解更多相关信息


现在主题已经初始化完毕! 🎊
