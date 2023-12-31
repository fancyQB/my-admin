import router from './router'
import store from './store'

// 白名单
const whiteList = ['/login']

/**
 * 路由前置守卫
 */

// 1. 用户未登录 不允许进入 非 login 页面
// 2. 登录后 不能进入 login 页面

router.beforeEach(async (to, from, next) => {
  if (!store.getters.token) {
    // 没有 token 的情况 如果在 白名单内
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  } else {
    // 有token 的情况
    if (to.path === '/login') {
      next('/')
    } else {
      // 获取用户信息
      // 判断用户信息是否存在
      if (!store.getters.hasUserInfo) {
        // 触发获取用户信息动作
        const data = await store.dispatch('user/getUserInfo')
        const { permission } = data
        console.log(permission)
        // 处理用户权限, 筛选出需要添加的权限
        const filterRoutes = await store.dispatch('permissions/filterRoutes', permission.menus)
        // 通过addRoute 循环添加
        filterRoutes.forEach(item => {
          router.addRoute(item)
        })
        return next(to.path)
      }
      next()
    }
  }
})