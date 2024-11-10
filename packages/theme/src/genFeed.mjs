import path from 'path';
import { writeFileSync } from 'fs';
import { Feed } from 'feed';
import { createContentLoader } from 'vitepress';

export async function genFeed(config) {
  const feed = new Feed({
    title: `${config.site.title}`,
    description: `${config.site.description}`,
    id: `${config.site.themeConfig.feed.baseUrl}`,
    link: `${config.site.themeConfig.feed.baseUrl}`,
    language: `${config.site.lang}`,
    image: `${config.site.themeConfig.feed.image}`,
    favicon: `${config.site.themeConfig.feed.favicon}`,
    copyright: `${config.site.themeConfig.feed.copyright}`,
  });

  const posts = await createContentLoader('posts/**/*.md', {
    excerpt: true,
    render: true,
  }).load();

  posts.sort(
    (a, b) => +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date)
  );
  for (const { url, excerpt, frontmatter, html } of posts) {
    feed.addItem({
      title: frontmatter.title,
      id: `${config.site.themeConfig.feed.baseUrl}${url}`,
      link: `${config.site.themeConfig.feed.baseUrl}${url}`,
      description: excerpt,
      content: html?.replaceAll('&ZeroWidthSpace;', ''),
      author: [
        {
          name: frontmatter.author,
        },
      ],
      date: frontmatter.date,
    });
  }
  writeFileSync(path.join(config.outDir, 'feed.rss'), feed.rss2(), {
    encoding: 'utf8',
  });
}
