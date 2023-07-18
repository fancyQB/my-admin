<template>
  <div class="permission-container">
    <el-card>
      <el-table
        border
        :data="permissionData"
        style="
           {
            width: 100%;
          }
        "
        row-key="children"
        default-expand-all
      >
        <el-table-column :label="$t('msg.permission.name')" prop="permissionName"></el-table-column>
        <el-table-column :label="$t('msg.permission.mark')" prop="permissionMark"></el-table-column>
        <el-table-column :label="$t('msg.permission.desc')" prop="permissionDesc"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import { permissionList } from '@/api/permission'
import { watchSwitchLang } from '@/utils/i18n'

const permissionData = ref([])
const getPermissionData = async () => {
  permissionData.value = await permissionList()
}
getPermissionData()

watchSwitchLang(getPermissionData)
</script>

<style lang="scss" scoped></style>
