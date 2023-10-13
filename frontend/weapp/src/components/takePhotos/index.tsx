import { Camera, PageContainer, View } from "@tarojs/components";
import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import { checkAuth } from "@/utils/handleMap";

interface Props {
  failFunc: (data?: any) => any; // 用户拒绝授权
  successFunc: (data?: any) => any; // 父组件点击事件
}

/**
 * 拍照组件
 * @param props {@link Props}
 */
const TakePhotos = (props: Props) => {
  const { successFunc, failFunc } = props;

  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    console.log("----开始加载拍照组件----");

    checkAuth(
      "scope.camera",
      () => {
        console.log("相机权限已经授权！！！");
        setIsAuth(true);
      },
      () => {
        Taro.showModal({
          title: '授权提示',
          content: ' 请在右上角的设置中打开摄像头',
          success: function (res) {
            if (res.confirm) {
              Taro.openSetting({}); // 打开设置
            } else {
              console.log('用户取消授权')
            }
            failFunc?.(res);
          }
        })
      }
    )
  }, [])

  /**
   * 拍照
   */
  const takePhoto = () => {
    console.log("----用户拍照了----");

    // 创建相机对象
    const ctx = Taro.createCameraContext();

    ctx.takePhoto({
      quality: "high",
      success: async (res) => {
        console.log("成功拍照--", res.tempImagePath);
        successFunc?.(res.tempImagePath);
      },
      fail: (err) => {
        console.log("拍照失败--", err)
        failFunc?.(err);
      },
      complete: () => {
        // 无论拍照或者上传是否成功都关闭拍照模块
        setIsAuth(false);
      }
    });
  }

  return (
    <PageContainer
      show={isAuth}
      zIndex={9999}
      duration={1000}
      overlayStyle={"background: linear-gradient(90deg, #74DACE, #4DA1FC);"}
      customStyle={"background: none;"}
      onBeforeLeave={failFunc}
    >
      <Camera
        flash="off"
        devicePosition="back"
        className={styles.camera}
      >
        <View className={styles.text}>自定义文案 (～￣▽￣)～</View>

        <View className={styles.circleSmall} onClick={takePhoto}>
          <View className={styles.circleBig} />
        </View>
      </Camera>
    </PageContainer>
  );
}

export default TakePhotos;