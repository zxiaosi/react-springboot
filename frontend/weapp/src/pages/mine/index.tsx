import { useState } from "react";
import Taro, { useReady } from "@tarojs/taro";
import { View, Button, Image, ScrollView } from "@tarojs/components";
import MyLayout from "@/components/myLayout";
import { ImageUrl, LoginUrl, UserInfoStore } from "@/global";
import { getLocalSync, removeLocalSync } from "@/request/auth";
import defaultImg from "@/images/default.png";
import styles from "./index.module.scss";

// index.config.ts
definePageConfig({});

const catalog = [
  { id: 1, name: "公告通知", icon: "bell", url: "/pages/order/index" },
  { id: 2, name: "关于项目", icon: "settings", url: "/pages/collection/index" },
  { id: 3, name: "关于项目", icon: "settings", url: "/pages/collection/index" },
  { id: 4, name: "关于项目", icon: "settings", url: "/pages/collection/index" },
  { id: 5, name: "关于项目", icon: "settings", url: "/pages/collection/index" },
  { id: 6, name: "关于项目", icon: "settings", url: "/pages/collection/index" },
  { id: 7, name: "关于项目", icon: "settings", url: "/pages/collection/index" },
  { id: 8, name: "关于项目", icon: "settings", url: "/pages/collection/index" },
  { id: 9, name: "关于项目", icon: "settings", url: "/pages/collection/index" },
  { id: 10, name: "关于项目", icon: "settings", url: "/pages/collection/index" },
  { id: 11, name: "关于项目", icon: "settings", url: "/pages/collection/index" },
  { id: 12, name: "关于项目", icon: "settings", url: "/pages/collection/index" },
  { id: 13, name: "关于项目", icon: "settings", url: "/pages/collection/index" },
  { id: 14, name: "关于项目", icon: "settings", url: "/pages/collection/index" },
  { id: 15, name: "关于项目", icon: "settings", url: "/pages/collection/index" },
  { id: 16, name: "关于项目", icon: "settings", url: "/pages/collection/index" },
  { id: 17, name: "关于项目", icon: "settings", url: "/pages/collection/index" },
  { id: 18, name: "关于项目", icon: "settings", url: "/pages/collection/index" },
  { id: 19, name: "关于项目", icon: "settings", url: "/pages/collection/index" },
  { id: 20, name: "关于项目", icon: "settings", url: "/pages/collection/index" },
  { id: 21, name: "关于项目", icon: "settings", url: "/pages/collection/index" }
];

// 仅支持在正式版小程序中获取
const currentVersion = Taro.getAccountInfoSync().miniProgram.version || '1.0.0';

const Index = () => {
  const [user, setUser] = useState({
    username: "未知",
    avatar: "",
    role: "游客"
  });

  // 版本号和身5
  const plateList = [
    { id: 1, name: `V${currentVersion}`, desc: "当前版本" },
    { id: 2, name: user.role, desc: "用户身份" },
  ]

  useReady(() => {
    const userInfo = getLocalSync(UserInfoStore);
    userInfo && setUser({ ...user, ...userInfo });
  });

  /**
   * 点击item事件
   */
  const handleItemClick = (item) => {
    Taro.showToast({ title: "功能正在开发中...", icon: "none" });
  };

  /**
   * 退出登录
   */
  const handleLogout = () => {
    removeLocalSync(UserInfoStore)
    Taro.switchTab({ url: LoginUrl });
    setUser({ username: "未知", avatar: "", role: "游客" })
  };

  return (
    <MyLayout
      tabId={2}
      extraHeight={"132rpx"} // 底部退出登录按钮高度
      navBarClass={styles.navBarClass}
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
              onClick={() => handleItemClick(menu)}
            >
              <View className={`at-icon at-icon-${menu.icon} ${styles.icon}`} />
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
