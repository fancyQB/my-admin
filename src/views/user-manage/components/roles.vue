<template>
  <el-dialog
    :title="$t('msg.excel.roleDialogTitle')"
    :model-value="modelValue"
    @close="closed"
    width="50%"
  >
    <el-checkbox-group
      v-model="userRoleTitleList"
      v-loading="loading"
      element-loading-background="#fff"
    >
      <el-checkbox
        v-for="item in allRoleList"
        :key="item.id"
        :label="item.title"
      ></el-checkbox>
    </el-checkbox-group>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.universal.cancel') }}</el-button>
        <el-button @click="confirm" type="primary">
          {{ $t('msg.universal.confirm') }}</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineEmits, ref, watch } from 'vue'
import { roleList } from '@/api/role'
import { userRoles, updateRole } from '@/api/user-manage'
import { watchSwitchLang } from '@/utils/i18n'
import { ElMessage } from 'element-plus'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
})
const emits = defineEmits(['update:modelValue'])

const loading = ref(true)

const closed = () => {
  emits('update:modelValue', false)
  loading.value = true
}

const confirm = async () => {
  let reqData = userRoleTitleList.value.map((key) => {
    return allRoleList.value.filter((item) => {
      return item.title === key
    })
  })
  reqData = reqData.flat(1)
  try {
    await updateRole(props.userId, reqData)
    ElMessage.success('修改角色成功')
  } catch (error) {
    ElMessage.error(error.message)
  }

  closed()
}
// 当前用户
const userRoleTitleList = ref([])
const getUserRoleTitleList = async (val) => {
  userRoleTitleList.value = (await userRoles(val)).role.map(
    (item) => item.title
  )
}

// 监听 props.userId 的值
watch(
  () => props.userId,
  async (val) => {
    if (val) {
      // 调用接口是异步 在渲染之后才执行, 所有dialog 复选框选项会有跳动 通过await + timeout loading 的方式 拦截跳动 不让用户感知
      await getUserRoleTitleList(val)
      setTimeout(() => {
        loading.value = false
      }, 300)
    }
  }
)

// 获取所有角色
const allRoleList = ref([])
const getRoleData = async () => {
  allRoleList.value = await roleList()
}

getRoleData()

// 监听语言变换
watchSwitchLang(getRoleData)
</script>

<style lang="scss" scoped></style>
