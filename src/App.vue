<template>
  <router-view />
</template>

<script setup>
import { useStore } from 'vuex'
import { generateNewStyle, writeNewStyle } from '@/utils/theme'
// 刷新页面后 主题会失效 重新写入style
const store = useStore()
generateNewStyle(store.getters.mainColor).then((data) => writeNewStyle(data))
</script>

<style></style>
