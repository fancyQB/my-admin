<template>
  <div class="feature-container">
    <el-collapse  accordion>
      <el-collapse-item
        v-for="item in features"
        :title="item.title"
        :key="item.id"
        :name="item.id"
      >
        <div v-html="item.content"></div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({
  features: {
    type: Array,
    required: true
  }
})
</script>

<style lang="scss" scoped>
:deep(.el-collapse-item__header) {
  font-weight: bold;
}
:deep(.el-collapse-item) {
  a {
    color: #2d62f7;
    margin: 0 4px;
  }
}
</style>
