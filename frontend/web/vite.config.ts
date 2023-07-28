import { fileURLToPath, URL, resolve } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
// 自动导入 ElementPlus 图标 https://element-plus.org/zh-CN/component/icon.html#%E5%9F%BA%E7%A1%80%E7%94%A8%E6%B3%95
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver()], // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
    }),
    Components({
      resolvers: [ElementPlusResolver()], // 自动导入 Element Plus 组件
    }),
  ],
  css: {
    // 预处理器配置项
    preprocessorOptions: {
      less: {
        math: "always",
      },
    },
  },
});
