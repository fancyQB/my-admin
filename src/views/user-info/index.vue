<template>
  <div class="user-info-container">
    <el-card class="print-box">
      <el-button
        type="primary"
        size="small"
        :loading="printLoading"
        v-print="printObj"
        >{{ $t('msg.userInfo.print') }}</el-button
      >
    </el-card>

    <el-card>
      <div class="user-info-box" id="userInfoBox">
        <h2 class="title">{{ $t('msg.userInfo.title') }}</h2>
        <div class="user-info-header">
          <!-- 头部渲染表格 -->
          <el-descriptions :column="2" border>
            <el-descriptions-item :label="$t('msg.userInfo.name')">{{
              detailData.username
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.sex')">{{
              detailData.gender
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.nation')">{{
              detailData.nationality
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.mobile')">{{
              detailData.mobile
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.province')">{{
              detailData.province
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.date')">{{
              $filters.dateFormt(detailData.openTime)
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.remark')" :span="2">
              <el-tag
                class="remark"
                size="small"
                v-for="(item, index) in detailData.remark"
                :key="index"
                >{{ item }}</el-tag
              >
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.address')">{{
              detailData.address
            }}</el-descriptions-item>
          </el-descriptions>
          <!-- 头像渲染 -->
          <el-image
            :src="detailData.avatar"
            class="avatar"
            :preview-src-list="[detailData.avatar]"
          ></el-image>
        </div>
        <div class="user-info-body">
          <el-descriptions direction="vertical" :column="1" border>
            <el-descriptions-item :label="$t('msg.userInfo.experience')">
              <ul>
                <li v-for="(item, index) in detailData.experience" :key="index">
                  <span>
                    {{ $filters.dateFormt(item.startTime, 'YYYY/MM') }}
                    ----
                    {{ $filters.dateFormt(item.endTime, 'YYYY/MM') }}</span
                  >
                  <span>{{ item.title }}</span>
                  <span>{{ item.desc }}</span>
                </li>
              </ul></el-descriptions-item
            >
            <el-descriptions-item :label="$t('msg.userInfo.major')">{{
              detailData.major
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.glory')">{{
              detailData.glory
            }}</el-descriptions-item>
          </el-descriptions>
        </div>
        <!-- 尾部签名 -->
        <div class="foot">{{ $t('msg.userInfo.foot') }}</div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import { userDetail } from '@/api/user-manage'
import { watchSwitchLang } from '@/utils/i18n'
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

// 打印相关
const printLoading = ref(false)

const printObj = {
  // 打印区域
  id: 'userInfoBox',
  // 打印标题
  popTitle: '',
  // 打印前
  beforOpenCallback(vue) {
    printLoading.value = true
  },
  // 执行打印
  openCallback(vue) {
    printLoading.value = false
  }
}

// 数据相关
const detailData = ref({})
const getUserDetail = async () => {
  detailData.value = await userDetail(props.id)
}
getUserDetail()

// 监听语言变化
watchSwitchLang(getUserDetail)
</script>

<style lang="scss" scoped>
.user-info-container {
  .print-box {
    margin-bottom: 20px;
    text-align: right;
  }
}
.user-info-box {
  width: 1024px;
  margin: 0 auto;
  .title {
    margin-bottom: 16px;
    text-align: center;
  }
  .user-info-header {
    display: flex;
    :deep(.el-descriptions) {
      flex-grow: 1;
    }
    .avatar {
      width: 187px;
      box-sizing: border-box;
      padding: 30px 20px;
      border: 1px solid #ebeef5;
      border-left: none;
    }
    .remark {
      margin-right: 12px;
    }
  }
  .user-info-body {
    ul {
      list-style: none;
      li {
        span {
          margin-right: 62px;
        }
      }
    }
  }
  .foot {
    margin-top: 42px;
    text-align: right;
  }
}
</style>
