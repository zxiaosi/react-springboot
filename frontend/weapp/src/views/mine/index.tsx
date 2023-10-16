import { useState } from "react";
import Taro, { useDidShow } from "@tarojs/taro";
import { View, Button, Image, WebView } from "@tarojs/components";
import MyLayout from "@/components/myLayout";
import { ImageUrl, LoginUrl, UserInfoStore } from "@/global";
import { getLocalSync, removeLocalSync } from "@/request/auth";
import defaultImg from "@/assets/images/default.png";
import styles from "./index.module.scss";
import { AtIcon } from "taro-ui";

// index.config.ts
definePageConfig({});

const catalog = [
  { id: 1, name: "公告通知", icon: "announcement", url: "/views/announcement/index" },
  { id: 2, name: "关于项目", icon: "about", url: "/views/collection/index" },
];

// 仅支持在正式版小程序中获取
const currentVersion = Taro.getAccountInfoSync().miniProgram.version || '1.0.0';

const Index = () => {
  const [user, setUser] = useState({
    username: "未知",
    avatar: "",
    roleName: "未知"
  });

  // 版本号和身份
  const plateList = [
    { id: 1, name: `V${currentVersion}`, desc: "当前版本" },
    { id: 2, name: user.roleName, desc: "用户身份" },
  ]

  useDidShow(() => {
    const userInfo = getLocalSync(UserInfoStore);
    setUser({ ...user, ...userInfo });
  });

  /**
   * 点击item事件
   */
  const handleClick = (item) => {
    Taro.showToast({ title: "功能正在开发中...", icon: "none" });
    Taro.openDocument
  };

  /**
   * 退出登录
   */
  const handleLogout = () => {
    removeLocalSync(UserInfoStore)
    Taro.switchTab({ url: LoginUrl });
    setUser({ username: "未知", avatar: "", roleName: "未知" })
  };

  return (
    <MyLayout
      tabId={2}
      extraHeight={"132rpx"} // 底部退出登录按钮高度
      isUseBgColor={true} // 是否使用背景(主题)色
    >
      <View className={styles.page}>

        <View className={styles.header}>
          {/* 头像 */}
          <Image src={user.avatar ? (ImageUrl + user.avatar) : defaultImg} className={styles.avatar} />

          {/* 用户名 */}
          <View className={styles.name}>{user.username}</View>

          {/* 版本号和身份 */}
          <View className={styles.plateList}>
            {
              plateList.map((plate) => (
                <>
                  <View key={plate.id} className={styles.plate} >
                    <View className={styles.top}>{plate.name}</View>
                    <View className={styles.bottom}>{plate.desc}</View>
                  </View>
                  {plate.id === 1 && <View className={styles.line} />}
                </>
              ))
            }
          </View>
        </View>

        {/* 菜单列表 */}
        <View className={styles.menuList}>
          {catalog?.map((menu) => (
            <View
              key={menu.id}
              className={styles.menu}
              onClick={() => handleClick(menu)}
            >
              <AtIcon prefixClass='iconfont' value={menu.icon} className={styles.icon} />
              <View className={styles.name}>{menu.name}</View>
            </View>
          ))}
        </View>

        {/* 退出登录 */}
        <Button plain className={styles.logout} onClick={handleLogout}>
          退出登录
        </Button>
      </View>
    </MyLayout>
  );
}

export default Index;
