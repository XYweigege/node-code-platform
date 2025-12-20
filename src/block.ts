import ImageBlock from './blocks/ImageBlock.vue'
import QuoteBlock from './blocks/QuoteBlock.vue'
import type { App } from 'vue'

type BlockMeta = {
    type: string
    material: any
}
type BlockMap = Record<string, BlockMeta>
//定义物料
const blocks = [
    {
        type: 'image',
        material: ImageBlock
    },
    {
        type: 'quote',
        material: QuoteBlock
    }
]
const blockMap = blocks.reduce((map, block) => {
    map[block.type] = {
        type: block.type,
        material: block.material
    }
    return map
}, {} as Record<string, BlockMeta>)

//写法一

//使用inject("blockMap")获取
// 在模板中使用$blockMap 获取
export const createBlocks = (app: App<Element>) => {
    //app.use(createBlocks) //注册物料块插件 ,createBlocks自己会调用

    //提供给vue的所有后代子元素使用
    app.provide<BlockMap>('blocks', blockMap)
    //绑定到vue的全局属性上
    app.config.globalProperties.$blockMap = blockMap
}
//写法二：
//app.use(createBlocks()) //注册物料块插件 ,createBlocks自己会调用
export const createBlocks2 = () => {
    return {
        install(app: App<Element>) {
            //提供给vue的所有后代子元素使用
            app.provide<BlockMap>('blocks', blockMap)
            //绑定到vue的全局属性上
            app.config.globalProperties.$blockMap = blockMap
        }
    }
}

//写法三：
//app.use(createBlocks3)
export const createBlocks3 = {
    install(app: App<Element>) {
        //提供给vue的所有后代子元素使用
        app.provide<BlockMap>('blocks', blockMap)
        //绑定到vue的全局属性上
        app.config.globalProperties.$blockMap = blockMap
    }
}

export default blocks
