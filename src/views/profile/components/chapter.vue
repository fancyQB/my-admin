<template>
  <el-timeline>
    <el-timeline-item
      placement="top"
      v-for="item in chapters"
      :timestamp="item.timestamp"
      :key="item.id"
    >
      <el-card>{{ item.content }}</el-card>
    </el-timeline-item>
  </el-timeline>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  chapters: {
    type: Object,
    required: true
  }
})
console.log(props.chapters)
</script>

<style lang="scss" scoped></style>
