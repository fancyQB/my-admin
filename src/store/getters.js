import variables from '@/styles/variables.module.scss'
const getters = {
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  /**
   * @return true 表示已经存在用户信息
   */
  hasUserInfo: state => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  },
  cssVar: state => variables,
  sidebarOpen: state => state.app.sidebarOpen,
  language: state => state.app.language
}

export default getters