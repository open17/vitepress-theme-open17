<template>
    <div class="flex mt-20 justify-center items-center flex-col gap-20 mx-20 w-auto mb-20">
        <div class="text-3xl mt-5 font-bold">Tags - <span class="text-3xl">{{ ActiveTag == '' ? 'All' : ActiveTag }}</span> </div>
        <!-- tags list -->
        <div class="flex justify-center items-center flex-wrap mx-20 gap-4">
            <span v-for="(num, tag) in Tags" :key="tag"
                class="px-4 py-1 rounded-md m-2 cursor-pointer border-2 tag relative" @click="ActiveTag = tag">
                {{ tag == '' ? 'All' : tag }}
                <span class=" absolute top-[-0.9rem] right-[-1rem] rounded-full px-2 scale-[70%] border-2 border-[var(--vp-c-indigo-1)] bg-[var(--vp-c-bg)]">{{ num
                    }}</span>
            </span>
        </div>
        <div class="text-2xl w-full text-center border-dashed border-t-2 pt-5"></div>
        <!--  posts with tags-->
        <div class="flex justify-center  flex-col gap-5">
            <div class="flex justify-between gap-20" v-for="post in filteredList" :key="post.url">
                <a :href="withBase(post.url)" class="hover:underline">{{ post.frontmatter.title }}</a>
                <div class="flex justify-end items-end gap-2">
                    <span class="text-[var(--vp-c-indigo-1)] cursor-pointer hover:underline underline-offset-4"
                        v-for="(tag,idx) in post.frontmatter.tags" @click="ActiveTag = tag">{{ idx===post.frontmatter.tags.length-1?tag:tag+',' }}</span>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue';
import { data as posts } from '../posts.data.js';
import { useData, withBase } from 'vitepress';

let Tags = ref({ '': posts.length });
let ActiveTag = ref('');
onMounted(() => {
    posts.forEach(post => {
        const tags = post.frontmatter.tags;
        if (tags) {
            tags.forEach(tag => {
                if (Tags.value[tag]) {
                    Tags.value[tag]++;
                }
                else {
                    Tags.value[tag] = 1;
                }
            })
        }

    });
});

const filteredList = computed(() => {
    let list = posts;
    if (ActiveTag.value) {
        list = list.filter(item => item.frontmatter.tags && item.frontmatter.tags.includes(ActiveTag.value));
    }
    return list;
});
</script>

<style scoped>
.tag {
    border-color: var(--vp-c-indigo-1);
}
</style>
