import dayjs from 'dayjs'

export const dateFormt = (val, format = 'YYYY-MM-DD') => {
  try {
    if (val.includes('-')) return val
  } catch (error) {
    console.log('global filters:' + error)
  }
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