<template>
    <VChart class="chart" :option="option" autoresize="true" />
    {{ props.chartType }}
</template>

<!-- 图表渲染器  -->
<script setup>
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import {
    PieChart,
    BarChart,
    RadarChart,
    LineChart,
    ScatterChart,
    CandlestickChart,
    GaugeChart,
    FunnelChart,
    SunburstChart,
    SankeyChart,
    HeatmapChart,
    BoxplotChart,
    GraphChart,
    TreemapChart
} from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'
import { provide } from 'vue'
import { chartTransformer } from '../../transformers/chart'
import { GridComponent } from 'echarts/components'
import { computed } from 'vue'

use([
    CanvasRenderer,
    PieChart,
    LineChart,
    RadarChart,
    ScatterChart,
    BarChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
    CandlestickChart,
    GaugeChart,
    FunnelChart,
    SunburstChart,
    SankeyChart,
    HeatmapChart,
    BoxplotChart,
    GraphChart,
    TreemapChart
]) //echarts的插件化机制
provide(THEME_KEY, 'dark')

// 测试柱状图
const props = defineProps({
    chartType: {
        type: String,
        default: 'bar'
    }
})

// 根据图表类型动态选择数据格式
const getChartData = type => {
    const baseData = {
        type,
        dimensions: ['mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        measures: [150, 230, 224, 218, 135, 147, 260]
    }
    if (type === 'area') {
        return {
            ...baseData,
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line',
                    areaStyle: {
                        color: 'rgba(1, 191, 236, 0.5)',
                        origin: 'end'
                    }
                }
            ]
        }
    }
    // 饼图和环形图数据格式
    if (type === 'pie' || type === 'donut') {
        return {
            ...baseData,
            data: [
                { label: 'A', value: 100 },
                { label: 'B', value: 200 },
                { label: 'C', value: 150 },
                { label: 'D', value: 250 }
            ]
        }
    }
    // 散点图数据格式
    else if (type === 'scatter') {
        return {
            ...baseData,
            data: [
                [10, 5],
                [0, 8],
                [6, 10],
                [2, 12],
                [8, 9]
            ]
        }
    }
    // 雷达图数据格式
    else if (type === 'radar') {
        return {
            ...baseData,
            data: [
                { label: '指标1', value: 100 },
                { label: '指标2', value: 200 },
                { label: '指标3', value: 150 },
                { label: '指标4', value: 250 },
                { label: '指标5', value: 300 },
                { label: '指标6', value: 220 }
            ]
        }
    }
    // K线图数据格式
    else if (type === 'candlestick') {
        return {
            ...baseData,
            data: [
                { open: 100, close: 120, low: 90, high: 130, label: 'mon' },
                { open: 120, close: 110, low: 105, high: 125, label: 'Tue' },
                { open: 110, close: 130, low: 108, high: 135, label: 'Wed' },
                { open: 130, close: 125, low: 120, high: 138, label: 'Thu' },
                { open: 125, close: 140, low: 122, high: 145, label: 'Fri' },
                { open: 140, close: 135, low: 132, high: 148, label: 'Sat' },
                { open: 135, close: 150, low: 130, high: 155, label: 'Sun' }
            ]
        }
    }
    // 仪表盘数据格式
    else if (type === 'gauge') {
        return {
            ...baseData,
            data: [{ value: 75 }]
        }
    }
    // 漏斗图数据格式
    else if (type === 'funnel') {
        return {
            ...baseData,
            data: [
                { label: '步骤1', value: 100 },
                { label: '步骤2', value: 80 },
                { label: '步骤3', value: 60 },
                { label: '步骤4', value: 40 },
                { label: '步骤5', value: 20 }
            ]
        }
    }
    // 旭日图数据格式
    else if (type === 'sunburst') {
        return {
            ...baseData,
            data: [
                {
                    name: 'A',
                    value: 100,
                    children: [
                        { name: 'A1', value: 30 },
                        { name: 'A2', value: 70 }
                    ]
                },
                {
                    name: 'B',
                    value: 200,
                    children: [
                        { name: 'B1', value: 120 },
                        { name: 'B2', value: 80 }
                    ]
                }
            ]
        }
    }
    // 桑基图数据格式
    else if (type === 'sankey') {
        return {
            ...baseData,
            nodes: [{ name: 'A' }, { name: 'B' }, { name: 'C' }, { name: 'D' }],
            links: [
                { source: 'A', target: 'B', value: 100 },
                { source: 'B', target: 'C', value: 80 },
                { source: 'B', target: 'D', value: 20 },
                { source: 'C', target: 'D', value: 40 }
            ]
        }
    }
    // 热力图数据格式
    else if (type === 'heatmap') {
        return {
            type: 'heatmap',
            tooltip: { position: 'top' },
            grid: { height: '50%', top: '10%' },
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                splitArea: { show: true }
            },
            yAxis: {
                type: 'category',
                data: ['Morning', 'Afternoon', 'Evening'],
                splitArea: { show: true }
            },
            visualMap: {
                min: 0,
                max: 100,
                calculable: true,
                orient: 'horizontal',
                left: 'center',
                bottom: '15%'
            },
            series: [
                {
                    type: 'heatmap',
                    data: [
                        [0, 0, 10],
                        [1, 0, 20],
                        [2, 0, 30],
                        [3, 0, 40],
                        [4, 0, 50],
                        [5, 0, 60],
                        [6, 0, 70],
                        [0, 1, 20],
                        [1, 1, 30],
                        [2, 1, 40],
                        [3, 1, 50],
                        [4, 1, 60],
                        [5, 1, 70],
                        [6, 1, 80]
                    ],
                    label: { show: true },
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
    }
    // 箱线图数据格式
    else if (type === 'boxplot') {
        return {
            ...baseData,
            data: [
                { values: [80, 90, 100, 110, 120] },
                { values: [70, 85, 95, 105, 115] },
                { values: [60, 75, 85, 95, 105] },
                { values: [50, 65, 75, 85, 95] },
                { values: [40, 55, 65, 75, 85] },
                { values: [30, 45, 55, 65, 75] },
                { values: [20, 35, 45, 55, 65] }
            ]
        }
    }
    // 关系图数据格式
    else if (type === 'graph') {
        return {
            ...baseData,
            nodes: [{ name: '节点1' }, { name: '节点2' }, { name: '节点3' }, { name: '节点4' }, { name: '节点5' }],
            links: [
                { source: 0, target: 1 },
                { source: 0, target: 2 },
                { source: 1, target: 3 },
                { source: 2, target: 3 },
                { source: 3, target: 4 }
            ]
        }
    }
    // 树图数据格式
    else if (type === 'treemap') {
        return {
            ...baseData,
            data: [
                {
                    name: '根节点',
                    children: [
                        {
                            name: '子节点1',
                            children: [
                                { name: '叶子1', value: 10 },
                                { name: '叶子2', value: 20 }
                            ]
                        },
                        {
                            name: '子节点2',
                            children: [
                                { name: '叶子3', value: 30 },
                                { name: '叶子4', value: 40 },
                                { name: '叶子5', value: 50 }
                            ]
                        }
                    ]
                }
            ]
        }
    }
    // 默认数据格式
    else {
        return baseData
    }
}

// const data = chartTransformer.transform(getChartData(props.chartType))
const option = computed(() => {
    const data = chartTransformer.transform(getChartData(props.chartType))
    console.log(props.chartType, data, 'type')
    return data
})
</script>

<style scoped>
.chart {
    height: 400px;
}
</style>
