# 无代码可视化平台实战

## 架构设计

我们都会选用 vite 创建，在基础架子上面做修改

使用 `pnpm create vite vue-action --template vue-ts`

### 相关技术选择

-   打包 vite
-   技术栈 vue3 vuerouter4 pinia
-   规范化
    -   eslint
    -   prettier
    -   Stylelint
    -   cspell
    -   commitlint
    -   husky

### 规范约束

eslint
styleint
spellcheck

### 提交检查

借助 git hook
pre-commit 提交前

-   在提交前做代码的校验， (pre-commit)
-   在提交的时候做 commit message 校验 (commit-msg)

初始化 husky
`npx husky init`

1. 提交代码时候检测，但是防不住 同事硬推
2. 其实在 CICD 的时候 又有卡点。这里可以严格限制住

QA:
安装 husky，安装后需要配置 prepare 钩子
一、prepare 什么时候会执行？
npm install
npm publish

二、为什么 Husky 一定要用 prepare？
在 Husky 的本质是： .git/hooks/ 目录里创建并接管 Git Hook
但 .git 目录：
❌ 不会被提交到 Git
❌ clone 下来是空的

所以必须在 “每个开发者本地” 执行一次：npx husky install

如果你不写 prepare：
👉 新同事 clone 项目后 commit 不生效、lint 不跑、spellcheck 不跑

当跑到 npm 的 prepare 钩子的时候，执行的不是 npm husky install 也不是 npx husky install
不是 npm 命令，也不是 npx，而是 husky CLI 本身。

#### 提交信息 规范化

安装 commitlint ，安装 cz-git
去 cz-git 上面找提交信息模板,粘贴进去 commitlint.config.js
在 husky 下面 新建一份 commit-msg 的钩子
写上一段固定写法的:
#!/usr/bin/env sh
npx commitlint --edit $1

"commitlint": "19.3.0",
"commitizen": "4.2.4",  
"cz-git": "1.9.3",
"@commitlint/config-conventional": "19.2.2"

commitizen / cz-git：负责“怎么写 commit”
commitlint：负责“你写的 commit 合不合法”
@commitlint/config-conventional：commitlint 的规则集

流程：
你执行：npm run commit
↓
git-cz（commitizen + cz-git）
↓
交互式生成 commit message
↓
git commit -m "feat: xxx"
↓
Husky 触发 commit-msg hook
↓
commitlint 校验 commit message
↓
通过 ✅ / 失败 ❌

-   QA:
    "commit": "git-cz" 给你一个“统一入口”，让你用 npm run commit 来提交代码
    git-cz 是 commitizen 提供的 CLI 命令

从技术上讲，如果你 平时只想用 git commit -m "xxx" 写提交，确实 不一定非要装 cz-git 和 commitizen。
原因很简单：
commitizen + cz-git 的作用
只是提供一个 交互式、引导式提交，帮你写符合 Conventional Commits 的 message。
它不参与强制校验，只是“写之前的辅助工具”。
commitlint + husky 才是强制的
只要你的项目里有 husky 的 commit-msg hook 和 commitlint，即使你不装 commitizen/cz-git，
直接用 git commit -m "xxx" 也会被校验。
如果 message 不规范，commit 会被阻止

自定义 eslint 规则，参考 antfu 的

## 基础框架实现

-   了解插件化机制的实现
-   掌握表单检验与表单状态管理

-   掌握插件化设计思想
-   掌握动态表单设计思想及表单校验规则
-   掌握物料配置核心实现思路

### 插件化机制--微内核

因为无法预料 物料种类的具体表现
物料的加载我们选用插件化机制实现，插件化机制在前端应用或者框架中的应用非常广泛。不论是业务开发还是框架开发，我们都能见到插件化设计。比如 webpack 基于 tappable 实现的插件化。

#### 举个例子

```js
//插件化机制的例子
/**
 * 这个是插件化机制，参考vue的插件化机制
 * app.use(Router) * app.use(Store)
 *
 */
const mulOperation = {
    name: 'MUL',
    operation: (a: number, b: number) => a * b
}

const divOperation = {
    name: 'DIV',
    operation: (a: number, b: number) => a / b
}
const addOperation = {
    name: 'ADD',
    operation: (a: number, b: number) => a + b
}

const subOperation = {
    name: 'SUB',
    operation: (a: number, b: number) => a - b
}
type Operation = {
    name: string
    operation: (a: number, b: number) => number
}
/**
 * 插件基座
 */
class Calculate {
    operations: Operation[] = []
    constructor() {
        this.operations = []
    }
    use(op: Operation) {
        this.operations.push(op)
    }

    calculate(a: number, b: number, operationName: string) {
        const operation = this.operations.find(op => op.name === operationName)
        if (operation) {
            return operation?.operation(a, b)
        }
        return NaN
    }
}

const calculator = new Calculate()
// 添加加法操作
calculator.use(addOperation)

//添加乘法操作
calculator.use(mulOperation)

calculator.use(subOperation)

calculator.use(divOperation)

//计算
console.log(calculator.calculate(2, 3, 'ADD')) // 6

//添加自定义插件
calculator.use({
    name: 'EXP',
    operation: (a: number, b: number) => Math.pow(a, b)
})
console.log(calculator.calculate(2, 3, 'EXP'))
```

