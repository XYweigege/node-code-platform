import { getXAis, getYAxis } from './index'

// ======================
// 饼图 pie
// ======================
const piePlugin = {
    name: 'pie',
    transform(data) {
        return {
            tooltip: { trigger: 'item' },
            legend: { orient: 'horizontal' },
            series: [
                {
                    type: 'pie',
                    radius: '60%',
                    data: data.data.map(item => ({
                        name: item.label,
                        value: item.value
                    }))
                }
            ]
        }
    }
}

// ======================
// 环形图 donut
// ======================
const donutPlugin = {
    name: 'donut',
    transform(data) {
        return {
            tooltip: { trigger: 'item' },
            legend: { orient: 'horizontal' },
            series: [
                {
                    type: 'pie',
                    radius: ['40%', '70%'],
                    data: data.data.map(item => ({
                        name: item,
                        value: 10
                    }))
                }
            ]
        }
    }
}

// ======================
// 面积图 area（本质是 line）
// ======================
const areaPlugin = {
    name: 'area',
    transform(data) {
        debugger
        return {
            xAxis: getXAis(data),
            yAxis: getYAxis(),
            series: [
                {
                    type: 'line',
                    areaStyle: {},
                    data: data.measures
                }
            ]
        }
    }
}

// ======================
// 散点图 scatter
// ======================
const scatterPlugin = {
    name: 'scatter',
    transform(data) {
        debugger
        return {
            xAxis: getXAis(data),
            yAxis: getYAxis(),
            series: [
                {
                    type: 'scatter',
                    data: data.data.map(item => [item?.[0], item?.[1]])
                }
            ]
        }
    }
}

// ======================
// 雷达图 radar
// ======================
const radarPlugin = {
    name: 'radar',
    transform(data) {
        return {
            tooltip: {},
            radar: {
                indicator: data.data.map(item => ({
                    name: item.label,
                    max: Math.max(...data.measures) * 1.2
                }))
            },
            series: [
                {
                    type: 'radar',
                    data: [
                        {
                            value: data.measures,
                            name: 'Radar Data'
                        }
                    ]
                }
            ]
        }
    }
}

// ======================
// K线图 candlestick
// data.data 格式必须为 {open, close, low, high, label}
// ======================
const candlePlugin = {
    name: 'candlestick',
    transform(data) {
        return {
            xAxis: {
                type: 'category',
                data: data.data.map(item => item.label)
            },
            yAxis: { type: 'value' },
            series: [
                {
                    type: 'candlestick',
                    data: data.data.map(item => [item.open, item.close, item.low, item.high])
                }
            ]
        }
    }
}

// ======================
// 柱 + 线混合图 mixBarLine
// ======================
const mixBarLinePlugin = {
    name: 'mixBarLine',
    transform(data) {
        return {
            xAxis: getXAis(data),
            yAxis: getYAxis(),
            legend: { data: ['bar', 'line'] },
            series: [
                {
                    name: 'bar',
                    type: 'bar',
                    data: data.measures
                },
                {
                    name: 'line',
                    type: 'line',
                    data: data.measures
                }
            ]
        }
    }
}

const gaugePlugin = {
    name: 'gauge',
    transform(data) {
        return {
            series: [
                {
                    type: 'gauge',
                    progress: { show: true },
                    detail: { valueAnimation: true, formatter: '{value}%' },
                    data: [{ value: data.measures?.[0] ?? 0 }]
                }
            ]
        }
    }
}

const funnelPlugin = {
    name: 'funnel',
    transform(data) {
        return {
            series: [
                {
                    type: 'funnel',
                    data: data.data.map(item => ({
                        name: item.label,
                        value: item.value
                    }))
                }
            ]
        }
    }
}

const sunburstPlugin = {
    name: 'sunburst',
    transform(data) {
        return {
            series: [
                {
                    type: 'sunburst',
                    radius: [0, '90%'],
                    data: data.data
                }
            ]
        }
    }
}

const sankeyPlugin = {
    name: 'sankey',
    transform(data) {
        return {
            series: [
                {
                    type: 'sankey',
                    data: data.nodes,
                    links: data.links
                }
            ]
        }
    }
}

const heatmapPlugin = {
    name: 'heatmap',
    transform(data) {
        return {
            ...data
        }
    }
}
const boxplotPlugin = {
    name: 'boxplot',
    transform(data) {
        return {
            xAxis: { type: 'category', data: data.dimensions },
            yAxis: { type: 'value' },
            series: [
                {
                    type: 'boxplot',
                    data: data.data.map(item => item.values) // [min, Q1, median, Q3, max]
                }
            ]
        }
    }
}

const graphPlugin = {
    name: 'graph',
    transform(data) {
        return {
            series: [
                {
                    type: 'graph',
                    layout: 'force',
                    roam: true,
                    data: data.nodes,
                    links: data.links
                }
            ]
        }
    }
}
const treemapPlugin = {
    name: 'treemap',
    transform(data) {
        return {
            series: [
                {
                    type: 'treemap',
                    data: data.data
                }
            ]
        }
    }
}

// 构建企业级图表转换引擎（Chart Transformer），采用插件化架构实现 15+ 种图表类型（柱状图、折线图、饼图、桑基图、K 线图、地图、热力图等）的自动数据适配。通过注册机制实现数据解析与渲染完全解耦，大幅提升图表开发的扩展性与复用性。
export {
    piePlugin,
    donutPlugin,
    areaPlugin,
    scatterPlugin,
    radarPlugin,
    candlePlugin,
    mixBarLinePlugin,
    gaugePlugin,
    funnelPlugin,
    sunburstPlugin,
    sankeyPlugin,
    heatmapPlugin,
    boxplotPlugin,
    graphPlugin,
    treemapPlugin
}
