import { createStore } from 'vuex'
import getters from './getters.js'

import user from './modules/user'
import app from './modules/app.js'

export default createStore({
  getters,
  modules: {
    user,
    app
  }
})
