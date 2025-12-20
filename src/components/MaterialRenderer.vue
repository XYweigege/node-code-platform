<script setup lang="ts">
// import { inject } from 'vue'

import blocks from '../mock/blocks'

// const blockMap = inject('blockMap') as Record<string, any>
// console.log(blockMap)
console.log(blocks)
</script>

<template>
    <div v-for="block in blocks" :key="block.id">
        <component :is="$blockMap[block.type].material" />
    </div>
</template>

<style scoped></style>
