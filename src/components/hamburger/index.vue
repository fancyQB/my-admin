<template>
  <div class="hamburger-container" @click="toggleClick">
    <svg-icon class="hamburger" :icon="icon" id="guide-hamburger"></svg-icon>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const toggleClick = () => {
  store.commit('app/togglerSidebarOpened')
}
const icon = computed(() => {
  return store.getters.sidebarOpen ? 'hamburger-opened' : 'hamburger-closed'
})

</script>

<style lang='scss' scoped>
.hamburger-container {
  padding: 0 16px;
  .hamburger {
    vertical-align: middle;
    width: 20px;
    height: 20px;
  }
}
</style>
