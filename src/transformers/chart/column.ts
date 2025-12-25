import { getXAis, getYAxis } from './index'

/**
 * 垂直柱状图数据转换器
 */
export const columnPlugin = {
    name: 'column',
    transform(data) {
        return {
            tooltip: { trigger: 'axis' },
            xAxis: getXAis(data),
            yAxis: getYAxis(),
            series: [
                {
                    type: 'bar',
                    data: data.measures,
                    label: {
                        show: true,
                        position: 'top'
                    },
                    itemStyle: {
                        borderRadius: [4, 4, 0, 0]
                    }
                }
            ]
        }
    }
}
