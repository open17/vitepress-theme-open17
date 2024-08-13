# 评论配置 <Badge type="warning" text="beta" />


## 说明

目前评论功能基于[giscus](https://giscus.app/)

你可以在giscus中查询更多的配置信息

## 全局评论配置

将use设置为true后会对于每个docs类型的页面都加载评论

其他配置信息与giscus一致

```js
themeConfig: {
    comment: {
      use: true,
      repo: "",
      repo_id: "",
      category: "Announcements",
      category_id: "", 
      mapping: "pathname", 
      strict: "0", 
      reactions_enabled: "1",
      emit_metadata: "0", 
      input_position: "top",
      lang:"en"
    },
}
```

## 单页面评论设置

我们可以在单页面单独选择是否需要开启评论,优先级大于全局配置

```markdown
---
comment: true/false
---
```