import { getXAis, getYAxis } from './index'

/**
 * 柱状图数据转换器
 */
export const barPlugin = {
    name: 'bar',
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
                    }
                }
            ]
        }
    }
}
