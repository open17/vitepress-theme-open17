# 装饰模式配置

启用该模式允许为本主题自定义背景

当前该模式仍处于测试阶段,可能存在部分显示bug


## 基本配置
```js
themeConfig:{
    blog:{
      ornateStyle:true,             //是否开启博客装饰样式,默认为false,
    },
}
```

## docs布局背景图片

对于docs布局,我们可以一键替换默认背景图片

```js
themeConfig:{
    blog:{
      bgImg:"xxxx",                  //仅可用于doc文章(包括博客文章)的默认背景图片,可选,当博客装饰样式开启才生效
      bgImgDark:"xxxx",            //仅可用于doc文章(包括博客文章)的默认背景图片(暗黑模式),可选,当博客装饰样式开启才生效
    },
}
```

## 其他布局背景

对于其他布局,我们也可以通过配置对应的markdown文件来指定背景图片

```md
---
bgImg:"xxxx" 
bgImgDark:"xxxx"
---
```


