import { getItem, setItem } from '@/utils/storage'
import { LANG } from '@/constant'

export default {
  namespaced: true,
  state: () => ({
    sidebarOpen: true,
    language: getItem(LANG) || 'zh'
  }),
  mutations: {
    togglerSidebarOpened(state) {
      state.sidebarOpen = !state.sidebarOpen
    },
    setLanguage(state, lang) {
      state.language = lang
      setItem(LANG, lang)
    }
  },
  actions: {}
}