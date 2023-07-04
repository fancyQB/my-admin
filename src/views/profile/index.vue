<template>
  <div class="my-container">
    <el-row>
      <el-col :span="6">
        <project-card class="user-card" :features="featureDatas"></project-card>
      </el-col>
      <el-col :span="18">
        <el-card>
          <el-tabs v-model="activeName">
            <el-tab-pane :label="$t('msg.profile.feature')" name="feature">
              <feature :features="featureDatas"/>
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.chapter')">
              <chapter :chapters="chapterDatas"/>
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.author')">
              <author />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import ProjectCard from '@/views/profile/components/ProjectCard'
import feature from '@/views/profile/components/feature'
import chapter from '@/views/profile/components/chapter'
import author from '@/views/profile/components/author'
import { features, chapters } from '@/api/user'
import store from '@/store'

const activeName = ref('feature')

const featureDatas = ref([])
// 获取 features 数据
const getFeatureDatas = async () => {
  featureDatas.value = await features()
}
getFeatureDatas()

const chapterDatas = ref([])
// 获取 chapters 数据
const getChapterDatas = async () => {
  chapterDatas.value = await chapters()
}
getChapterDatas()

watch(() => store.getters.language, async () => {
  await getChapterDatas()
  store.dispatch('user/getUserInfo')
  await getFeatureDatas()
})
</script>

<style lang="scss" scoped>
.my-container {
  .user-card {
    margin-right: 20px;
  }
}
</style>
