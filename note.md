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

# 基础框架实现

## 插件化机制

因为无法预料 物料种类的具体表现

### 举个例子

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
