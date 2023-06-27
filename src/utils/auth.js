
import { getItem, setItem } from './storage'
import { TIME_STAMP, TOKEN_TIMEOUT_VALUE } from '../constant'

/**
 *  获取 token 的时间戳
 */
export function getTokenStamp() {
  return getItem(TIME_STAMP)
}

/**
 * 设置 token 的时间戳
 */
export function setTokenStamp() {
  return setItem(TIME_STAMP, Date.now())
}

/**
 * token 是否超时
 */
export function isTimeout() {
  const currentTime = Date.now()
  return currentTime - getTokenStamp() > TOKEN_TIMEOUT_VALUE
}
