import axios from 'axios'
import { ElMessage } from 'element-plus'
import store from '@/store'

import { isTimeout } from './auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 添加 icode
    config.headers.icode = '1D7A543207E6341C'
    // 必须返回 config
    // 注入 token
    if (store.getters.token) {
      if (isTimeout()) {
        // 登出
        store.dispatch('user/logout')
        return Promise.reject(new Error('token 失效'))
      }
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    return config
  }, error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const { data, message, success } = response.data
    // success 成功
    if (success) {
      ElMessage.success(message)
      return data
    } else {
      // 业务失败
      ElMessage.error(message) // 错误消息提示
      return Promise.reject(new Error(message))
    }
  },
  // 请求错误
  error => {
    // 处理 token 超时问题
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      // token 超时
      store.dispatch('user/logout')
    }
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

export default service
