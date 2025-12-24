//负责整体数据转换器的适配逻辑
import {} from './bar'
import {} from './line'
import {} from './pie'
import {} from './column'

//  图表渲染器引擎开发
/**
 * 插件化思想定制转换器。
 */
type ChartResData = {
    type: string
    dimensions: string[]
    measures: string[]
    data: {
        value: string | number
        label: string
    }[]
}
/**
 * 获取X轴
 * @param data
 * @returns
 */
export const getXAis = (data: ChartResData) => {
    return {
        type: 'category',
        data: data?.dimensions || ['mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }
}
/**
 * 获取Y轴
 * @returns
 */
export const getYAxis = () => {
    return {
        type: 'value'
    }
}

export const getSeries = (data: ChartResData) => {
    debugger
    return [
        {
            data: data.measures || [150, 230, 224, 218, 135, 147, 260],
            type: data.type
        }
    ]
}

//跟后端定义一个数据，通用格式，前端根据不同的图表类型，转换生成不同的图表数据
//47分
/**
 * 图表数据转换器
 */

/**
 * 柱状图数据转换器
 */
const barTransformer = {
    name: 'bar',
    transform(data: ChartResData) {
        //适配逻辑
        return {
            xAxis: getXAis(data),
            yAxis: getYAxis(),
            series: getSeries(data)
        }
    }
}

const lineTransformer = {
    name: 'line',
    transform(data: ChartResData) {
        return {
            xAxis: getXAis(data),
            yAxis: getYAxis(),
            series: getSeries(data)
        }
    }
}

//加转换器逻辑
//定义转换器，注册转换器
//
class ChartTransformer {
    private transformers = [barTransformer]
    constructor() {
        //初始化适配器
    }

    //注册transformer
    use(transformer: any) {
        this.transformers.push(transformer)
    }
    transform(config: any) {
        //适配逻辑
        const { type } = config
        const transformer = this.transformers.find(t => t.name === type)
        if (!transformer) {
            throw new Error('no transformer ')
        }
        return transformer.transform(config) //['mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }
}

export const chartTransformer = new ChartTransformer()

//注册转换器
chartTransformer.use(lineTransformer)
/**
 * 都是插件化思想
 * webpack
 * vite
 * babel
 * taro
 * vue
 * pinia
 */
