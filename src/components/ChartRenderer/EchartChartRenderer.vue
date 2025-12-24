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

// const option = ref({
//     title: {
//         text: 'Traffic Sources',
//         left: 'center'
//     },
//     tooltip: {
//         trigger: 'item',
//         formatter: '{a} <br/>{b} : {c} ({d}%)'
//     },
//     legend: {
//         orient: 'vertical',
//         left: 'left',
//         data: ['Direct', 'Email', 'Ad Networks', 'Video Ads', 'Search Engines']
//     },
//     series: [
//         {
//             name: 'Traffic Sources',
//             type: 'pie',
//             radius: '55%',
//             center: ['50%', '60%'],
//             data: [
//                 { value: 335, name: 'Direct' },
//                 { value: 310, name: 'Email' },
//                 { value: 234, name: 'Ad Networks' },
//                 { value: 135, name: 'Video Ads' },
//                 { value: 1548, name: 'Search Engines' }
//             ],
//             emphasis: {
//                 itemStyle: {
//                     shadowBlur: 10,
//                     shadowOffsetX: 0,
//                     shadowColor: 'rgba(0, 0, 0, 0.5)'
//                 }
//             }
//         }
//     ]
// })
const data = chartTransformer.transform({
    type: 'line',
    data: ['mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
