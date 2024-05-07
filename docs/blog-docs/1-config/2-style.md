# 主题色配置

你可以通过引入`css`文件来配置默认样式变量值:

```js
// .vitepress/theme/index.js
import Theme from 'vitepress-theme-open17'
import './style.css'
export default Theme
```

全部变量值可参考[这里](https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/styles/vars.css)

目前本主题颜色变量依赖于`--vp-c-bg`,`--vp-c-text`,`--vp-c-indigo`等

未来可能会进一步分离,降低耦合度

