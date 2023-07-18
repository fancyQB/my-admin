import request from '@/utils/request'

/**
 * 获取所有角色
 * @returns
 */
export const roleList = () => {
  return request({
    url: '/role/list'
  })
}

/**
 * 获取指定角色的权限
 */
export const rolePermission = (id) => {
  return request({
    url: `/role/permission/${id}`
  })
}

/**
 * 为用户分配权限
 */
export const distributePermission = (data) => {
  return request({
    url: '/role/distribute-permission',
    method: 'POST',
    data
  })
}
