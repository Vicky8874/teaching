<script setup>
import { PRODUCT, PAGE_SELECT } from './config/index.js'
import { computed, ref, watch } from 'vue'

const labelSelect = [{ id: 'product_id', label: '序號' }, { id: 'point', label: '金額' }]
const orderSelect = [{ id: 'inc', label: '遞增' }, { id: 'dec', label: '遞減' }]
const pages = ref(5)
const label = ref('')
const order = ref('')
const length = PRODUCT.length
const nowPage = ref(1)
const totalPage = computed(() => Math.ceil(length / pages.value))
const product = ref(JSON.parse(JSON.stringify(PRODUCT))) // 深拷貝(參考下列網址)
// https://medium.com/andy-blog/%E9%97%9C%E6%96%BCjs%E4%B8%AD%E7%9A%84%E6%B7%BA%E6%8B%B7%E8%B2%9D-shallow-copy-%E4%BB%A5%E5%8F%8A%E6%B7%B1%E6%8B%B7%E8%B2%9D-deep-copy-5f5bbe96c122
const format = ref([])

// 切頁
const action = (val) => {
    if(val === 'prev') nowPage.value = nowPage.value > 1 ? nowPage.value - 1 : nowPage.value
    else nowPage.value = nowPage.value < totalPage.value ? nowPage.value + 1 : nowPage.value
    init()
}

// 初始化
const init = () => {
    product.value = JSON.parse(JSON.stringify(PRODUCT))
    if(label.value && order.value) {
        if(order.value === 'inc') {
            product.value.sort((a, b) => {
                return a[label.value] > b[label.value] ? 1 : -1
            })
        }
        else {
            product.value.sort((a, b) => {
                return a[label.value] < b[label.value] ? 1 : -1
            })
        }
    }
    format.value = product.value.slice((nowPage.value - 1) * 5, (nowPage.value - 1) * 5 + pages.value)
}

// 清除
const clear = () => {
    pages.value = 5
    label.value = ''
    order.value = ''
    init()
}

watch(pages, () => {
    nowPage.value = 1
})

init()

</script>

<template>
<div>
    <div class="flex items-center">
        <div>每頁顯示筆數</div>
        <el-select v-model="pages" class="m-2" placeholder="請選擇筆數" @change="init()">
            <el-option
                v-for="(item, index) in PAGE_SELECT"
                :key="index"
                :label="item"
                :value="item"
            />
        </el-select>
        <div>依照</div>
        <el-select v-model="label" class="m-2" placeholder="請選擇" @change="init()">
            <el-option
                v-for="(item, index) in labelSelect"
                :key="index"
                :label="item.label"
                :value="item.id"
            />
        </el-select>
        <div>排序</div>
        <el-select v-model="order" class="m-2" placeholder="請選擇筆數" @change="init()">
            <el-option
                v-for="(item, index) in orderSelect"
                :key="index"
                :label="item.label"
                :value="item.id"
            />
        </el-select>
        <div class="button text-center" @click="clear()">清除</div>
        <router-link class="button text-center" to="/">首頁</router-link>
    </div>
    <el-table :data="format" class="min-h-[300px]" style="width: 100%">
        <el-table-column prop="product_id" label="序號"/>
        <el-table-column prop="label" label="品名"/>
        <el-table-column prop="point" sortable label="單價" />
    </el-table>
    <div class="flex justify-center items-center">
        <div :class="nowPage > 1 ? 'page' : 'page_allowed'" @click="action('prev')">上一頁</div>
        <div class="text-[14px] mx-[4px]">{{ nowPage + '/' + totalPage }}</div>
        <div :class="nowPage < totalPage ? 'page' : 'page_allowed'" @click="action('next')">下一頁</div>
    </div>
</div>
</template>