```js

通过上面的例子，从插件的角度可以分成几个部分：

-   程序主体（Program），我们通常也称之为插件底座，即上例中的 Calculator；
-   插件接口声明（Plugin Interface），即上例中的 Plugin；
-   插件实现（Plugin Implementation），即 AddPlugin，SubtractPlugin，MultiplicatiPlugin；

import { App } from 'vue'
const heyiPlugin = {
    install(app: App<Element>) {
        app.provide('heyi', 'heyi from provide') //提供给vue所有后代子元素使用
        app.config.globalProperties.$heyi = 'heyi' //绑定到vue的全局属性上
    }
}
app.use(heyiPlugin) //注册插件。
```

插件化机制用途非常广泛：

1. 表单校验，校验规则就可以是插件化的，rules: [{required: true}, {max: 20}, {min: 10}]
2. webpack、vue、pinia 这些框架，他的能力拓展都是通过插件化实现的

### SmoothDnd 实现编排

有了物料，我们就可以在编辑器中使用对应物料进行业务页面组装，因此我们需要封装一个物料编排编辑器，对于众多物料，我们首先就会想到需要使用策略模式实现不同物料的初始渲染。

```vue
<component :is="xxx" />
```

### vee-validate 表单校验与管理

### 表单生成器的思路 1 2

看到 59 分
图表渲染器我们需要支持如下场景：

1. 基础图表，直接使用 echarts 进行封装，这里我们简单挑一个 echarts 图表做示例
2. 基于 zrender 实现自定义可视化内容 ps(zrender 是 echarts 的底层库)
3. 基于 d3 实现地图可视化

本地持久化场景使用 indexedDB，用第三方库叫 dexie 方便去使用 indexDB

### 第三节课重点，图表渲染器，图表转换器

基于后端数据返回通用化，负责插件化机制封装图表数据转换器
https://chatgpt.com/c/694c00b7-a0e8-8322-9d41-543707a9bc4b //参考

```js
┌────────────────────────────────┐
│        后端通用图表数据结构        │
└────────────────────────────────┘
                 │
                 ▼
┌────────────────────────────────┐
│     Chart Transformer（数据转换层） │
│  - 插件化 Transformer 注册机制      │
│  - 多图表类型适配逻辑              │
│  - 生成标准 ECharts Option         │
└────────────────────────────────┘
                 │
       标准化 ECharts Option
                 │
                 ▼
┌────────────────────────────────┐
│    Chart Renderer（渲染层）       │
│  Vue 组件封装 + ECharts Core     │
│  - 自动主题                     │
│  - 自动 Resize                  │
│  - 插件化按需加载（use([...])） │
└────────────────────────────────┘
                 │
                 ▼
┌────────────────────────────────┐
│            页面展示              │
└────────────────────────────────┘

```

```txt
EchartChartRenderer.vue：
接收 option（来自 Transformer）

自动 Render（VChart）

自动注入主题（dark/light）

ECharts 插件按需加载（CanvasRenderer, BarChart, LineChart...）

支持响应式（autoresize
```

```tsx
import React, { useMemo } from 'react'
import ReactECharts from 'echarts-for-react'
import * as echarts from 'echarts/core'

// 按需引入渲染器
import { CanvasRenderer } from 'echarts/renderers'

// 图表类型
import { LineChart, BarChart, PieChart } from 'echarts/charts'

// 组件
import { GridComponent, TooltipComponent, TitleComponent, LegendComponent } from 'echarts/components'

// 注册（等价于 vue: use([...])）
echarts.use([CanvasRenderer, LineChart, BarChart, PieChart, GridComponent, TooltipComponent, TitleComponent, LegendComponent])

// 引入你的 transformer
import { chartTransformer } from '../transformers/chart'

interface ChartRendererProps {
    type: string
    data: any
    style?: React.CSSProperties
}

const ChartRenderer: React.FC<ChartRendererProps> = ({ type, data, style }) => {
    const option = useMemo(() => {
        return chartTransformer.transform({
            type,
            ...data
        })
    }, [type, data])

    return <ReactECharts option={option} theme="dark" style={style || { height: 400 }} />
}

export default ChartRenderer
```

构建企业级 Chart Transformer 图表转换引擎，基于插件化架构实现 15+ 图表类型（柱状图、折线图、饼图、桑基图、地图、热力图、K 线图等）自动数据适配。
在 React 中封装通用图表渲染器，实现 数据解析层与图表渲染层完全解耦，新增图表无需改动业务代码，大幅提升图表扩展性与可维护性。

#### 出码功能

出 json
出组件源代码

canvas 是位图，不够清晰  
svg 是矢量图  
位图需要处理缩放问题 才能变得清晰，很多图画 *2*3 倍数

首选获取到设备的 像素比 window.devicePixelRatio

看到 1 小时 37 分
