/**
 * SmoothDndDraggable 组件
 * 基于 smooth-dnd 库实现的可拖拽元素组件
 * 用于包裹需要拖拽的内容
 */

// 导入 smooth-dnd 常量
import { constants } from 'smooth-dnd'
// 导入 Vue 组件定义 API
import { defineComponent, h } from 'vue'

// 导入工具函数
import { getTagProps, validateTagProp } from './utils'

export const SmoothDndDraggable = defineComponent({
    name: 'SmoothDndDraggable',
    
    /**
     * 组件属性定义
     */
    props: {
        /**
         * 渲染标签
         * @default 'div'
         */
        tag: {
            validator: validateTagProp,
            default: 'div' // 默认使用 div 标签
        }
    },
    
    /**
     * 组件渲染函数
     * @returns VNode
     */
    render() {
        // 获取标签属性，添加 smooth-dnd 的包装类
        const tagProps = getTagProps(this, constants.wrapperClass)
        
        // 渲染组件
        return h(
            tagProps.value,                   // 动态标签
            Object.assign({}, tagProps.props), // 标签属性
            this.$slots.default?.()          // 插槽内容
        )
    }
})
