import rgbHex from 'rgb-hex'
import color from 'css-color-function'
import axios from 'axios'
import { ElMessage } from 'element-plus'

import formual from '@/constant/formula.json'

/**
 * 写入 新样式到 style
 */
export const writeNewStyle = elNewStyle => {
  // 判断是否 已经添加了 style 标签
  const styleTag = document.head.querySelector('#change-element-css')
  if (!styleTag) {
    const style = document.createElement('style')
    style.innerText = elNewStyle
    style.setAttribute('id', 'change-element-css')
    document.head.appendChild(style)
    return
  }
  styleTag.innerText = elNewStyle
}

/**
 * 根据主色值 生成最新的样式表
 */
export const generateNewStyle = async primary => {
  const colors = generateColor(primary)
  let cssText = await getOriginalStyle()
  Object.keys(colors).forEach(key => {
    // 打标记的地方 替换为 色值表里的 颜色
    cssText = cssText.replace(
      new RegExp('(:|\\s+)' + key, 'g'),
      '$1' + colors[key])
  })
  return cssText
}

/**
 * 根据主色 生成色值表
 */
export const generateColor = primary => {
  if (!primary) return
  const colors = {
    primary
  }
  Object.keys(formual).forEach(key => {
    const value = formual[key].replace(/primary/g, primary)
    colors[key] = '#' + rgbHex(color.convert(value))
  })
  return colors
}

/**
 * 获取当前 element-plus 的默认样式
 */
const getOriginalStyle = async () => {
  try {
    const version = require('element-plus/package.json').version
    const url = `https://unpkg.com/element-plus@${version}/dist/index.css`
    const { data } = await axios(url)
    // 把获取到的数据筛选为原样式模板
    return getStyleTemplate(data)
  } catch (error) {
    ElMessage.error('获取样式表失败')
    return new Promise(error)
  }
}

/**
 * 返回style 的template
 */
const getStyleTemplate = data => {
  // element-plus 默认色值
  const colorMap = {
    '#3a8ee6': 'shade-1',
    '#409eff': 'primary',
    '#53a8ff': 'light-1',
    '#66b1ff': 'light-2',
    '#79bbff': 'light-3',
    '#8cc5ff': 'light-4',
    '#a0cfff': 'light-5',
    '#b3d8ff': 'light-6',
    '#c6e2ff': 'light-7',
    '#d9ecff': 'light-8',
    '#ecf5ff': 'light-9'
  }
  // 根据默认色值为要替换的色值打上标记
  Object.keys(colorMap).forEach(key => {
    const value = colorMap[key]
    data = data.replace(new RegExp(key, 'ig'), value)
  })
  return data
}
