<script setup lang="ts">
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
</script>

<template>
    <div>Plugin demo</div>
</template>

<style scoped></style>
