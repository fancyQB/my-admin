import { publicRoutes, privateRoutes } from '@/router'

export default {
  namespaced: true,
  state: () => ({
    // 路由表: 初始拥有的静态路由权限
    routes: publicRoutes
  }),
  mutations: {
    /**
      * 增加路由
     */
    setRoutes(state, newRoutes) {
      state.routes = [...publicRoutes, ...newRoutes]
    }
  },
  actions: {
    /**
     * 根据权限筛选路由
     */
    filterRoutes(context, menus) {
      const routes = []
      menus.forEach(key => {
        routes.push(...privateRoutes.filter(item => item.name === key))
      })
      // 最后添加不配路由进入 404
      routes.push({
        path: '/:catchAll(.*)',
        redirect: '/404'
      })
      context.commit('setRoutes', routes)
      return routes
    }
  }
}