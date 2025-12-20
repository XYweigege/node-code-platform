import type { App } from 'vue'
import { defineAsyncComponent, h } from 'vue'

type BlockMeta = {
    type: string
    material: any
}
type BlockMap = Record<string, BlockMeta>
//定义物料
const blocks = [
    {
        type: 'image',
        material: defineAsyncComponent(() => import('./blocks/ImageBlock.vue'))
    },
    {
        type: 'quote',
        material: defineAsyncComponent(() => import('./blocks/QuoteBlock.vue'))
    },
    {
        type: 'chart',
        material: defineAsyncComponent(() => import('./blocks/ChartBlock.vue'))
    }
]
type ImageBlock = {
    id: string
    type: 'image'
    props: {
        url: string
    }
}

type QuoteBlock = {
    id: string
    type: 'quote'
    props: {
        content: string
    }
}
type Block = ImageBlock | QuoteBlock
/**
 * 微内核  很小的内核，先做基础功能，后续的功能靠拓展
 */
class BlockSuit {
    blocks: typeof blocks = []
    constructor() {
        this.blocks = blocks
    }
    use(block: (typeof blocks)[number]) {
        this.blocks.push(block)
    }
}
export const blockSuit = new BlockSuit()

const loadRemoteBlock = async () => {
    return new Promise(resolve => {
        fetch('https://cnodejs.org/api/v1/topics', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                return res.json()
            })
            .then(res => {
                const { content } = res?.data?.[0]
                //ReactElement
                // react vue中间，只存在对象和数组
                //h生成虚拟结点
                resolve(h('div', {}, content))
            })
    })
}

blockSuit.use({
    //动态添加物料
    type: 'text',
    material: h('button', 'hello')
})

blockSuit.use({
    //动态添加物料
    type: 'remote',
    material: defineAsyncComponent(() => loadRemoteBlock())
})

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

//#region
//写法二：
//app.use(createBlocks()) //注册物料块插件 ,createBlocks自己会调用
// export const createBlocks2 = () => {
//     return {
//         install(app: App<Element>) {
//             //提供给vue的所有后代子元素使用
//             app.provide<BlockMap>('blocks', blockMap)
//             //绑定到vue的全局属性上
//             app.config.globalProperties.$blockMap = blockMap
//         }
//     }
// }

// //写法三：
// //app.use(createBlocks3)
// export const createBlocks3 = {
//     install(app: App<Element>) {
//         //提供给vue的所有后代子元素使用
//         app.provide<BlockMap>('blocks', blockMap)
//         //绑定到vue的全局属性上
//         app.config.globalProperties.$blockMap = blockMap
//     }
// }
//#endregion

export default blocks
