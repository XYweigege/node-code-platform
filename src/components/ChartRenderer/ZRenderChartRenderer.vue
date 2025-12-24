<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as zrender from 'zrender'

const container = ref<HTMLElement | null>(null)
onMounted(() => {
    const zr = zrender.init(container.value, {
        renderer: 'svg' // 渲染引擎 为svg 或者canvas
    })

    //面向对象编程思想
    const rect = new zrender.Rect({
        shape: {
            x: 0,
            y: 0,
            width: 100,
            height: 100
        },
        style: {
            fill: 'red'
        }
    })
    const text = new zrender.Text({
        style: {
            text: 'Hello Zrender',
            x: 100,
            y: 100
        }
    })

    zr.add(text)
    zr.add(rect)

    //画一个游泳圈
    const pic = 36
    const egle = (2 * Math.PI) / 36
    const r = 20
    const o = 100
    for (let i = 0; i < pic; i++) {
        //极坐标下
        const x = o + r
        const y = o + r
        //极坐标下的图表绘制，要学三角函数
        const rect = new zrender.Rect({
            shape: {
                x: x + r * Math.cos(egle * i),
                y: y + r * Math.sin(egle * i),
                width: 10,
                height: 10
            },
            style: {
                fill: 'red'
            }
        })
        zr.add(rect)
    }

    zr.on('click', () => {
        console.log('onMounted')
    })
})
</script>

<template>
    <div class="zrender-wrapper" ref="container"></div>
</template>

<style scoped>
.zrender-wrapper {
    width: 100%;
    height: 300px;
}
</style>
