<template>
  <component
    :is="resolvedTag"
    v-bind="tagProps"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
/**
 * SmoothDndDraggable 组件 
 * 基于 smooth-dnd 库实现的可拖拽元素组件  功能 ：标记可拖拽元素，使其能被容器识别并支持拖拽操作。
 * 用于包裹需要拖拽的内容 
关键特性 ：
- 🎯 动态标签 ：通过 tag 属性支持自定义可拖拽元素标签
- 🎨 样式集成 ：自动添加 .smooth-dnd-draggable-wrapper 类名
- 📦 轻量级 ：专注于标记可拖拽元素的核心功能
工作流程 ：

1. 组件接收自定义标签配置
2. 通过 getTagProps 工具函数添加拖拽所需的 CSS 类
3. 渲染动态标签并应用属性
4. 提供插槽用于放置实际内容
 */

// 导入 Vue 组合式 API
import { computed } from 'vue'
// 导入 smooth-dnd 常量
import { constants } from 'smooth-dnd'
// 导入工具函数
import { getTagProps, validateTagProp } from './utils'

/**
 * 组件属性定义
 */
const props = defineProps({
  /**
   * 渲染标签
   * @default 'div'
   */
  tag: {
    validator: validateTagProp,
    default: 'div' // 默认使用 div 标签
  }
})

/**
 * 定义组件名称
 */
defineOptions({
  name: 'SmoothDndDraggable'
})

/**
 * 获取解析后的标签(如div等)
 */
const resolvedTag = computed(() => props.tag)

/**
 * 获取标签属性
 */
const tagProps = computed(() => {
  // 获取标签属性，添加 smooth-dnd 的包装类
  return getTagProps({ $props: props }, constants.wrapperClass)
}) 
 
</script>

<style scoped>
 
</style>