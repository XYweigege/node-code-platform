<template>
    <div class="chart-test">
        <h1>图表转换器测试</h1>

        <div class="chart-selector">
            <label>选择图表类型：</label>
            <select v-model="selectedChartType">
                <option value="bar">柱状图</option>
                <option value="line">折线图</option>
                <option value="column">垂直柱状图</option>
                <option value="pie">饼图</option>
                <option value="donut">环形图</option>
                <option value="area">面积图</option>
                <option value="scatter">散点图</option>
                <option value="radar">雷达图</option>
                <option value="candlestick">K线图</option>
                <option value="mixBarLine">柱线混合图</option>
                <option value="gauge">仪表盘</option>
                <option value="funnel">漏斗图</option>
                <option value="sunburst">旭日图</option>
                <option value="sankey">桑基图</option>
                <option value="heatmap">热力图</option>
                <option value="boxplot">箱线图</option>
                <option value="graph">关系图</option>
                <option value="treemap">树图</option>
            </select>
        </div>

        <div class="chart-container">
            <EchartChartRenderer :chart-type="selectedChartType" />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import EchartChartRenderer from './EchartChartRenderer.vue'

const selectedChartType = ref('bar')
</script>

<style scoped>
.chart-test {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.chart-selector {
    margin-bottom: 20px;
}

.chart-selector select {
    margin-left: 10px;
    padding: 5px 10px;
    font-size: 16px;
}

.chart-container {
    height: 400px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 10px;
}

.chart-info {
    background-color: #f5f5f5;
    padding: 15px;
    border-radius: 8px;
    overflow-x: auto;
}

.data-section {
    margin-top: 15px;
    padding: 10px;
    background-color: #fff;
    border-radius: 6px;
    border: 1px solid #e0e0e0;
}

.data-section h4 {
    margin: 0 0 10px 0;
    color: #333;
    font-size: 16px;
}

.chart-info pre {
    white-space: pre-wrap;
    font-family: 'Courier New', Courier, monospace;
    font-size: 14px;
    margin: 0;
    color: #333;
    line-height: 1.5;
}
</style>
