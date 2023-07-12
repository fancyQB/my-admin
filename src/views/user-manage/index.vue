<template>
  <div class="user-manage-container">
    <!-- 头部 导入导出 execel -->
    <div class="header">
      <el-card>
        <div class="button-container">
          <el-button
            type="primary"
            class="export-button"
            @click="handleExcelImport"
            >{{ $t('msg.excel.importExcel') }}</el-button
          >
          <el-button type="success">{{
            $t('msg.excel.exportExcel')
          }}</el-button>
        </div>
      </el-card>
    </div>
    <!-- 员工管理信息表 -->
    <el-card>
      <el-table :data="totalData" border style="width: 100%">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column
          sortable
          prop="username"
          :label="$t('msg.excel.name')"
        ></el-table-column>
        <el-table-column
          prop="mobile"
          :label="$t('msg.excel.mobile')"
        ></el-table-column>
        <el-table-column :label="$t('msg.excel.avatar')" align="center">
          <template v-slot="{ row }">
            <el-image
              class="avatar"
              :src="row.avatar"
              :preview-src-list="[row.avatar]"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column :label="$t('msg.excel.role')">
          <template #default="{ row }">
            <div v-if="row.role && row.role.length > 0">
              <el-tag v-for="item in row.role" :key="item.id" size="mini">{{
                item.title
              }}</el-tag>
            </div>
            <div v-else>
              <el-tag size="mini">{{ $t('msg.excel.defaultRole') }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="openTime" :label="$t('msg.excel.openTime')">
          <template #default="{ row }">
            {{ $filters.dateFormt(row.openTime) }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('msg.excel.action')"
          fixed="right"
          width="260"
        >
          <template #default="{ row }">
            <el-button type="primary" size="mini">{{
              $t('msg.excel.show')
            }}</el-button>
            <el-button type="info" size="mini">{{
              $t('msg.excel.showRole')
            }}</el-button>
            <el-button type="danger" size="mini" @click="onRemoveClick(row)">{{
              $t('msg.excel.remove')
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页条 -->
    </el-card>
    <el-pagination
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      v-model:current-page="page"
      :page-sizes="[2, 5, 10, 20]"
      v-model:page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script setup>
import { ref, onActivated } from 'vue'
import { useRouter } from 'vue-router'
import { getUserManageList, deleteUser } from '@/api/user-manage'
import { watchSwitchLang } from '@/utils/i18n'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()

// 数据相关
const totalData = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(10)

// 获取数据的方法
const getListData = async () => {
  const result = await getUserManageList({
    page: page.value,
    size: size.value
  })
  totalData.value = result.list
  total.value = result.total
  console.log(result)
}
getListData()

// 分页相关
const handleSizeChange = (currentSize) => {
  size.value = currentSize
  getListData()
}

const handleCurrentChange = (currentPage) => {
  page.value = currentPage
  getListData()
}

// excel btn 导入
const route = useRouter()
const handleExcelImport = () => {
  route.push('/user/import')
}

// 删除按钮点击事件
const onRemoveClick = (row) => {
  ElMessageBox.confirm(
    i18n.t('msg.excel.dialogTitle1') +
      row.username +
      i18n.t('msg.excel.dialogTitle2'),
    { type: 'warning' }
  ).then(async () => {
    await deleteUser(row._id)
    ElMessage.success(i18n.t('msg.excel.removeSuccess'))
    // 重新渲染
    getListData()
  })
}

// 添加语言监听
watchSwitchLang(getListData)
// 处理导入用户数据不重新加载问题
onActivated(getListData)
</script>

<style lang="scss" scoped>
.user-manage-container {
  .button-container {
    text-align: right;
  }
  ::v-deep .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .pagination {
    text-align: center;
    margin-top: 20px;
  }
}
</style>
