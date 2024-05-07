<template>
    <div class="flex justify-center items-center gap-5 flex-wrap">
        <div v-for="b in blog"
            class="dark:bg-gray-700 bg-white hover:shadow-2xl flex-col md:w-5/12 w-full flex shadow-md dark:shadow-none hover:-translate-y-1 transition cursor-pointer">
            <img :src="b.img"
                class=" object-cover object-center" />
            <div class="p-4 px-10">
                <div class="text-2xl font-semibold">{{ b.title }}</div>
                <div class="flex justify-between items-center mt-5">
                    <p class="text-gray-500 dark:text-gray-300">{{ b.desc }}</p>
                    <a class=" text-blue-400 dark:text-indigo-300 hover:underline underline-offset-2" :href="b.url" target="_blank">Let's have a look -></a>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
  blog: Array
})

</script>