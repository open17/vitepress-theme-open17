<template>
    <div class="flex justify-center items-center gap-5 flex-wrap">
        <div v-for="b in blog"
            class="hover:shadow-2xl flex-col rounded-e-md rounded-s-md   w-full flex shadow-md dark:shadow-none hover:-translate-y-1 transition cursor-pointer">
            <a class="" :href="b.url" target="_blank">
                <img :src="b.img" class=" object-cover object-center" />
                <div class="flex justify-center items-start flex-wrap flex-col px-5 gap-3 pb-3 mt-2">
                    <div class="text-3xl font-semibold mt-3 " v-if="b.title">{{ b.title }}</div>
                    <p class="text-sm  text-nowrap">{{ b.desc }}</p>
                </div>
            </a>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    blog: Array
})

</script>