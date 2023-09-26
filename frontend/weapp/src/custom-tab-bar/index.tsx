import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";
import styles from "./index.module.scss";

/**
 * 使用须知
 * 1. 组件位置需要与pages在同一级目录
 * 2. 文件夹名称必须是 custom-tab-bar
 * 3. 文件名必须是 index.后缀
 */

export interface CustomTabBarProps {
  /** TabBar 列表 */
  tabList: any;

  /** 切换Tab事件 */
  onClick?: (index: number) => void;
}

/**
 * 自定义 TabBar 组件
 * @param props {@link CustomTabBarProps}
 */
const CustomTabBar = (props: CustomTabBarProps) => {
  const { tabList, onClick } = props;
  const [selected, setSelected] = useState(0);

  const pages = Taro.getCurrentPages(); // 获取当前页面栈
  const currentPage = pages[0]; // 获取当前页面

  // Taro.useDidShow(() => {
  //   const pageObj = Taro.getCurrentInstance().page;
  //   const tabbar = Taro.getTabBar(pageObj);
  //   console.log("Home", tabbar);
  // });

  // 监听路由变化, 防止 tabbar 选中状态不同步
  useEffect(() => {
    const index = tabList?.findIndex(
      (item: any) => item.url === "/" + currentPage.route
    );

    index > -1 && setSelected(index);
  }, [currentPage.route]);

  /** 切换Tab */
  const switchTab = (index: number, url: string) => {
    Taro.switchTab({ url });
    onClick?.(index);
  };

  return (
    <View className={styles.page}>
      <View className={styles.tabBar}>
        {tabList?.map((item: any, index: number) => (
          <View
            key={index}
            onClick={() => switchTab(index, item.url)}
            className={`${styles.tabBarItem} ${selected === index && styles.active}`}
          >
            <View className={`at-icon at-icon-${item.iconType} ${styles.iconType}`} />
            <View className={styles.title}>{item.title}</View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default CustomTabBar;
