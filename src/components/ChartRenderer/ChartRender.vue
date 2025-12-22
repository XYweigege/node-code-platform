<script setup lang="ts">
import { ref } from 'vue'
import EchartChartRenderer from './EchartChartRenderer.vue'
import D3ChartRenderer from './D3ChartRenderer.vue'
import ZRenderChartRenderer from './ZRenderChartRenderer.vue'

type ChartRendererType = 'echart' | 'd3' | 'zrender'
const chartType = ref<ChartRendererType>('echart')

//策略模式
const charts = {
    echart: EchartChartRenderer,
    d3: D3ChartRenderer,
    zrender: ZRenderChartRenderer
}
</script>

<template>
    <component :is="charts[chartType]" />
</template>

<style scoped></style>
