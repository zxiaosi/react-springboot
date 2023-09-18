import { useState } from "react";
import Taro, { useReady } from "@tarojs/taro";
import { View, Button, Image } from "@tarojs/components";
import MyLayout from "@/components/myLayout";
import { imageUrl, userInfoStorage } from "@/global";
import defaultAvatar from "@/images/default-avatar.jpg";

import styles from "./index.module.scss";

// index.config.ts
definePageConfig({});

const catalog = [
  {
    id: 1,
    name: "公告通知",
    icon: "bell",
    url: "/pages/order/index",
  },
  {
    id: 2,
    name: "关于项目",
    icon: "settings",
    url: "/pages/collection/index",
  },
];

function User() {
  const [user, setUser] = useState({
    username: "未知",
    avatar: "",
  });

  useReady(() => {
    const userInfo = Taro.getStorageSync(userInfoStorage);
    userInfo && setUser(userInfo);
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
    Taro.showToast({ title: "功能正在开发中...", icon: "none" });
  };

  return (
    <MyLayout tabId={2} navBarClass={styles.navBarClass}>
      <View className={styles.page}>
        <View className={styles.top}>
          <Image src={user.avatar ? (imageUrl + user.avatar) : defaultAvatar} className={styles.avatar} />
          <View className={styles.name}>{user.username}</View>
        </View>

        <View className={styles.middle}>
          {catalog?.map((item) => (
            <View
              className={styles.item}
              key={item.id}
              onClick={() => handleItemClick(item)}
            >
              <View className={styles.left}>
                <View
                  className={`at-icon at-icon-${item.icon} ${styles.icon}`}
                />
                <View className={styles.name}>{item.name}</View>
              </View>
              <View
                className={`at-icon at-icon-chevron-right ${styles.right}`}
              />
            </View>
          ))}
        </View>

        <Button className={styles.bottom} onClick={handleLogout}>
          退出登录
        </Button>
      </View>
    </MyLayout>
  );
}

export default User;
