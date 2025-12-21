/**
 * SmoothDnDContainer 组件
 * 基于 smooth-dnd 库实现的拖拽容器组件
 * 提供拖拽排序、拖拽放置等功能
 */

// 导入类型定义
import type { SmoothDnD } from 'smooth-dnd'
// 导入 smooth-dnd 核心库和拖放处理器
import { dropHandlers, smoothDnD } from 'smooth-dnd'
// 导入 Vue 组件定义 API
import { defineComponent, h } from 'vue'

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

export const SmoothDnDContainer = defineComponent({
  name: 'SmoothDnDContainer',
  
  /**
   * 组件 setup 函数
   * 初始化组件内部状态
   */
  setup() {
    return {
      // smooth-dnd 容器实例引用
      container: null as SmoothDnD | null
    }
  },
  
  /**
   * 组件挂载时执行
   * 初始化 smooth-dnd 容器实例
   */
  mounted() {
    // 合并属性为 smooth-dnd 配置选项
    const options: any = Object.assign({}, this.$props)
    
    // 绑定事件处理器
    for (const key in eventEmitterMap) {
      const eventKey = key as EventKey
      options[eventEmitterMap[eventKey]] = (props: any) => {
        this.$emit(eventKey, props)
      }
    }
    
    // 获取容器元素
    const containerElement = this.$refs.container || this.$el
    // 初始化 smooth-dnd 容器实例
    this.container = smoothDnD(containerElement, options)
  },
  
  /**
   * 组件卸载时执行
   * 清理 smooth-dnd 容器实例
   */
  unmounted() {
    if (this.container) {
      try {
        // 销毁 smooth-dnd 容器实例
        this.container.dispose()
      } catch {
        // 忽略错误
      }
    }
  },
  
  /**
   * 组件事件定义
   */
  emits: [
    'drop',         // 拖拽放置完成时触发
    'drag-start',   // 拖拽开始时触发
    'drag-end',     // 拖拽结束时触发
    'drag-enter',   // 拖拽进入容器时触发
    'drag-leave',   // 拖拽离开容器时触发
    'drop-ready'    // 拖拽准备放置时触发
  ],
  
  /**
   * 组件属性定义
   */
  props: {
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
  },
  
  /**
   * 组件渲染函数
   */
  render() {
    // 获取标签属性
    const tagProps = getTagProps(this)
    return h(
      tagProps.value,                   // 动态标签
      Object.assign({}, { ref: 'container' }, tagProps.props), // 标签属性
      this.$slots.default?.()          // 插槽内容
    )
  }
})
