<template>
    <template v-if="frontmatter.blog">
        <h1>All Blog Posts</h1>
        <ul>
            <li v-for="post of posts">
                <a :href="post.url">{{ post.frontmatter }}</a>
                <span>by {{ post.title }}</span>
            </li>
        </ul>
    </template>
    <Layout>
        <template #doc-before>
        </template>
    </Layout>
</template>
<script setup>
import DefaultTheme from 'vitepress/theme'
import { withBase,useData } from "vitepress";

import { data as posts } from '../posts.data.js'
const { frontmatter } = useData()
const { Layout } = DefaultTheme
</script>
