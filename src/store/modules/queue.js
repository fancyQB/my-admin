export default {
  namespaced: true,
  state: () => ({
    queues: [
      // { id: 1, role: [] }
    ]
  }),
  mutations: {
    setQueue(state, val) {
      state.queues.push(val)
    },
    remove(state, val) {
      state.queues = state.queues.filter(item => {
        return item.id !== val
      })
    }
  },
  actions: {}
}