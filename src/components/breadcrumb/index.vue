<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in routes" :key="item.path">
        <span
          class="redirect"
          v-if="routes.length - 1 !== index"
          @click="handleLink(item)"
          >{{ item.meta.title }}</span
        >
        <span class="no-redirect" v-else>{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { defineProps, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

defineProps({
  routes: {
    type: Array,
    required: true
  }
})
const router = useRouter()
const handleLink = (item) => {
  router.push(item.path)
}

// 主题替换 获取动态样式
const store = useStore()
const linkHoverColor = ref(store.getters.cssVar.menuBg)
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
  .no-redirect {
    color: #97a8be;
  }
  .redirect {
    color: #666;
    font-weight: 600;
    cursor: pointer;
  }
  .redirect:hover {
    color: v-bind(linkHoverColor);
  }
}
</style>
