import { createApp } from 'vue'
import type { App } from 'vue '
import './style.css'
import AppElement from './App.vue'
import { createBlocks } from './block'

const app = createApp(AppElement)

const heyiPlugin = {
    install(app: App<Element>) {
        app.provide('heyi', 'heyi from provide') //提供给vue所有后代子元素使用
        app.config.globalProperties.$heyi = 'heyi' //绑定到vue的全局属性上
    }
}
app.use(heyiPlugin) //注册插件。

app.use(createBlocks) //注册物料块插件 ,createBlocks自己会调用
app.mount('#app')
