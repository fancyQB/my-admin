<template>
  <div class="user-manage-container">
    <!-- 头部 导入导出 execel -->
    <div class="header">
      <el-card>
        <div class="del-container">
          <el-button type="danger" @click="removeChooseRow">删除选择</el-button>
        </div>
        <div class="excel-container">
          <el-button
            type="primary"
            class="export-button"
            @click="handleExcelImport"
            v-permission="['importUser']"
            >{{ $t('msg.excel.importExcel') }}</el-button
          >
          <el-button type="success" @click="onToExcelClick">{{
            $t('msg.excel.exportExcel')
          }}</el-button>
        </div>
      </el-card>
    </div>
    <export-to-excel v-model="exportToExcelVisible"></export-to-excel>
    <!-- 员工管理信息表 -->
    <el-card>
      <el-table :data="totalData" border style="width: 100%" @select="onSelect">
        <el-table-column type="selection" align="center"></el-table-column>
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
            <el-button
              type="primary"
              size="mini"
              @click="onShowClick(row._id)"
              >{{ $t('msg.excel.show') }}</el-button
            >
            <el-button type="info" size="mini" @click="showRoleBtn(row._id)" v-permission="['distributeRole']">{{
              $t('msg.excel.showRole')
            }}</el-button>
            <el-button type="danger" size="mini" @click="onRemoveClick(row)" v-permission="['removeUser']">{{
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
    <roles v-model="dialogVisibility" :userId="selectUserId"></roles>
  </div>
</template>

<script setup>
import { ref, onActivated, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

import { watchSwitchLang } from '@/utils/i18n'
import { getUserManageList, deleteUser } from '@/api/user-manage'
import ExportToExcel from './components/Export2Excel.vue'
import Roles from './components/roles.vue'
import router from '@/router'

const i18n = useI18n()

const selectUserId = ref('')

// 角色页面渲染开关
const dialogVisibility = ref(false)
// 角色 btn
const showRoleBtn = (id) => {
  dialogVisibility.value = true
  selectUserId.value = id
}
// 监听 dialogVisibility
watch(dialogVisibility, (val) => {
  if (!val) {
    selectUserId.value = ''
    getListData()
  }
})

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

const chooseRow = ref([])
// 删除 选中btn
const removeChooseRow = () => {
  if (!chooseRow.value.length) {
    ElMessage.warning('请先选中数据')
    return
  }
  const check = chooseRow.value.map((item) => {
    return item.username === 'admin' ||
      item.username === 'super-admin' ||
      item.username === 'test'
      ? 0
      : item
  })
  if (check.indexOf(0) > -1) {
    ElMessage.warning('选中非法的数据')
    return
  }
  ElMessageBox.confirm(
    i18n.t('msg.excel.dialogTitle1') +
      chooseRow.value.length +
      i18n.t('msg.excel.dialogTitle2'),
    { type: 'warning' }
  ).then(async () => {
    const deletePromises = chooseRow.value.map(async (item) => {
      await deleteUser(item._id)
    })
    Promise.all(deletePromises)
      .then(() => {
        ElMessage.success(i18n.t('msg.excel.removeSuccess'))
        // 所有删除操作完成后重新渲染
        getListData()
        chooseRow.value = ref([])
      })
      .catch((error) => {
        ElMessage.error(error.message)
        chooseRow.value = ref([])
      })
  })
}

// excle btn 导出
const exportToExcelVisible = ref(false)
const onToExcelClick = () => {
  exportToExcelVisible.value = true
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
    try {
      await deleteUser(row._id)
      ElMessage.success(i18n.t('msg.excel.removeSuccess'))
      // 重新渲染
      getListData()
    } catch (error) {
      ElMessage.error(error.message)
    }
  })
}

const onSelect = (selection) => {
  chooseRow.value = selection
}

// 用户操作

/**
 * 查看详情
 */
const onShowClick = (id) => {
  router.push(`/user/info/${id}`)
}

// 添加语言监听
watchSwitchLang(getListData)
// 处理导入用户数据不重新加载问题
onActivated(getListData)
</script>

<style lang="scss" scoped>
.user-manage-container {
  .header {
    margin-bottom: 20px;
  }
  .del-container {
    position: absolute;
  }
  .excel-container {
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
