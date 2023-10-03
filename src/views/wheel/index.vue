<script setup>
import { ref } from 'vue'

const color = ref('#000000')

const action = (val) => {
    document.documentElement.style.setProperty('--color-text', val)
    color.value = val
}

action(color.value)

</script>

<template>
<div class="flex flex-col items-center">
    <div class="flex items-center">
        <router-link class="button text-center" to="/">首頁</router-link>
        <div class="button" @click="action('#ff0000')">紅</div>
        <div class="button" @click="action('#FF8000')">橙</div>
        <div class="button" @click="action('#ffff00')">黃</div>
        <div class="button" @click="action('#00ff00')">綠</div>
        <div class="button" @click="action('#00ffff')">藍</div>
        <div class="button" @click="action('#0000ff')">靛</div>
        <div class="button" @click="action('#4B0091')">紫</div>
        自訂：<input class="w-[26px] h-[26px]" type="color" @change="action(color)" v-model="color">
    </div>
    <span class="a text-[100px] font-bold">123</span>
</div>
</template>