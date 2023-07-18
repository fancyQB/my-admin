<template>
  <upload-excel :onSuccess="onSuccess"></upload-excel>
</template>

<script setup>
import { useRouter } from 'vue-router'

import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

import UploadExcel from '@/components/UploadExcel'
import { USER_RELATIONS, formatDate } from './utils'
import { userBatchImport } from '@/api/user-manage'

const router = useRouter()
const i18n = useI18n()
/**
 * 数据解析成功之后的回调
 */
const onSuccess = async ({ results }) => {
  const updateData = generateData(results)
  await userBatchImport(updateData)
  ElMessage.success({
    message: results.length + i18n.t('msg.excel.importSuccess'),
    type: 'success'
  })
  router.push('/user/manage')
}
/**
 *  筛选数据
 */
const generateData = (result) => {
  if (!result) return
  const ret = []
  result.forEach((items) => {
    const tempObj = {}
    for (const key in items) {
      if (USER_RELATIONS[key] === 'openTime') {
        tempObj[USER_RELATIONS[key]] = formatDate(items[key])
      } else {
        tempObj[USER_RELATIONS[key]] = items[key]
      }
    }
    ret.push(tempObj)
  })
  return ret
}
</script>

<style lang="scss" scoped></style>
