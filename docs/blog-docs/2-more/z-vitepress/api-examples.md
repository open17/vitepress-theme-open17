---
outline: deep
---

# 运行时API

This page demonstrates usage of some of the runtime APIs provided by VitePress.

The main `useData()` API can be used to access site, theme, and page data for the current page. It works in both `.md` and `.vue` files:

```md
<script setup>
import { useData } from 'vitepress'

const { theme, page, frontmatter } = useData()
</script>

## Results

### Theme Data
<pre class="overflow-x-auto">{{ theme }}</pre>

### Page Data
<pre class="overflow-x-auto">{{ page }}</pre>

### Page Frontmatter
<pre class="overflow-x-auto">{{ frontmatter }}</pre>
```

<script setup>
import { useData } from 'vitepress'

const { site, theme, page, frontmatter } = useData()
</script>

## Results

### Theme Data
<pre class="overflow-x-auto ">{{ theme }}</pre>

### Page Data
<pre class="overflow-x-auto">{{ page }}</pre>

### Page Frontmatter
<pre class="overflow-x-auto">{{ frontmatter }}</pre>

## More

Check out the documentation for the [full list of runtime APIs](https://vitepress.dev/reference/runtime-api#usedata).
