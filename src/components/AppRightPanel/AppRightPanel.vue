<script setup lang="ts">
import { useField, useForm, defineRule } from 'vee-validate'
import { watch } from 'vue'
const { values, errors } = useForm() //通过这个hook 可以很方便做表单状态管理
const { value: title, handleChange: handleTitleChange } = useField('title', 'required')
const { value: gender } = useField('gender')

defineRule('required', (value: any) => {
    if (!value || !value.length) {
        return '该字段为必填项'
    }
    return true
})

defineRule('email', (value: any) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
        return '请输入有效的电子邮件地址'
    }
    return true
})

watch(values, newValue => {
    console.log(newValue)
})
</script>

<template>
    <div>
        {{ errors }}
        <input v-model="title" :change="handleTitleChange" type="text" />
        <select v-model="gender">
            <option value="1">option1</option>
            <option value="2">option2</option>
        </select>
    </div>
</template>

<style scoped></style>
