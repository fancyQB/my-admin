<template>
  <div class="" @click="onToggle">
    <svg-icon
      :icon="isScreenfull ? 'exit-fullscreen' : 'fullscreen'"
      id="guide-full"
    ></svg-icon>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import screenfull from 'screenfull'

const isScreenfull = ref(false)

const onToggle = () => {
  screenfull.toggle()
}

// 监听事件
const change = () => {
  isScreenfull.value = screenfull.isFullscreen
}

onMounted(() => {
  screenfull.on('change', change)
})

onUnmounted(() => {
  screenfull.off('change', change)
})
</script>

<style lang="scss" scoped></style>
