import { generateColor } from '@/utils/theme'
import { getItem } from '@/utils/storage'
import { MAIN_COLOR } from '@/constant'

const getters = {
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  /**
   * @return true 表示已经存在用户信息
   */
  hasUserInfo: state => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  },
  cssVar: state => ({
    ...state.theme.variables,
    ...generateColor(getItem(MAIN_COLOR))
  }),
  sidebarOpen: state => state.app.sidebarOpen,
  language: state => state.app.language,
  mainColor: state => state.theme.mainColor,
  tagsViewList: state => state.app.tagsViewList

}

export default getters