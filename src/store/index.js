import { createStore } from 'vuex'
import getters from './getters.js'

import user from './modules/user'
import app from './modules/app.js'
import theme from './modules/theme.js'
import queue from './modules/queue.js'
import permissions from './modules/permission.js'

export default createStore({
  getters,
  modules: {
    user,
    app,
    theme,
    queue,
    permissions
  }
})
