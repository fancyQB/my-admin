<template>
  <div>
    <div class="logo-container">
      <el-avatar
        :size="logoHeight"
        shape="circle"
        :src="githubImage"
      ></el-avatar>
      <h1 class="logo-title" v-if="$store.getters.sidebarOpen">fancyqb</h1>
    </div>
    <el-scrollbar>
      <sidebar-menu />
    </el-scrollbar>
  </div>
</template>

<script setup>
import {} from 'vue'
import SidebarMenu from './SidebarMenu.vue'
import githubImage from '@/assets/image/github-mark-white.png'

const logoHeight = 44
</script>

<style lang="scss" scoped>
.logo-container {
  height: v-bind(logoHeight) + px;
  padding: 10px 0 22px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  :deep(.avatar) {
    font-size: 24px;
    color: pink;
  }
  :deep(.el-avatar) {
    --el-avatar-background-color: black;
  }
  .logo-title {
    margin-left: 10px;
    color: #fff;
    line-height: 50px;
    font-weight: 600;
    font-size: 16px;
    white-space: nowrap;
  }
}
</style>
