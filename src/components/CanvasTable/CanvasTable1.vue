<template>
    <div>
        <canvas ref="canvas" width="800" height="600"> 1 </canvas>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
const data = ref({
    columns: [
        {
            title: '姓名',
            key: 'name',
            width: 100
        },
        {
            title: '年龄',
            key: 'age',
            width: 100
        }
    ],
    dataSource: Array.from({ length: 1000 }).map((item, index) => {
        return {
            key: index,
            name: `name-${index}`,
            age: Math.floor(Math.random() * 100)
        }
    })
})
const canvas = ref(null)
onMounted(() => {
    //1. 获取canvas dom
    //2. 获取绘制上下文
    const ctx = canvas.value.getContext('2d')

    //获取缩放比例（物理像素比）
    const pixelRatio = window.devicePixelRatio

    //定义两个参数
    const cellWidth = 100 * pixelRatio
    const cellHeight = 50 * pixelRatio
    const padding = 10 * pixelRatio

    ctx.beginPath()
    //画表格

    //画表头
    for (let i = 0; i < data.value.columns.length; i++) {
        const column = data.value.columns[i]
        ctx.font = `${14 * pixelRatio}px bold serif`

        ctx.fillText(column.title, i * cellWidth + padding, cellHeight)
    }

    //画表格
    for (let i = 0; i < data.value.dataSource.length; i++) {
        const row = data.value.dataSource[i]
        for (let j = 0; j < data.value.columns.length; j++) {
            const column = data.value.columns[j]
            ctx.font = `${14 * pixelRatio}px serif`
            ctx.fillText(row[column.key], j * cellWidth + padding, (i + 1) * cellHeight + cellHeight)
        }
    }
    ctx.closePath()
})
//
</script>

<style>
canvas {
    background-color: #fff;
}
</style>
