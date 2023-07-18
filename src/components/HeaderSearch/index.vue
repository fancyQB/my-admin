<template>
  <div :class="{ show: isShow }" class="header-search" >
    <svg-icon
      class-name="search-icon"
      id-name="guide-search"
      icon="search"
      @click.stop="onShowClick"
    />
    <el-select
      ref="headerSearchSelectRef"
      class="header-search-select"
      v-model="search"
      filterable
      default-first-option
      remote
      placeholder="Search"
      :remote-method="querySearch"
      @change="onSelectChange"
    >
      <el-option
        v-for="option in searchOptions"
        :key="option.item.path"
        :label="option.item.title.join('>')"
        :value="option.item"
      ></el-option>
    </el-select>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'

import Fuse from 'fuse.js'

import { filterRoutes } from '@/utils/route'
import { generateSerachData } from '@/utils/fuseData'
import { watchSwitchLang } from '@/utils/i18n'

// 控制 search 显示
const isShow = ref(false)
// el-select 实例
const headerSearchSelectRef = ref(null)
// search 相关
const search = ref('')
// 搜索结果
const searchOptions = ref([])

// 点击 icon 关闭显示输入框
const onShowClick = () => {
  if (!isShow.value) {
    isShow.value = !isShow.value
    headerSearchSelectRef.value.focus()
  } else {
    isShow.value = !isShow.value
    searchOptions.value = []
  }
}

// 点击body 关闭输入框
const onClose = () => {
  headerSearchSelectRef.value.blur()
  isShow.value = false
  searchOptions.value = []
}
// 监听 isShow 处理 点击body 关闭事件
watch(isShow, (val) => {
  if (val) {
    document.body.addEventListener('click', onClose)
  } else {
    document.body.removeEventListener('click', onClose)
  }
})

// 搜索方法
const querySearch = (query) => {
  if (query === '') {
    searchOptions.value = []
  } else {
    searchOptions.value = fuse.search(query)
  }
}
// 选中回调
const onSelectChange = (val) => {
  // 输入框显示 点中的内容
  search.value = val.title.join('>')
  router.push(val.path)
}

// 检索数据源
const router = useRouter()
let searchPool = computed(() => {
  const filterRoutesData = filterRoutes(router.getRoutes())
  return generateSerachData(filterRoutesData)
})

/**
 * 搜索库相关
 */
let fuse
const initFuse = (searchPool) => {
  fuse = new Fuse(searchPool, {
    // 是否按照优先级 排序
    shouldSort: true,
    // 匹配长度超过 这个值 才会被认为是匹配的
    minMatchCharLength: 1,
    keys: [
      {
        name: 'title',
        weight: '0.7'
      },
      {
        name: 'path',
        weight: '0.3'
      }
    ]
  })
}
initFuse(searchPool.value)

// 处理国际化
watchSwitchLang(() => {
  searchPool = computed(() => {
    const filterRoutesData = filterRoutes(router.getRoutes())
    return generateSerachData(filterRoutesData)
  })
  initFuse(searchPool.value)
})
</script>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;
  :deep(.search-icon) {
    cursor: pointer;
    font-size: 24px;
    vertical-align: middle;
  }
  .header-search-select {
    font-size: 24px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    :deep(.el-input__inner) {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
