<template>
  <div>
    <el-tooltip :content="$t('msg.navBar.guide')">
      <svg-icon icon="guide" @click="onClick" id="guide-start"></svg-icon>
    </el-tooltip>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'

import steps from './step'

const i18n = useI18n()
let driver = null
onMounted(() => {
  driver = new Driver({
    // 禁止点击蒙版关闭
    allowClose: false,
    stageBackground: 'rgba(199, 237, 204, .78)',
    closeBtnText: i18n.t('msg.guide.close'),
    nextBtnText: i18n.t('msg.guide.next'),
    prevBtnText: i18n.t('msg.guide.prev')
  })
})
const onClick = () => {
  console.log(driver)
  driver.defineSteps(steps(i18n))
  driver.start()
}
</script>

<style lang="scss" scoped></style>
