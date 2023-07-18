import md5 from 'md5'

import router, { resetRouter } from '@/router'
import { login, getUserInfo as getInfo } from '../../api/sys'
import { getItem, setItem, removeAllItem } from '../../utils/storage'
import { TOKEN } from '@/constant'
import { setTokenStamp } from '@/utils/auth'

export default {
  namespaced: true,
  state: () => ({
    token: getItem(TOKEN) || '',
    userInfo: {}
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem(TOKEN, token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    // 登录
    login(context, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({
          username,
          password: md5(password)
        }).then(data => {
          this.commit('user/setToken', data.token)
          setTokenStamp()
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取用户信息
    getUserInfo(context) {
      return new Promise((resolve, reject) => {
        getInfo().then(data => {
          this.commit('user/setUserInfo', data)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    logout() {
      resetRouter()
      this.commit('user/setToken', '')
      this.commit('user/setUserInfo', {})
      removeAllItem()
      // TODO 删除权限
      router.push('/login')
    }
  }
}