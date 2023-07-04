<template>
  <div class="autor-container">
    <div class="author-info">
      <div class="avatar-box">
        <pan-thumb
          :image="githubImage"
          :height="'60px'"
          :width="'60px'"
          :hoverable="false"
        >
          <template #header>
            <h3>zq</h3>
          </template>
        </pan-thumb>
      </div>
      <div class="info">
        <h3 class="author-name">Fancyqb</h3>
        <span class="authot-job">前端工程师 </span>
      </div>
    </div>
    <div class="auhor-desc">
      曾经是一名做过两三年测开的python使用者, 现在是一位努力学习前端的追梦人
    </div>
  </div>
</template>

<script setup>
import {} from 'vue'
import PanThumb from '@/components/PanThumb'
import githubImage from '@/assets/image/github.jpg'
</script>

<style lang="scss" scoped>
.avatar-box {
  display: inline-block;
  vertical-align: top;
}
.info {
  margin-top: 8px;
  margin-left: 18px;
  display: inline-block;
  h3 {
    margin-bottom: 5px;
  }
  span {
    font-size: 14px;
  }
}
.auhor-desc {
  font-size: 14px;
  margin-top: 10px;
  text-indent: 2em
}
</style>
