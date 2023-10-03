<script setup>
import SALE from './sale.vue'
import PRODUCT from './product.vue'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const tabFormat = [
    { label: '產品', id: 'product', component: PRODUCT, },
    { label: '銷售狀況', id: 'sale', component: SALE, },
]

const component = computed(() => tabFormat.find(item => item.id === route.query.id)?.component)

// router確認
const routeCheck = () => {
    if(route.path !== '/backstage') return
    if(!tabFormat.some(item => item.id === route.query.id)) router.replace({ query: { id: tabFormat[0].id } })
}

const action = (id) => {
    router.replace({ query: { id: id } })
}

watch(() => route.query.id, () => routeCheck())

routeCheck()

</script>

<template>
<div class="p-[20px]">
    <div class="flex">
        <div
            v-for="(item, index) in tabFormat"
            :key="index"
            @click="action(item.id)"
            class="mr-[10px] cursor-pointer"
            :class="route.query.id === item.id ? 'font-bold text-[#02D8F2] border-b-[1px] border-[#02D8F2] pb-[4px]' : ''"
        >
            {{ item.label }}
        </div>
    </div>
    <component :is="component" />
</div>
</template>