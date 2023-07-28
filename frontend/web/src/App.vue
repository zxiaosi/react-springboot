<script setup lang="ts">
import { RouterView } from "vue-router"; // 路由出口
import zhCn from "element-plus/dist/locale/zh-cn.mjs"; // element-plus 中文语言包
import { Check, SwitchButton } from "@element-plus/icons-vue";
</script>

<template>
  <el-config-provider :locale="zhCn">
    <div class="page">
      <div>Hello World!</div>

      <el-button type="primary" :icon="Check">中文</el-button>

      <el-icon><SwitchButton /></el-icon>

      <RouterView />
    </div>
  </el-config-provider>
</template>

<style scoped>
.page {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
