<template>
    <div id="aplayer">1</div>
</template>


<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import 'APlayer/dist/APlayer.min.css';
import APlayer from 'APlayer';
onMounted(() => {
    const ap = new APlayer({
        container: document.getElementById('aplayer'),
        audio: [{
            name: 'name',
            artist: 'artist',
            url: 'http://music.163.com/song/media/outer/url?id=1363948882.mp3',
            cover: '/ava.jpg'
        }]
    });
});
</script>