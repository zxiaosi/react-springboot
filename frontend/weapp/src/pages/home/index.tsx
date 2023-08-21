import { View, Image, Input, Button } from "@tarojs/components";
import { AtNoticebar } from "taro-ui";
import Taro, { useReady } from "@tarojs/taro";
import { useState } from "react";
import MyLayout from "@/components/myLayout";
import { getLocalSync, setLocalSync } from "@/request/auth";
import { defaultAvatar, userInfoStorage } from "@/global";
import styles from "./index.module.scss";

// index.config.ts
definePageConfig({});

function Home() {
  // 用户信息
  const [user, setUser] = useState({
    nickName: "微信用户",
    avatarUrl: defaultAvatar,
  });

  useReady(async () => {
    const userInfo = getLocalSync(userInfoStorage);
    userInfo && setUser(userInfo);
  });

  /**
   * 设置用户名和头像
   */
  const handleNameAvatar = (e: any, type: "nickName" | "avatarUrl") => {
    console.log("handleNameAvatar", type, e.detail.value || e.detail.avatarUrl);
    const newUseInfo = {
      ...user,
      [type]: e.detail.value || e.detail.avatarUrl,
    };
    setUser(newUseInfo);
    setLocalSync(userInfoStorage, newUseInfo);
  };

  /**
   * 获取用户手机号
   */
  const getUserPhone = (e: any) => {
    // e.detail = {
    //   cloudID: "xxx", // 云ID (新方式)
    //   code: "xxx", // 后端向微信服务端换取 真实手机号 的 code, 不是 wx.login 的 code (新方式)
    //   encryptedData: "xxx", // 加密数据 (旧方式)
    //   iv: "xxx" // 加密算法的初始向量 (旧方式)
    // }
    console.log("getUserPhone", e.detail);
  };

  return (
    <MyLayout tabId={0}>
      <View className={styles.page}>
        {/* 
          获取用户信息: https://developers.weixin.qq.com/community/develop/doc/00022c683e8a80b29bed2142b56c01
          目前尝试获取的用户信息只有头像和昵称，其他信息都是空的
          个人开发者不能获取用户手机号，需要企业开发者才能获取
        */}

        {/* 通告栏 */}
        <AtNoticebar icon="volume-plus" marquee className={styles.noticebar}>
          免责声明：本小程序仅供个人学习使用，不得用于商业用途，如有侵权，请联系作者删除！
        </AtNoticebar>

        {user && (
          <View className={styles.table}>
            <View className={styles.row}>
              <View className={styles.col}>用户名</View>
              <View className={styles.col}>
                {/* 获取用户名 */}
                <Input
                  type="nickname"
                  placeholder="输入或更换用户名"
                  onBlur={(e) => handleNameAvatar(e, "nickName")}
                  value={user.nickName}
                />
              </View>
            </View>
            <View className={styles.row}>
              <View className={styles.col}>头像</View>
              <View className={styles.col}>
                {/* 获取用户头像 */}
                <Button
                  openType="chooseAvatar"
                  onChooseAvatar={(e) => handleNameAvatar(e, "avatarUrl")}
                >
                  <Image src={user.avatarUrl} />
                </Button>
              </View>
            </View>
          </View>
        )}

        {/* 获取用户手机号 */}
        {/* <Button type="primary" openType="getPhoneNumber" onGetPhoneNumber={getUserPhone}>获取手机号</Button> */}
      </View>
    </MyLayout>
  );
}

export default Home;
