export default defineAppConfig({
  pages: [
    "pages/home/index", // 首页
    "pages/feature/index", // 功能页
    "pages/mine/index", // 用户页
  ],
  subpackages: [
    {
      root: "pages/subFeature",
      pages: [
        "index", // 占位页面
        "changeLog/index", // 更新日志
      ]
    }
  ],
  tabBar: {
    list: [
      {
        pagePath: "pages/home/index",
        text: "首页",
      },
      {
        pagePath: "pages/feature/index",
        text: "功能",
      },
      {
        pagePath: "pages/mine/index",
        text: "用户",
      },
    ],
    custom: true, // 自定义tabbar
  },
  usingComponents: {}, // 全局引入组件
  window: {
    navigationStyle: "custom", // 自定义的导航栏
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
});
