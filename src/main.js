import i18n from '@/i18n'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
// 导入初始化样式表
import '@/styles/index.scss'
// 导入 svgIcon
import installIcons from '@/icons'
// 导入全局属性
import installFilters from '@/filters'
// 路由鉴权
import '@/permission'

const app = createApp(App)

installElementPlus(app)
installIcons(app)
installFilters(app)
app
  .use(store)
  .use(router)
  .use(i18n)
  .mount('#app')
