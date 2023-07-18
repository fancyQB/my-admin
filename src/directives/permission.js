import store from '@/store'

function checkPermission(el, binding) {
  // 获取绑定的值
  const { value } = binding
  // 获取所有的功能指令
  const points = store.getters.userInfo.permission.points
  // 当传入的指令集为 array 时
  if (value && value instanceof Array) {
    // 匹配对应的指令
    const hasPermission = points.some(item => {
      return value.includes(item)
    })
    // 如果无法匹配, 则表示当前用户无此权限
    if (!hasPermission) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  } else {
    throw new Error('v-permission expected Array ep: ["admin", "editor"]')
  }
}

export default {
  // 绑定在元素的父组件被挂载后调用
  mounted(el, binding) {
    checkPermission(el, binding)
  },

  // 在包含组件的 VNODE 及子组件的 VNode 更新后调用
  update(el, binding) {
    checkPermission(el, binding)
  }
}