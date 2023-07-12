import dayjs from 'dayjs'

export const dateFormt = (val, format = 'YYYY-MM-DD') => {
  // excel导入时 numb 有可能就是正确的时间
  if (val.includes('-')) return val
  if (!isNaN(val)) {
    val = parseInt(val)
  }
  return dayjs(val).format(format)
}

export default app => {
  app.config.globalProperties.$filters = {
    dateFormt
  }
}