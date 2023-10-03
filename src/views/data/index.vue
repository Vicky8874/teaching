<script setup>
import { ref } from 'vue'

const format = ref([])
const name = ref('')
const num = ref(1)
const money = ref('')

const numAction = (val) => {
  switch(val) {
    case '+':
      num.value = Number(num.value) + 1
      break
    case '-':
      if(Number(num.value) > 1) num.value = Number(num.value) - 1
      break
  }
}

const action = (val, index, type) => {
  switch(val) {
    case 'add':
      format.value.push({ name: name.value, num: num.value, money: money.value ?? 0, total: Number(num.value) * Number(money.value ?? 0), check: false })
      name.value = ''
      num.value = 1
      money.value = ''
      break
    case 'del':
      format.value.splice(index, 1)
      break
    case 'edit':
      if(type === '+') format.value[index].num ++
      else if(type === '-' && format.value[index].num > 1) format.value[index].num --
      format.value[index].total = format.value[index].num * format.value[index].money
      break
  }
}

const count = () => {
  if(!format.value.length) return 0
  let all = 0
  format.value.forEach(item => {
    if(item.check) all += item.total
  })
  return all
}

</script>

<template>
  <div class="p-[20px]">
    <router-link class="button text-center" to="/">首頁</router-link>
    <div class="mt-[30px]">
      <div>商品：<input type="text" v-model="name" placeholder="請輸入商品名稱" class="border-[1px] border-black" /></div>
      <div class="flex items-center">
        <span>數量：</span>
        <div class="button" @click="numAction('-')">-</div>
        <input type="text" v-model="num" placeholder="請輸入商品數量" class="border-[1px] border-black text-center rounded-[4px] w-[40px]" />
        <div class="button" @click="numAction('+')">+</div>
      </div>
      <div>單價：<input type="text" v-model="money" placeholder="請輸入商品金額" class="border-[1px] border-black" /></div>
      <div class="button w-[fit-content]" @click="action('add')">新增</div>
    </div>
    <div>
      <div v-for="(item, index) in format" :key="index" class="flex items-center">
        <el-checkbox v-model="item.check" />
        <div class="mx-[10px]">商品：<input type="text" v-model="item.name" placeholder="請輸入商品名稱" class="border-[1px] border-black w-[60px]" /></div>
        <div class="mx-[10px] flex items-center">
          <span>數量：</span>
          <div class="button" @click="action('edit', index, '-')">-</div>
          <input type="text" v-model="item.num" placeholder="請輸入商品數量" class="border-[1px] border-black text-center rounded-[4px] w-[40px]" />
          <div class="button" @click="action('edit', index, '+')">+</div>
        </div>
        <div class="mx-[10px]">單價：<input type="text" v-model="item.money" placeholder="請輸入商品金額" class="border-[1px] border-black w-[60px]" /></div>
        <div class="mx-[10px]">金額：{{ item.total }}</div>
        <div class="button" @click="action('edit', index)">修改</div>
        <div class="button" @click="action('del', index)">刪除</div>
      </div>
      <div>總金額：{{ count() }}</div>
    </div>
  </div>
</template>