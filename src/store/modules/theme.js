import { getItem, setItem } from '@/utils/storage'
import { DEFAULT_COLOR, MAIN_COLOR } from '@/constant/index'

import variables from '@/styles/variables.module.scss'

export default {
  namespaced: true,
  state: () => ({
    mainColor: getItem(MAIN_COLOR) || DEFAULT_COLOR,
    variables
  }),
  mutations: {
    setMainColor(state, newColor) {
      state.mainColor = newColor
      state.variables.menuBg = newColor

      setItem(MAIN_COLOR, newColor)
    }
  },
  actions: {}
}