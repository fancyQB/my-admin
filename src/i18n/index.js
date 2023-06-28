import { createI18n } from 'vue-i18n'
import zhLocale from './lang/zh'
import enLocal from './lang/en'

import store from '@/store'

const messages = {
  en: {
    msg: {
      ...enLocal
    }
  },
  zh: {
    msg: {
      ...zhLocale
    }
  }
}

const locale = store?.getters?.language

const i18n = createI18n({
  // 使用 composition api 模式, 则需将其设置为false
  legacy: false,
  // 全局注入 $t 函数
  globalInjection: true,
  locale,
  messages
})

export default i18n