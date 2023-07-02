import { getItem, setItem } from '@/utils/storage'
import { LANG, TAGS_VIEW } from '@/constant'
import store from '..'

export default {
  namespaced: true,
  state: () => ({
    sidebarOpen: true,
    language: getItem(LANG) || 'zh',
    tagsViewList: getItem(TAGS_VIEW) || []
  }),
  mutations: {
    togglerSidebarOpened(state) {
      state.sidebarOpen = !state.sidebarOpen
    },
    setLanguage(state, lang) {
      state.language = lang
      setItem(LANG, lang)
    },
    /**
     * 添加 tags
     */
    addTagViewList(state, tag) {
      const isFind = state.tagsViewList.find(item => {
        return item.path === tag.path
      })
      if (!isFind) {
        state.tagsViewList.push(tag)
        setItem(TAGS_VIEW, state.tagsViewList)
      }
    },
    /**
     * tags 国际化
     */
    changeTagsView(state, tag) {
      state.tagsViewList = tag
      setItem(TAGS_VIEW, state.tagsViewList)
    },
    /**
     * 删除 tag
     *  @param {type: 'other'||'right'||'index', index: index} payload
     */
    removeTagViews(state, payload) {
      if (payload.type === 'index') {
        store.getters.tagsViewList.splice(payload.index, 1)
      } else if (payload.type === 'other') {
        store.getters.tagsViewList.splice(payload.index + 1, store.getters.tagsViewList.length - payload.index + 1)
        store.getters.tagsViewList.splice(0, payload.index)
      } else if (payload.type === 'right') {
        state.tagsViewList.splice(
          payload.index + 1,
          state.tagsViewList.length - payload.index + 1
        )
      }
      setItem(TAGS_VIEW, state.tagsViewList)
    }
  },
  actions: {}
}