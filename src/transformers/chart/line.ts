import { getXAis, getYAxis } from './index'

/**
 * 折线图数据转换器
 */
export const linePlugin = {
    name: 'line',
    transform(data) {
        return {
            tooltip: { trigger: 'axis' },
            xAxis: getXAis(data),
            yAxis: getYAxis(),
            series: [
                {
                    type: 'line',
                    data: data.measures,
                    smooth: true,
                    lineStyle: {
                        width: 3
                    },
                    itemStyle: {
                        symbol: 'circle',
                        symbolSize: 8
                    }
                }
            ]
        }
    }
}
