import path from 'path'
import i18n from '@/i18n'

export const generateSerachData = (routes, preTtitl = [], basePath = '/') => {
  const result = []
  if (!routes) return
  for (const route of routes) {
    // 创建包含 path 和 title 的 item
    const data = {
      path: path.resolve(basePath, route.path),
      title: [...preTtitl]
    }
    // 过滤动态路由
    const re = /.*\/:.*/
    if (route.meta && route.meta.title && route.meta.icon && !re.exec(route.path)) {
      const i18ntitle = i18n.global.t(`msg.route.${route.meta.title}`)
      data.title = [...data.title, i18ntitle]
      result.push(data)
    }
    if (route.children) {
      const tempRet = generateSerachData(route.children, data.title, data.path)
      if (tempRet.length >= 1) {
        result.push(...tempRet)
      }
    }
  }
  return result
}