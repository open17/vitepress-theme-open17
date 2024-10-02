<template>
    <!-- loading -->
    <Transition>
        <div id="Loading" v-if="isLoading"></div>
    </Transition>

    <Layout class=" bg-no-repeat bg-center bg-fixed bg-cover" :style="{ 'background-image': `url(${getImg()})` }"
        :class="{ 'loadingStyle': isLoading }">
        <template #doc-before>
            <div class="text-3xl font-bold">{{ frontmatter.title }}</div>
        </template>
        <template #doc-after>
            <!-- 评论 -->
            <div class="comment mt-5" v-if="useComment && showComment">
                <Giscus :repo="theme.comment.repo" :repo-id="theme.comment.repo_id" :category="theme.comment.category"
                    :category-id="theme.comment.category_id" :mapping="theme.comment.mapping"
                    :strict="theme.comment.strict" :reactions-enabled="theme.comment.reactions_enabled"
                    :emit-metadata="theme.comment.emit_metadata" :input-position="theme.comment.input_position"
                    :lang="theme.comment.lang" :theme="commentTheme" />
            </div>
        </template>
    </Layout>
</template>

<script setup>
import Giscus from '@giscus/vue'
import DefaultTheme from 'vitepress/theme'
import { useData, useRoute } from "vitepress";
import { onMounted, ref, watch, computed, nextTick } from 'vue';
const { frontmatter, isDark, theme } = useData();
const { Layout } = DefaultTheme;

const isLoading = ref(true);
const isBlogTop = ref(frontmatter.value.layout === 'blog');

const bgImg = ref(null);

onMounted(() => {
    import('../../tailwind').then(() => {
        isLoading.value = false;
    })
    window.addEventListener('scroll', () => {
        isBlogTop.value = window.scrollY <= 50;
    });
    updateImg();
});



watch(isDark, () => {
    updateImg();
});

const updateImg = () => {
    bgImg.value = getImg();
}

const getImg = () => {
    if (!theme.value.blog || !theme.value.blog.ornateStyle) return null;
    if (frontmatter.value.bgImg && !isDark.value) return frontmatter.value.bgImg;
    if (frontmatter.value.bgImgDark && isDark.value) return frontmatter.value.bgImgDark;
    if (theme.value.blog && (frontmatter.value.layout === 'docs' || !frontmatter.value.layout)) {
        return isDark.value ? theme.value.blog.bgImgDark : theme.value.blog.bgImg;
    }
    return null;
}

const useComment = computed(() => {
    if (frontmatter.value.comment == false) return false;
    if (theme.value.comment && theme.value.comment.use == true) return true;
    if (frontmatter.value.comment) return true;
});

const commentTheme = computed(() => {
    return isDark.value ? "dark_tritanopia" : "light_tritanopia";
});


// 参考 https://github.com/ATQQ/sugar-blog/blob/master/packages/theme/src/components/CommentGiscus.vue
const route = useRoute();
const showComment = ref(false);
watch(
    route,
    () => {
        showComment.value = false
        nextTick(() => {
            showComment.value = true
        })
    },
    {
        immediate: true
    }
);

</script>

<style>
#VPContent {
    background: #ffffff74;
}

.dark #VPContent {
    background: #1b1b1fc3;
}


#VPContent .aside-curtain {
    display: none;
}

.MathJax {
    overflow-y: hidden;
    overflow-x: auto;
}

/* 修复默认样式问题 */
@media (min-width: 960px) {
    .VPNavBar[data-v-cf6e7c5e]:not(.home) {
        background-color: var(--vp-nav-bg-color) !important;
    }
}
</style>

<style scoped>
#Loading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000000;
    margin: 0;
    padding: 0%;
    z-index: 10000;
}

.loadingStyle {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
