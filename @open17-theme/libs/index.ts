import DefaultTheme from 'vitepress/theme'
import { type EnhanceAppContext } from 'vitepress'
import MyLayout from './components/MyLayout.vue'

import Blog from './components/Blog.vue';
import Archive from './components/Archive.vue';
import Tags from './components/Tags.vue';

import './style.css'

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout: MyLayout,
  enhanceApp({ app, router, siteData }:EnhanceAppContext) {
    app.component('blog', Blog);
    app.component('archive', Archive);
    app.component('tags', Tags);
  }
}
