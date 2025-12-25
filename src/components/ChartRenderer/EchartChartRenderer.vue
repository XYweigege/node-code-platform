<template>
    <VChart class="chart" :option="option" autoresize="true" />
</template>

<!-- 图表渲染器  -->
<script setup>
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart, BarChart, LineChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'
import { ref, provide } from 'vue'
import { chartTransformer } from '../../transformers/chart'
import { GridComponent } from 'echarts/components'

use([CanvasRenderer, PieChart, LineChart, BarChart, TitleComponent, TooltipComponent, LegendComponent, GridComponent]) //echarts的插件化机制
provide(THEME_KEY, 'dark')

const data = chartTransformer.transform({
    type: 'pie',
    data: [
        {
            name: 'one',
            value: 100
        },
        {
            name: 'two',
            value: 100
        },
        {
            name: 'two',
            value: 100
        },
        {
            name: 'two',
            value: 100
        }
    ],
    measures: [150, 230, 224, 218, 135, 147, 260],
    dimensions: ['mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
})
const option = ref(data)
</script>

<style scoped>
.chart {
    height: 400px;
}
</style>
