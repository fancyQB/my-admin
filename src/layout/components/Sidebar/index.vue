<template>
  <div>
    <div class="logo-container">
      <el-avatar
        :size="logoHeight"
        shape="square"
        src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"
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

const logoHeight = 44
</script>

<style lang="scss" scoped>
.logo-container {
  height: v-bind(logoHeight) + px;
  padding: 10px 0 22px 0;
  display: flex;
  justify-content: center;
  align-items: center;
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
