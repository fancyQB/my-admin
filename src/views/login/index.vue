<template>
  <div class="login-container">
    <el-form
      class="login-form"
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginRules"
      status-icon
    >
      <div class="title-container">
        <h3 class="title">{{ $t('msg.login.title') }}</h3>
        <lang-select class="lang-select" effect="light"></lang-select>
      </div>
      <!-- username -->
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon="user" />
        </span>
        <el-input
          name="username"
          placeholder="username"
          type="text"
          v-model="loginForm.username"
        ></el-input>
      </el-form-item>
      <!-- password  -->
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon="password" />
        </span>
        <el-input
          name="password"
          placeholder="password"
          v-model="loginForm.password"
          :type="passwordType"
        ></el-input>
        <span class="show-pwd" @click="onChangePwdType">
          <svg-icon :icon="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <!-- 登录按钮 -->
      <el-button
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        :loading="loading"
        @click="handleLogin"
        >{{ $t('msg.login.loginBtn') }}</el-button
      >
      <!-- 用户信息描述 -->
      <div class="tips" v-html="$t('msg.login.desc')"></div>
    </el-form>
  </div>
</template>

<script setup>
// 导入的组件可以直接使用
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import SvgIcon from '@/components/SvgIcon/index.vue'
import LangSelect from '@/components/LangSelect/index.vue'

import { validatePassword, validateUsername } from './rules'
import { watchSwitchLang } from '@/utils/i18n'
import { ElMessage } from 'element-plus'

// 绑定数据源
const loginForm = ref({
  username: 'super-admin',
  password: '123456'
})
const i18n = useI18n()
// 验证规则
const loginRules = ref({
  username: [
    {
      required: true,
      trigger: 'blur',
      validator: validateUsername()
    }
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: validatePassword()
    }
  ]
})
// 处理密码框显示状态
const passwordType = ref('password')

const onChangePwdType = () => {
  if (passwordType.value === 'password') {
    passwordType.value = 'text'
  } else {
    passwordType.value = 'password'
  }
}

// 登录动作处理
const router = useRouter()
const loading = ref(false)
const loginFormRef = ref(null)
const store = useStore()
const handleLogin = () => {
  loginFormRef.value.validate((valid) => {
    if (!valid) return
    loading.value = true
    store
      .dispatch('user/login', loginForm.value)
      .then(() => {
        loading.value = false
        // 跳转
        ElMessage.success(i18n.t('msg.login.successTips'))
        router.push('/')
      })
      .catch(() => {
        loading.value = false
      })
  })
}
// 监听语言的变化
watchSwitchLang(() => {
  loginFormRef.value.validate()
})
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  widows: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    :deep(.el-form-item) {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    :deep(.el-input) {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background-color: transparent;
        border: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        caret-color: $cursor;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }
  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  :deep(.lang-select) {
    position: absolute;
    top: 4px;
    right: 0;
    background-color: #fff;
    font-size: 22px;
    padding: 4px;
    border-radius: 4px;
    cursor: pointer;
  }
  .tips {
    font-size: 16px;
    line-height: 24px;
    color: #fff;
  }
}
</style>
