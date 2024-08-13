// posts.data.js
import { createContentLoader } from 'vitepress'

export default createContentLoader('posts/**/*.md', {
  includeSrc: false, // 包含原始 markdown 源?
  render: false,     // 包含渲染的整页 HTML?
  excerpt: true,    // 包含摘录?
  transform(rawData) {
    return rawData.map((page) => {
      const mergedFrontmatter = Object.assign({ title:'Default Title',date: '1900-01-01' }, page.frontmatter);
      return {
        frontmatter: mergedFrontmatter,
        excerpt: page.excerpt,
        url: page.url,
      };
    }).sort((a, b) => {
      // 在排序时，如果日期为默认日期，则将其放在最前面
      if (a.frontmatter.pin && !b.frontmatter.pin) {
        return -1;
      }
      if (!a.frontmatter.pin && b.frontmatter.pin) {
        return 1;
      }
      // 否则按日期排序
      return +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date)
    });
  }
}
)
