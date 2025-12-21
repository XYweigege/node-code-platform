<template>
  <component 
    :is="resolvedTag" 
    ref="containerRef" 
    v-bind="tagProps" 
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
/**
 * SmoothDnDContainer 组件
 * 基于 smooth-dnd 库实现的拖拽容器组件  功能 ：作为拖拽容器，管理内部可拖拽元素的行为和事件。
 * 提供拖拽排序、拖拽放置等功能
关键特性 ：
- 🎯 动态标签 ：通过 tag 属性支持自定义容器标签（默认使用 div ）
- 🎮 拖拽配置 ：支持设置拖拽方向、动画时长、拖拽行为等
- 📢 事件系统 ：提供 drag-start 、 drag-end 、 drop 等事件回调
- 🔧 自定义选择器 ：支持配置拖拽手柄和非拖拽区域
- 📦 放置逻辑 ：可配置拖拽出容器外是否移除元素
工作流程 ：
1. 组件挂载时初始化 smooth-dnd 容器实例
2. 绑定各种拖拽事件处理器
3. 接收并处理拖拽配置选项
4. 提供插槽用于放置可拖拽元素
5. 组件卸载时清理资源
 */

// 导入类型定义
import type { SmoothDnD } from 'smooth-dnd'
// 导入 smooth-dnd 核心库和拖放处理器
import { dropHandlers, smoothDnD } from 'smooth-dnd'
// 导入 Vue 组合式 API
import { ref, computed, onMounted, onUnmounted, defineProps, defineEmits } from 'vue'

// 导入工具函数
import { getTagProps, validateTagProp } from './utils'

/**
 * smooth-dnd 全局配置
 * 设置拖放处理器为 React 风格的处理器
 * 禁用子元素自动包裹
 */
 smoothDnD.dropHandler = dropHandlers.reactDropHandler().handler     

smoothDnD.wrapChild = false

/**
 * 事件映射
 * 将组件事件映射到 smooth-dnd 库的事件处理器名称
 */
// 事件类型定义
type EventKey = 'drag-start' | 'drag-end' | 'drop' | 'drag-enter' | 'drag-leave' | 'drop-ready'

// 事件映射对象
const eventEmitterMap: Record<EventKey, string> = {
  'drag-start': 'onDragStart',
  'drag-end': 'onDragEnd',
  drop: 'onDrop',
  'drag-enter': 'onDragEnter',
  'drag-leave': 'onDragLeave',
  'drop-ready': 'onDropReady'
}

/**
 * 组件属性定义
 */
const props = defineProps({
  /** 拖拽方向：vertical（垂直）或 horizontal（水平） */
  orientation: { type: String, default: 'vertical' },
  /** 拖拽出容器外是否移除元素 */
  removeOnDropOut: { type: Boolean, default: false },
  /** 是否启用自动滚动 */
  autoScrollEnabled: { type: Boolean, default: true },
  /** 动画持续时间（毫秒） */
  animationDuration: { type: Number, default: 250 },
  /** 拖拽行为：move（移动）、copy（复制）或 drop-zone（放置区域） */
  behaviour: String,
  /** 拖拽组名称，同一组内的元素可以互相拖拽 */
  groupName: String,
  /** 拖拽手柄选择器，只有点击该元素才能开始拖拽 */
  dragHandleSelector: String,
  /** 非拖拽区域选择器，点击该区域不会开始拖拽 */
  nonDragAreaSelector: String,
  /** 锁定轴：x 或 y，限制拖拽方向 */
  lockAxis: String,
  /** 拖拽时添加的 CSS 类名 */
  dragClass: String,
  /** 放置时添加的 CSS 类名 */
  dropClass: String,
  /** 拖拽开始延迟时间（毫秒） */
  dragBeginDelay: Number,
  /** 获取拖拽元素数据的回调函数 */
  getChildPayload: Function,
  /** 是否为放置添加动画的回调函数 */
  shouldAnimateDrop: Function,
  /** 是否接受放置的回调函数 */
  shouldAcceptDrop: Function,
  /** 获取拖拽幽灵元素父容器的回调函数 */
  getGhostParent: Function,
  /** 放置占位符配置 */
  dropPlaceholder: [Object, Boolean],
  /** 渲染标签，默认 div */
  tag: {
    validator: validateTagProp,
    default: 'div'
  }
})

/**
 * 组件事件定义
 */
const emit = defineEmits<{
  'drop': [props: any],
  'drag-start': [props: any],
  'drag-end': [props: any],
  'drag-enter': [props: any],
  'drag-leave': [props: any],
  'drop-ready': [props: any]
}>()

/**
 * 组件内部状态
 */
// 容器元素引用
const containerRef = ref<HTMLElement | null>(null)
// smooth-dnd 容器实例
const container = ref<SmoothDnD | null>(null)

/**
 * 计算属性
 */
// 解析后的标签属性
const tagPropsResult = computed(() => getTagProps({
  ...props,
  $props: props
}))

// 动态标签名
const resolvedTag = computed(() => tagPropsResult.value.value)

// 标签属性
const tagProps = computed(() => tagPropsResult.value.props)

/**
 * 生命周期钩子
 */
// 组件挂载时
onMounted(() => {
  if (!containerRef.value) return
  
  // 合并属性为 smooth-dnd 配置选项
  const options: any = Object.assign({}, props)
  
  // 绑定事件处理器
  for (const key in eventEmitterMap) {
    const eventKey = key as EventKey
    options[eventEmitterMap[eventKey]] = (eventProps: any) => {
      emit(eventKey, eventProps)
    }
  }
  
  // 获取容器元素
  const containerElement = containerRef.value
  // 初始化 smooth-dnd 容器实例
  container.value = smoothDnD(containerElement, options)
})

// 组件卸载时
onUnmounted(() => {
  if (container.value) {
    try {
      // 销毁 smooth-dnd 容器实例
      container.value.dispose()
    } catch {
      // 忽略错误
    }
  }
})
</script>

<style scoped>
/* 可以在这里添加组件特定样式 */
</style>