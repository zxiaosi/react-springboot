## 配置文件

### [config/index.js 配置文档](https://taro-docs.jd.com/docs/config)

### [app.config.ts 配置文档](https://taro-docs.jd.com/docs/app-config)

### [babel.config.js 配置文档](https://taro-docs.jd.com/docs/babel-config)

### project.config.json 配置文档

- [Taro 配置文档](https://taro-docs.jd.com/docs/project-config)

- [微信小程序 配置文档](https://developers.weixin.qq.com/miniprogram/dev/devtools/projectconfig.html)

- 开发者工具的隐式设置

  ```json
  "setting": {
      ...
      "babelSetting": {
          "outputPath": "",
          "ignore": []
      },
      "useCompilerPlugins": false,
      "disableUseStrict": false,
      "uploadWithSourceMap": true,
      "packNpmManually": false,
      "packNpmRelationList": [],
      "coverView": true,
      "checkInvalidKey": true,
      "showShadowRootInWxmlPanel": true,
      "useIsolateContext": false,
      "useMultiFrameRuntime": true,
      "useApiHook": true,
      "useApiHostProcess": true,
      "showES6CompileOption": false
  }
  ```

### `tsconfig.json`

- [官方文档](https://www.typescriptlang.org/zh/tsconfig)
- [博客参考](https://jishuin.proginn.com/p/763bfbd78afd) （_三、tsconfig.json 全解析_）
