<template>
  <div class="upload-excel-container">
    <div class="upload-btn">
      <el-button type="primary" :loading="loading" @click="handleUpload">{{
        $t('msg.uploadExcel.upload')
      }}</el-button>
    </div>
    <input
      ref="excelUploadInput"
      type="file"
      class="excel-upload-input"
      accept=".xlsx, .xls"
      @change="handleChange"
    />
    <div
      class="drop-file"
      @drop.stop.prevent="handleDrop"
      @dragover.stop.prevent="handleDragover"
      @dragenter.stop.prevent="handleDragover"
    >
      <i class="el-icon-upload" />
      <span>{{ $t('msg.uploadExcel.drop') }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import XLSX from 'xlsx'

import { getHeaderRow, isExcel } from './utils'
import { ElMessage } from 'element-plus'

const props = defineProps({
  // 上传前回调
  beforeUpload: Function,
  onSuccess: Function
})

const loading = ref(false)
const excelUploadInput = ref(null)
// 点击 触发 文件选择器
const handleUpload = () => {
  excelUploadInput.value.click()
}
// 处理选择的文件,点击确定 触发
const handleChange = (e) => {
  const files = e.target.files
  const rawFile = files[0]
  if (!rawFile) return
  upload(rawFile)
}

/**
 * 触发上传事件
 */
const upload = (rawFile) => {
  excelUploadInput.value.value = null
  // 如果没有指定上传前回调的话
  if (!props.beforeUpload) {
    readerData(rawFile)
    return
  }
  // 如果指定上传前回调, 返回 true 才执行后续的操作
  const before = props.beforeUpload(rawFile)
  if (before) {
    readerData(rawFile)
  }
}

/**
 * 异步读取数据
 */
const readerData = (rawFile) => {
  loading.value = true
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      // 1. 获取解析到的数据
      const data = e.target.result
      // 2. 利用 XLSX 对数据进行解析
      const workbook = XLSX.read(data, { type: 'array' })
      // 3. 获取第一张表格(工作簿)名称
      const firstSheetName = workbook.SheetNames[0]
      // 4. 只读取第一张表格的数据
      const worksheet = workbook.Sheets[firstSheetName]
      // 5. 解析数据表头
      const header = getHeaderRow(worksheet)
      // 6. 解析数据题
      const results = XLSX.utils.sheet_to_json(worksheet)
      // 7. 传入解析之后的数据
      generateData({ header, results })
      // 8. loading 处理
      loading.value = false
      // 9. 异步完成
      resolve()
    }
    // 启动读取指定的 Blob 或 File 内容
    reader.readAsArrayBuffer(rawFile)
  })
}

/**
 * 根据内容 生成数据
 */
const generateData = (excelData) => {
  props.onSuccess && props.onSuccess(excelData)
}

/**
 * 拖拽文本释放时触发
 */
const handleDrop = (e) => {
  // 上传中 就跳过
  if (loading.value) return
  const files = e.dataTransfer.files
  if (files.length !== 1) {
    ElMessage.error('有且只要一个文件')
    return
  }
  const rawFile = files[0]
  if (!isExcel(rawFile)) {
    console.log(rawFile)
    ElMessage.error('文件必须是 .xlsx, .xls, .csv 格式')
  }
  // 触发上传事件
  upload(rawFile)
}

/**
 * 拖拽悬停时触发
 */
const handleDragover = (e) => {
  e.dataTransfer.dropEffect = 'copy'
}
</script>

<style lang="scss" scoped>
.upload-excel-container {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  .excel-upload-input {
    display: none;
    z-index: -9999;
  }
  .upload-btn,
  .drop-file {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 350px;
    height: 160px;
    border: 1px dashed rgb(187, 187, 187);
    text-align: center;
  }
  .drop-file {
    display: flex;
    flex-direction: column;
    color: rgb(187, 187, 187);
    span {
      margin-top: 5px;
    }
  }
}
</style>
