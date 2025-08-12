<template>
    <!-- giscus评论 -->
    <div class="comment mt-5 opacity-80" v-if="useComment && refreshFlag">
        <Giscus v-if="CommentConfig" :repo="CommentConfig.repo" :repo-id="CommentConfig.repoId"
            :category="CommentConfig.category" :category-id="CommentConfig.categoryId" :mapping="CommentConfig.mapping"
            :strict="CommentConfig.strict" :reactions-enabled="CommentConfig.reactionsEnabled"
            :emit-metadata="CommentConfig.emitMetadata" :input-position="CommentConfig.inputPosition"
            :lang="CommentConfig.lang" :theme="commentTheme" />
    </div>
</template>

<script lang="ts" setup>
import Giscus from '@giscus/vue';
import { useData } from 'vitepress';
import { useRefreshOnRouteChange } from '../composables/useRefreshOnRouteChange';
import { computed } from 'vue';
const { frontmatter, isDark, theme } = useData<Open17Config>();
const CommentConfig = theme.value.comment;
const { refreshFlag } = useRefreshOnRouteChange();
const useComment = computed(() => {
    if (frontmatter.value.comment === false) return false;
    return theme.value.comment?.use || frontmatter.value.comment !== undefined;
});
const commentTheme = computed(() => (isDark.value ? 'dark_tritanopia' : 'light_tritanopia'));
</script>