import { View, Image, Input, Button } from "@tarojs/components";
import { AtNoticebar } from "taro-ui";
import Taro, { useReady } from "@tarojs/taro";
import { useState } from "react";
import MyLayout from "@/components/myLayout";
import { ApiUrl, ImageUrl, TokenStore, UserInfoStore } from "@/global";
import { getUserInfoApi, updateUserApi } from "@/apis";
import { getLocalSync, setLocalSync } from "@/request/auth";
import styles from "./index.module.scss";
import defaultImg from "@/images/default.png";
import eye from "@/images/eye.png";
import eyeClose from "@/images/eye-close.png";
import { MyRegEx } from "@/utils/constant";

// index.config.ts
definePageConfig({});

const Index = () => {
  const [isShowPwd, setIsShowPwd] = useState(false); // 是否显示密码

  const [user, setUser] = useState({ // 用户信息
    username: "",
    password: "",
    avatar: "",
  });

  useReady(async () => {

    let userInfo = getLocalSync(UserInfoStore);

    if (!userInfo) {
      const resp = await getUserInfoApi();
      userInfo = resp.data.data
      setLocalSync(UserInfoStore, userInfo);
    }

    setUser({ ...userInfo });
  });

  /**
   * 设置用户名和头像
   */
  const handleAvatar = async (e: any) => {
    console.log("handleAvatar", e.detail.avatarUrl);

    Taro.uploadFile({
      url: ApiUrl + "/upload",
      name: 'file',
      filePath: e.detail.avatarUrl,
      header: { Authorization: getLocalSync(TokenStore) },
      success: (res) => {
        const resp = JSON.parse(res.data);
        console.log("uploadFile-resp", resp);
        const userInfo = { ...user, avatar: resp.data }
        setUser(userInfo);
      },
      fail: (err) => {
        console.log("uploadFile-err", err);
      }
    })
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

  /**
   * 提交
   */
  const handleSumit = async () => {
    console.log("handleSumit", user);
    if (!MyRegEx.UserName.test(user.username)) {
      Taro.showToast({ title: '用户名格式不正确', icon: 'none' })
      return;
    }

    if (user.password?.length > 0) {
      if (user.password?.length < 6) {
        Taro.showToast({ title: '密码至少6位', icon: 'none' })
        return;
      }

      if (!MyRegEx.Password.test(user.password)) {
        Taro.showToast({ title: '密码格式不正确', icon: 'none' })
        return;
      }
    }

    const userInfo = { ...getLocalSync(UserInfoStore), ...user };
    const { data: { msg, code } } = await updateUserApi({ ...userInfo });
    if (code == 0) {
      Taro.showToast({ title: '更新成功', icon: 'success' })
      delete userInfo.password;
      setLocalSync(UserInfoStore, userInfo);
    } else {
      Taro.showToast({ title: msg, icon: 'none' })
    }
  }

  return (
    <MyLayout
      tabId={0}
      navBarClass={styles.navBarClass}
    >
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

        <View className={styles.content}>
          <View className={styles.title}>后台账号</View>

          <View className={styles.form}>
            <View className={styles.formItem}>
              <View className={styles.prefix}>用户名</View>
              <Input
                maxlength={20}
                type="nickname"
                placeholder="输入用户名(必填)"
                onBlur={(e) => setUser({ ...user, username: e.detail.value })}
                value={user.username}
              />
            </View>

            <View className={styles.formItem}>
              <View className={styles.prefix}>密&nbsp;&nbsp;&nbsp;码</View>
              <Input
                maxlength={20}
                type="text"
                password={!isShowPwd}
                placeholder="输入密码(默认密码123456)"
                onInput={(e) => setUser({ ...user, password: e.detail.value })}
                value={user.password}
              />
              <Image className={styles.eye} src={isShowPwd ? eye : eyeClose} onClick={() => { setIsShowPwd(!isShowPwd) }} />
            </View>

            <View className={styles.formItem}>
              <View className={styles.prefix}>头&nbsp;&nbsp;&nbsp;像</View>

              {/* 获取用户头像 */}
              <Button
                openType="chooseAvatar"
                onChooseAvatar={handleAvatar}
              >
                <Image src={user.avatar ? (ImageUrl + user.avatar) : defaultImg} />
              </Button>
            </View>
          </View>

          <Button plain type="primary" className={styles.update} onClick={handleSumit}>
            更新账号信息
          </Button>
        </View>

        {/* 获取用户手机号 */}
        {/* <Button type="primary" openType="getPhoneNumber" onGetPhoneNumber={getUserPhone}>获取手机号</Button> */}
      </View>
    </MyLayout>
  );
}

export default Index;
