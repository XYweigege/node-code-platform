<script setup lang="ts">
import { ref, toRaw } from 'vue'

import blocks from '../mock/blocks'
import { SmoothDndDraggable } from './SmoothDnd/SmoothDndDraggable'
import { SmoothDnDContainer } from './SmoothDnd/SmoothDndContainer'
import type { DropResult } from 'smooth-dnd'
import { arrayMove } from '../utils/array'
// const blockMap = inject('blockMap') as Record<string, any>
// console.log(blockMap)
const blocksData = ref(blocks)
console.log(blocksData)

/**
 * 处理拖拽结果并返回新的数组（不修改原数组引用）。
 *
 * 说明：该函数用于将拖拽产生的 `dragResult` 应用到数组 `arr` 上，返回一个新的数组副本。
 * - 当 `addedIndex === null` 时，表示没有可用的插入位置，直接返回当前副本。
 * - 当 `addedIndex !== null` 且 `removedIndex === null` 时，表示这是一次从外部来源的添加（payload 为要插入的项），
 *   需要在目标位置插入 `payload`。
 * - 当 `addedIndex !== null` 且 `removedIndex !== null` 时，表示这是一次在同一列表内的移动，使用 `arrayMove` 执行移动并返回结果。
 *
 * 泛型说明：`T` 为数组元素类型，函数签名保持通用以支持任意元素类型的数组。
 *
 * @param arr 原数组（或其副本）
 * @param dragResult smooth-dnd 返回的拖拽结果对象，包含 `removedIndex`、`addedIndex`、`payload` 等字段
 * @returns 应用拖拽后的新数组
 */
const applyDrag = <T extends any[]>(arr: T, dragResult: DropResult) => {
    const { removedIndex, addedIndex, payload } = dragResult
    console.log(dragResult)
    const result = [...arr]
    debugger
    if (addedIndex === null) return result

    // 添加：从外部拖入元素（列表外部来源），在目标位置插入 payload
    if (addedIndex !== null && removedIndex === null) {
        result.splice(addedIndex, 0, payload)
    }

    // 移动：在同一列表内移动元素，使用 arrayMove 返回新的数组副本
    if (addedIndex !== null && removedIndex !== null) {
        const res = arrayMove(result, removedIndex, addedIndex)
        console.log(res)
        return res
    }
    console.log(result, 'result')
    return result
}
</script>

<template>
    <div class="matirelrender">
        <SmoothDnDContainer group-name="blocks" @drop="blocksData = applyDrag(toRaw(blocksData), $event)">
            <SmoothDndDraggable v-for="block in blocksData" :key="block.id">
                <component :is="$blockMap[block.type].material" />
            </SmoothDndDraggable>
        </SmoothDnDContainer>
    </div>
</template>

<style scoped>
.matirelrender {
    width: 100%;
}
</style>
