export default {
  namespaced: true,
  state: () => ({
    sidebarOpen: true
  }),
  mutations: {
    togglerSidebarOpened(state) {
      state.sidebarOpen = !state.sidebarOpen
    }
  },
  actions: {}
}