<script setup lang="ts">
import { ref, watch } from 'vue'
import EchartChartRenderer from './EchartChartRenderer.vue'
import D3ChartRenderer from './D3ChartRenderer.vue'
import ZRenderChartRenderer from './ZRenderChartRenderer.vue'

type ChartRendererType = 'echart' | 'd3' | 'zrender'
const chartType = ref<ChartRendererType>('zrender')

//策略模式
const charts = {
    echart: EchartChartRenderer,
    d3: D3ChartRenderer,
    zrender: ZRenderChartRenderer
}
watch(chartType, val => {
    console.log(val, 'val')
})
</script>

<template>
    <button @click="chartType = 'echart'">echart</button>
    <button @click="chartType = 'd3'">d3</button>
    <button @click="chartType = 'zrender'">zrender</button>
    <component :is="charts[chartType]" />
</template>

<style scoped></style>
