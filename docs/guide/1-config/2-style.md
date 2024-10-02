# 主题色配置

你可以通过引入`css`文件来配置默认样式变量值:

```js
// .vitepress/theme/index.js
import Theme from 'vitepress-theme-open17'
import './style.css'
export default Theme
```

全部变量值可参考[这里](https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/styles/vars.css)

目前本主题颜色变量依赖于`--vp-c-bg`,`--vp-c-text`等

未来可能会进一步分离,降低耦合度

## 配置主题色示例

下面是本主题默认的主题色:

```css
/* .vitepress/theme/style.css */
:root{
  --vp-c-brand-1: #2276ca;
  --vp-c-brand-2: #3c83ba;
  --vp-c-brand-3: #198ed2;
}

.dark:root{
  --vp-c-brand-1: #4b95df;
  --vp-c-brand-3: #198ed2;
  --vp-c-brand-2: #3c83ba;  
}
```
