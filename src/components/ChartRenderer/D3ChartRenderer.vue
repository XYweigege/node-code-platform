<script setup lang="ts">
import * as d3 from 'd3'
import { onMounted, ref } from 'vue'

const container = ref<HTMLElement | null>(null)
onMounted(() => {
    //d3整体写法 类似于jquery
    //d3 数据驱动
    const root = d3.select(container.value)
    root.selectAll('div')
        .data([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
        .enter()
        .append('div')
        .style('width', '100px')
        .style('height', '20px')
        .style('background-color', 'red')
        .style('margin', '10px')
        .text(d => d)
        .exit()
        .transition()
})
</script>

<template>
    <div ref="container"></div>
</template>

<style scoped></style>
