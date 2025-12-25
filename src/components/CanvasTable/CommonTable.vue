<template>
    <div>
        <!-- 普通table -->
        <!-- table数据量大，该怎么做 -->
        <!--
           虚拟表格  滚动快有白边.
           分页 
           canvas表格 因为画布性能好,性能瓶颈取决于你的绘图算法
        -->
    </div>
    <div>
        <table>
            <thead>
                <tr>
                    <td v-for="column in data.columns" :key="column.key">{{ column.title }}</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="record in data.dataSource" :key="record.key">
                    <td v-for="column in data.columns" :key="column.key">
                        {{ record[column.key] }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const data = ref({
    columns: [
        {
            title: '姓名',
            key: 'name',
            width: 100
        },
        {
            title: '年龄',
            key: 'age',
            width: 100
        }
    ],
    dataSource: Array.from({ length: 1000 }).map((item, index) => {
        return {
            key: index,
            name: `name-${index}`,
            age: Math.floor(Math.random() * 100)
        }
    })

    // [
    //     { key: 1, name: '张三', age: 18 },
    //     {
    //         key: 2,
    //         name: '李四',
    //         age: 20
    //     }
    // ]
})
console.log(data)
</script>

<style scoped>
td {
    width: 100px;
    border: 1px solid black;
}
</style>
