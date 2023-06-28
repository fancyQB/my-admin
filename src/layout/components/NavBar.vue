<template>
  <div class="navbar">
    <hamburger class="hamburger-container"></hamburger>
    <breadcrumb class="breadcrumb-container" :routes="breadcrumbRoutesData"></breadcrumb>
    <div class="right-menu">
      <!-- 国际化 -->
      <lang-select class="right-menu-item hover-effect"></lang-select>
      <!-- 头像 -->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar
            shape="square"
            :size="40"
            :src="$store.getters.userInfo.avatar"
          ></el-avatar>
          <!-- <i class="el-icon-s-tools"></i> -->
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item>{{ $t('msg.navBar.home') }}</el-dropdown-item>
            </router-link>
            <a target="_blank" href="">
              <el-dropdown-item>{{ $t('msg.navBar.course') }}</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click="handleLogout">
              {{ $t('msg.navBar.logout') }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { watch, ref } from 'vue'
import { useRoute } from 'vue-router'

import hamburger from '@/components/hamburger'
import breadcrumb from '@/components/breadcrumb'
import LangSelect from '@/components/LangSelect'

const store = useStore()
// 登出
const handleLogout = () => {
  store.dispatch('user/logout')
}

// 面包屑导航
const route = useRoute()
const breadcrumbRoutesData = ref([])
const getBreadcrumbRouteData = () => {
  breadcrumbRoutesData.value = route.matched.filter(
    item => item.meta.icon && item.meta.title
  )
}
watch(
  route,
  () => {
    getBreadcrumbRouteData()
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
@import '@/styles/variables.module.scss';
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background-color: #ffffff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}
.breadcrumb-container {
  float: left;
}
.hamburger-container {
  float: left;
  line-height: 50px;
  height: 100%;
  cursor: pointer;
  transition: background $sideBarDuration;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
}
.right-menu {
  display: flex;
  align-items: center;
  float: right;
  padding-right: 16px;

  ::v-deep .right-menu-item {
    display: inline-block;
    padding: 0 18px 0 0;
    font-size: 24px;
    color: #5a5e66;
    vertical-align: text-bottom;
    &:hover-effect {
      cursor: pointer;
    }
  }
  ::v-deep .avatar-container {
    cursor: pointer;
    .avatar-wrapper {
      margin-top: 5px;
      position: relative;
    }
    .el-avatar {
      --el-avatar-background-color: none;
      margin-right: 12px;
    }
  }
}
</style>
