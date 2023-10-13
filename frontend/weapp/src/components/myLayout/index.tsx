import { ScrollView, View } from "@tarojs/components";
import MyNavBar, { MyNavBarProps } from "@/components/myNavBar";
import CustomTabBar, { CustomTabBarProps } from "@/custom-tab-bar";
import { ReactNode } from "react";
import { getNavBarHeight } from "@/utils";
import styles from "./index.module.scss";

const { statusBarHeight, navHeight } = getNavBarHeight(); // 顶部状态栏高度

/** tab列表 */
const tabList = [
  {
    title: "首页",
    default: "home",
    activity: "home-fill",
    url: "/views/home/index",
  },
  {
    title: "功能",
    default: "feature",
    activity: "feature-fill",
    url: "/views/feature/index",
  },
  {
    title: "我的",
    default: "user",
    activity: "user-fill",
    url: "/views/mine/index",
  },
];

interface Props extends Partial<MyNavBarProps & CustomTabBarProps> {
  /** 当前 tabId (-1 不带底部导航栏) */
  tabId?: number;

  /**
   * 是否需要滚动容器
   */
  isScroll?: boolean;

  /** 额外的高度 */
  extraHeight?: string;

  /** MyLayout子组件 */
  children?: ReactNode;
}

/**
 * 自定义 Layout 组件: 顶部导航栏 + 页面内容 + 底部导航栏
 * @param props {@link Props}
 */
const MyLayout = (props: Props) => {
  const { tabId = -1, isScroll = true, extraHeight = "0px" } = props;

  // 顶部导航栏((statusBarHeight + navHeight)px) + 底部tabBar(120rpx) + 安全区域(env(safe-area-inset-bottom))
  const pageHeight = `${statusBarHeight + navHeight}px + ${tabId > -1 ? "120rpx + env(safe-area-inset-bottom)" : "0px"}`;

  return (
    <View>
      {/* 顶部导航栏 */}
      <MyNavBar
        title={tabList[tabId]?.title}
        {...props}
      />

      {/* 页面内容 */}
      {
        isScroll
          ? <ScrollView
            scrollY
            scrollWithAnimation
            style={{
              maxHeight: `calc(100vh - (${pageHeight}) - ${extraHeight})`,
            }}
          >
            {props?.children}
          </ScrollView>
          : <>{props?.children}</>
      }

      {/* 底部导航栏 */}
      {tabId > -1 && <CustomTabBar tabList={tabList} />}
    </View>
  );
};
export default MyLayout;
