<template>
  <div class="operation-role-container">
    <el-dialog
      :title="$t('msg.excel.roleDialogTitle')"
      :model-value="modelValue"
      @closed="closed"
    >
      <!-- 内容区 -->
      <el-tree
        v-loading="loading"
        element-loading-background="#fff"
        check-strictly
        ref="treeRef"
        :data="dataSource"
        show-checkbox
        node-key="id"
        :props="defaultProps"
        default-expand-all
      >
      </el-tree>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closed">{{
            $t('msg.universal.cancel')
          }}</el-button>
          <el-button @click="onConfirm(props.currentId)" type="primary">{{
            $t('msg.universal.confirm')
          }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { defineEmits, ref, watch } from 'vue'

import { permissionList } from '@/api/permission'
import { rolePermission, distributePermission } from '@/api/role'
import { ElMessage } from 'element-plus'
import { arraysAreEqual, hasID, getRoleById } from './utils'
import { watchSwitchLang } from '@/utils/i18n'

// import { getters } from '@/store/getters'
import store from '@/store/index'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  currentId: {
    type: String,
    required: true
  }
})

const emits = defineEmits(['update:modelValue'])
const treeRef = ref(null)
const loading = ref(true)

const closed = () => {
  emits('update:modelValue', false)
  loading.value = true
}

const onConfirm = async (id) => {
  const permissions = treeRef.value.getCheckedKeys()
  if (arraysAreEqual(permissions, currentPermissions.value)) {
    ElMessage.info('权限未改变')
    return
  }
  const data = {
    permissions,
    roleId: id
  }
  try {
    await distributePermission(data)
    ElMessage.success('分配权限成功')
    store.commit('queue/remove', id)
  } catch (error) {
    ElMessage.error(error.message)
  }
  closed()
}
const dataSource = ref([])
const getDataSource = async () => {
  dataSource.value = await permissionList()
}

const defaultProps = {
  children: 'children',
  label: 'permissionName'
}

// 获取当前角色的权限
const currentPermissions = ref([])
const getCurrentPermissions = async (id) => {
  try {
    currentPermissions.value = await rolePermission(id)
    treeRef.value.setCheckedKeys(currentPermissions.value)
  } catch (error) {
    ElMessage.error(error.message)
  }
}

watch(
  () => props.currentId,
  async (val) => {
    if (!val) return
    if (!hasID(val) && val) {
      await getCurrentPermissions(val)
      val = { id: val, role: currentPermissions.value }
      store.commit('queue/setQueue', val)
      setTimeout(() => {
        loading.value = false
      }, 300)
    } else {
      treeRef.value.setCheckedKeys(getRoleById(val))
      loading.value = false
    }
    // if (val) {
    //   await getCurrentPermissions(val)
    //   setTimeout(() => {
    //     loading.value = false
    //   }, 300)
    // }
  }
)

getDataSource()

// 监听语言变化
watchSwitchLang(getDataSource)
</script>

<style lang="scss" scoped></style>
