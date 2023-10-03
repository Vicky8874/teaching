<script setup>
import FC from './config/FC.json'
import { ref } from 'vue'

const format = ref(FC)
const gameCode = ref('')
const gameTypeData = ref([''])
const gameType = ref('')
const statusData = ref([''])
const status = ref('')

const init = () => {
  format.value.forEach(item => {
    if(!gameTypeData.value.includes(item.gameType)) gameTypeData.value.push(item.gameType)
    if(!statusData.value.includes(item.status)) statusData.value.push(item.status)
  })
}

init()

const action = (bool) => {
  if(!bool) {
    gameCode.value = ''
    gameType.value = ''
    status.value = ''
    format.value = FC
    return
  }
  format.value = FC
  if(gameCode.value) format.value = format.value.filter(item => item.gameCode === Number(gameCode.value))
  if(gameType.value) format.value = format.value.filter(item => item.gameType === gameType.value)
  if(status.value !== '') format.value = format.value.filter(item => item.status === Number(status.value))
}

</script>

<template>
  <div class="p-[20px]">
    <div class="flex justify-between items-center">
      <div>gameCode：<input type="text" v-model="gameCode" class="border-[1px] border-black" /></div>
      <div>
        gameType：
        <select v-model="gameType" class="border-[1px] border-black">
          <option v-for="(item, index) in gameTypeData" :key="index" :value="item">{{ item }}</option>
        </select>
      </div>
      <div>
        status：
        <select v-model="status" class="border-[1px] border-black" placeholder="請選擇">
          <option v-for="(item, index) in statusData" :key="index" :value="item">{{ item }}</option>
        </select>
      </div>
      <div class="button text-center" @click="action(true)">搜尋</div>
      <div class="button text-center" @click="action(false)">清除</div>
      <router-link class="button text-center" to="/">首頁</router-link>
    </div>
    <div>
      <el-table :data="format" style="width: 100%">
        <el-table-column prop="gameCode" label="gameCode" />
        <el-table-column prop="gameImg" label="gameImg" />
        <el-table-column prop="gameType" label="gameType" />
        <el-table-column prop="status" label="status" />
        <el-table-column prop="gameName['zh-TW']" label="zh-TW" />
        <el-table-column prop="gameName['zh-CN']" label="zh-CN" />
        <el-table-column prop="gameName['default']" label="default" />
      </el-table>
    </div>
  </div>
</template>

<style scoped>
  select {
    width: 100px;
  }
  input {
    width: 100px;
  }
</style>