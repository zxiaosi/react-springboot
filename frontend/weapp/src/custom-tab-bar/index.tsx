import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";
import { AtTabBar } from "taro-ui";

/**
 * 使用须知
 * 1. 组件位置需要与pages在同一级目录
 * 2. 文件夹名称必须是 custom-tab-bar
 * 3. 文件名必须是 index.后缀
 */

interface Props {
  tabList: any; // TabBar 列表
}

/**
 * 自定义 TabBar 组件
 * @param props {@link Props}
 */
const CustomTabBar = (props: Props) => {
  const { tabList } = props;
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
  const switchTab = (index: number) => {
    Taro.switchTab({ url: tabList[index].url });
  };

  return (
    <AtTabBar fixed tabList={tabList} current={selected} onClick={switchTab} />
  );
};

export default CustomTabBar;
