const whiteList = ['/login', '/import', '/404', '/401']

/**
 * path 是否需要被缓存
 */
export function isTags(path) {
  return !whiteList.includes(path)
}
