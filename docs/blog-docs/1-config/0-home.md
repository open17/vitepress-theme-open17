# 首页配置


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
```js
themeConfig:{
    blog:{
      widgets:[
        {
          name:"Custom", // 自定义链接名称
          link:'/blog-docs/',  //可以为空,非空会显示对应的链接
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
