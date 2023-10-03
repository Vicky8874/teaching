<script setup>
import * as data from './config/index.js' // 酷炫引入法(參考下列網址)
// https://www.twblogs.net/a/5ec453407a3fc17e6e430d3c
import { computed, ref, watch } from 'vue'

const format = ref([])
const target = ref([])
const pageSelect = data.PAGE_SELECT
const labelSelect = [{ id: 'product_id', label: '序號' }, { id: 'num', label: '數量' }, { id: 'point', label: '單價' }, { id: 'total', label: '總金額' }]
const orderSelect = [{ id: 'inc', label: '遞增' }, { id: 'dec', label: '遞減' }]
const pages = ref(5)
const label = ref('')
const order = ref('')
const length = computed(() => target.value.length)
const nowPage = ref(1)
const totalPage = computed(() => Math.ceil(length.value / pages.value)) // 數學運算式(參考下列網址)
// http://www.eion.com.tw/Blogger/?Pid=1173

// 初始化
const init = () => {
    target.value = data.PRODUCT.map(item => {
        let countFormat = count(item.product_id, item.point)
        return {
            ...item,
            num: countFormat.num,
            total: countFormat.total,
        }
    })
    if(label.value && order.value) { // 排序(參考下列網址)
        // http://www.eion.com.tw/Blogger/?Pid=1170
        if(order.value === 'inc') {
            target.value.sort((a, b) => {
                return a[label.value] > b[label.value] ? 1 : -1
            })
        }
        else {
            target.value.sort((a, b) => {
                return a[label.value] < b[label.value] ? 1 : -1
            })
        }
    }
    format.value = target.value.slice((nowPage.value - 1) * 5, (nowPage.value - 1) * 5 + pages.value) // 取資料(參考下列網址)
    // https://medium.com/@bebebobohaha/slice-splice-split-%E5%82%BB%E5%82%BB%E5%88%86%E4%B8%8D%E6%B8%85-46d9c8992729
}

// 計算數量
const count = (id, point) => {
    let num = 0
    data.SALE.forEach(item => {
        num += item.product.find(item => item.product_id === id)?.num ?? 0 // 雙問號用法(參考下列網址)
        // https://zhuanlan.zhihu.com/p/395365727
    })
    return { num: num, total: num * point }
}

// 切頁
const action = (val) => {
    if(val === 'prev') nowPage.value = nowPage.value > 1 ? nowPage.value - 1 : nowPage.value
    else nowPage.value = nowPage.value < totalPage.value ? nowPage.value + 1 : nowPage.value
    // 三元運算法
    // https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/Conditional_operator
    init()
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
                v-for="(item, index) in pageSelect"
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
        <el-table-column prop="product_id" sortable label="序號"/>
        <el-table-column prop="label" label="品名"/>
        <el-table-column prop="num" sortable label="數量" />
        <el-table-column prop="point" sortable label="單價" />
        <el-table-column prop="total" sortable label="總金額" />
    </el-table>
    <div class="flex justify-center items-center mt-[10px]">
        <div :class="nowPage > 1 ? 'page' : 'page_allowed'" @click="action('prev')">上一頁</div>
        <div class="text-[14px] mx-[4px]">{{ nowPage + '/' + totalPage }}</div>
        <div :class="nowPage < totalPage ? 'page' : 'page_allowed'" @click="action('next')">下一頁</div>
    </div>
</div>
</template>