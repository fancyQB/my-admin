<template>
  <el-dialog
    :model-value="modelValue"
    @close="closed"
    width="30%"
    :title="$t('msg.excel.title')"
  >
    <el-input
      :placeholder="$t('msg.excel.placeholder')"
      v-model="excelName"
    ></el-input>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.excel.close') }}</el-button>
        <el-button type="primary" @click="onConfirm" :loading="loading">{{
          $t('msg.excel.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineEmits, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { watchSwitchLang } from '@/utils/i18n'
import { getUserManageAllList } from '@/api/user-manage'
import { USER_RELATIONS } from './Export2ExcelConstants'

import { dateFormt } from '@/filters'

defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const i18n = useI18n()

let exportDefaultName = i18n.t('msg.excel.defaultName')
const excelName = ref('')
excelName.value = exportDefaultName
watchSwitchLang(() => {
  exportDefaultName = i18n.t('msg.excel.defaultName')
  excelName.value = exportDefaultName
})

const emits = defineEmits(['update:modelValue'])
const closed = () => {
  emits('update:modelValue', false)
}

/**
 * 导出按钮点击事件
 */
const loading = ref(false)
const onConfirm = async () => {
  loading.value = true
  const allUser = (await getUserManageAllList()).list
  console.log(allUser)
  // 导入工具包
  const excel = await import('@/utils/Export2Excel')
  const data = formatJson(USER_RELATIONS, allUser)
  excel.export_json_to_excel({
    header: Object.keys(USER_RELATIONS),
    data,
    filename: excelName.value || exportDefaultName,
    bookType: 'xlsx'
  })
  closed()
}

// 将数组 转换为二维数组 适应 export_json_to_excel 能识别的格式
const formatJson = (header, row) => {
  return row.map((item) => {
    return Object.keys(header).map((key) => {
      if (header[key] === 'role') {
        return JSON.stringify(item[header[key]].map((item) => item.title))
      }
      if (header[key] === 'openTime') {
        return dateFormt(item[header[key]], 'YYYY-MM-DD')
      }
      return item[header[key]]
    })
  })
}
</script>

<style lang="scss" scoped></style>
