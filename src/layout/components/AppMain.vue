<template>
  <div class="app-main">
    <router-view v-slot="{ Component, route}">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <component :is="Component" :key="route.path"></component>
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

import { isTags } from '@/utils/tags'
import { generateTitle } from '@/utils/i18n'

const getTitle = (route) => {
  let title = ''
  if (!route?.meta?.title) {
    console.log(route)
    const pathArr = route.fullPath.split('/')
    title = pathArr[pathArr.length - 1]
  } else {
    title = generateTitle(route.meta.title)
  }
  return title
}
const route = useRoute()
const store = useStore()
watch(route, (to, from) => {
  if (!isTags(to.path)) return
  const { fullPath, meta, name, params, path, query } = to
  store.commit('app/addTagViewList', {
    fullPath,
    meta,
    name,
    params,
    path,
    query,
    title: getTitle(to)
  })
}, { immediate: true })

watch(() => store.getters.language, () => {
  const tempViewList = []
  store.getters.tagsViewList.forEach(route => {
    route.title = getTitle(route)
    tempViewList.push(route)
  })
  store.commit('app/changeTagsView', tempViewList)
})
</script>

<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - 93px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 104px 20px 20px 20px;
  box-sizing: border-box;
}
</style>
