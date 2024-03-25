// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import MyLayout from './components/MyLayout.vue'
import './style.css'

import Blog from './components/Blog.vue';
import Archive from './components/Archive.vue';
import Tags from './components/Tags.vue';

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout: MyLayout,
  enhanceApp({ app, router, siteData }) {
    app.component('blog', Blog);
    app.component('archive', Archive);
    app.component('tags', Tags);
  }
}
