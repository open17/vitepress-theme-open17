# 首页配置

## 侧边栏布局方向

```js
themeConfig:{
    blog:{
      direct: "lft" // 或者"rgt" 侧边栏在左边or在右边
    }
}
```

## 昵称头像签名栏
```js
themeConfig:{
    blog:{
      title: "My Awesome Blog",     //昵称
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",  //签名
      avatar:"xxxx"               //你的头像(图片url)
    },
}
```

## 文章分页
```js
themeConfig:{
    blog:{
      pageSize:5,                  //每页显示文章数量,默认为5
    },
}
```

## 标签组件栏
```js
themeConfig:{
    blog:{
      maxTags:5,                  //博客首页的标签栏显示的最大标签数量,默认为5
      tagPageLink:'/page/tags'    // 如果不为空,则在博客首页的标签栏会显示更多标签的链接,点击后会跳转到该链接(请填写标签页的链接)
    },
}
```

## 自定义组件栏<Badge type="tip" text="NEW" />

在这里我们可以自定义各种组件放置于首页,比如精选文章,比如广告,比如微信群二维码等....

widgets分为两种,`全局配置`与`单页面配置`

:::code-group
```js [全局配置]
themeConfig:{
    blog:{
      widgets:[
        {
          name:"Custom", // 自定义链接名称
          link:'/guide/',  //可以为空,非空会显示对应的链接
          html:`主题自定义组件,支持html渲染`, //内容html,支持tailwindcss
        },
        {
          name:"Custom2", // 自定义链接名称
          html:`主题自定义组件,支持html渲染`, //内容html,支持tailwindcss
        },
      ]
    },
}
```
```md [单页面配置]
---
widgets:
  - name:"Custom"
    link:'/guide/'
    html:`主题自定义组件,支持html渲染`
  - name:"Custom2"
    html:`主题自定义组件,支持html渲染`
---
```
:::
当然,尽管支持tailwindcss,直接书写html字符串依然较为繁琐且不易维护,且无法动态渲染内容

自`1.1.1`起,支持在博客首页等布局也渲染markdown内容,因此我们可以做出如下改变:

在widgets中只留下对应的id,例如
```js
widgets:[
  {
    name:"Custom",
    link:'/guide/1-config/0-home.html#自定义组件栏',
    html:`<div id="custom1"></div>`,
  },
]
```

在博客首页对应的markdown中利用script动态改变id的内容:
```md
---
layout: blog
---

<script setup>
import { onMounted, createApp,h } from 'vue';
onMounted(() => {
    const el = document.getElementById('custom1');
    if (el) {
      el.innerHTML = '这是我动态渲染的内容';
    }
});
</script>
```

因此我们可以有无限的扩展能力,比如引入与渲染vue组件

下面是一个示例:

```md
---
layout: blog
widgets:
  - name: "🍰示例"
    link: "/guide/1-config/0-home.html#自定义组件栏"
    html: "<div id='custom1'></div>"
---

<script setup>
import BlogCard from '../components/BlogCard.vue'
import BlogCardPage from '../components/BlogCardPage.vue'
import { onMounted, createApp,h } from 'vue';
const blog=[
    {
        img:'https://cdn.jsdelivr.net/gh/open17/Pic/img/202405080238501.png',
        desc:'算法练习,笔记与模板',
        url:'https://alg.open17.vip'
    },
];
onMounted(() => {
    const el = document.getElementById('custom1');
    const app = createApp({
      render() {
        return h(BlogCard, {
          blog: blog
        });
      }
    });
    app.mount(el);
});
</script>
```