
import store from '@/store/index'
/**
 * 判断两个数组内容是否相同
 */
export const arraysAreEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    return false
  }
  const areEqual = arr1.every((element) => arr2.includes(element))
  return areEqual
}

/**
 * 判断 queue 里是否包含 ID
 */
export const hasID = (id) => {
  return store.getters.queues.some(item => {
    return item.id === id
  })
}

/**
 * 通过 id 查找 role
 */
export function getRoleById(id) {
  const findRole = store.getters.queues.find(item => {
    return item.id === id
  })
  if (findRole) {
    return findRole.role
  }
}