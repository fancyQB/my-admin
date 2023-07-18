<template>
  <div class="">
    <el-card>
      <el-table
        :data="roleData"
        border
        style="
           {
            width: 100%;
          }
        "
      >
        <el-table-column
          :label="$t('msg.role.index')"
          type="index"
          width="120"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.role.name')"
          width="120"
          prop="title"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.role.desc')"
          prop="describe"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.role.action')"
          width="260"
          prop="aciton"
          v-permission="['distributePermission']"
        >
          <template #default="{ row }">
            <el-button
              type="primary"
              size="mini"
              @click="handleOperationClick(row.id)"
              >{{ $t('msg.role.assignPermissions') }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <operation-role
      v-model="operationRoleVisiable"
      :currentId="currentId"
    ></operation-role>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

import { roleList } from '@/api/role'
import { watchSwitchLang } from '@/utils/i18n'

import OperationRole from './components/OperationRole'

const roleData = ref([])

const getRoleData = async () => {
  roleData.value = await roleList()
}

getRoleData()

const currentId = ref('')

// 分配权限
const operationRoleVisiable = ref(false)
const handleOperationClick = (id) => {
  operationRoleVisiable.value = true
  currentId.value = id
}

watch(operationRoleVisiable, (val) => {
  if (!val) {
    currentId.value = ''
  }
})
// 监听语言变化
watchSwitchLang(getRoleData)
</script>

<style lang="scss" scoped></style>
