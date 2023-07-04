import request from '@/utils/request'
/**
 * 获取功能数据
 */
export const features = () => {
  return request({
    url: '/user/feature',
    method: 'GET'
  })
}
/**
 * 获取章节数据
 */
export const chapters = () => {
  return request({
    url: '/user/chapter',
    method: 'GET'
  })
}