import { View, Canvas, Image } from "@tarojs/components";
import Taro, { CanvasContext, useRouter } from "@tarojs/taro";
import { useRef, useState } from "react";
import MyLayout from "@/components/myLayout";
import TakePhotos from "@/components/takePhotos";
import defaultImg from "@/assets/images/default.png";
import styles from "./index.module.scss";

let timer: any = null; // 定时器

const Index = () => {
  const router = useRouter();

  const routerParams = JSON.parse(router?.params?.item || "{}");

  const [isOpenCamera, setIsOpenCamera] = useState(false);

  const [imgUrl, setImgUrl] = useState(""); // 图片地址

  const ctx = useRef<CanvasContext>(); // canvas 的绘图上下文实例

  const [canvasSize, setCanvasSize] = useState({ // canvas 大小
    width: 300, // 默认宽度
    height: 150, // 默认高度
  })

  /**
   * 预览图片
   */
  const handlePreviewImage = () => {
    Taro.previewImage({
      current: imgUrl, // 当前显示图片的http链接
      urls: [imgUrl], // 需要预览的图片http链接列表
    })
  }

  /**
   * 旋转图片
   */
  const handleRotateImage = () => {
    const { width, height } = canvasSize;

    ctx.current = Taro.createCanvasContext("canvasImg");
    ctx.current?.clearRect(0, 0, width, height);
    ctx.current?.translate(width / 2, height / 2); // 以图片中心为原点
    ctx.current?.rotate(Math.PI / 2); // 旋转90度
    ctx.current?.drawImage(imgUrl, -height / 2, -width / 2, height, width);

    ctx.current?.draw(false, () => {
      Taro.canvasToTempFilePath({
        canvasId: "canvasImg",
        fileType: "jpg",
        quality: 1,
        destWidth: height,
        destHeight: width,
        success: (res) => {
          setImgUrl(res.tempFilePath);
          setCanvasSize({ width: height, height: width });
        },
        fail: (err) => {
          console.log("旋转图片失败--", err);
        }
      })
    });
  }

  /**
   * 选择图片
   */
  const handleChooseImage = () => {
    Taro.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有，在H5浏览器端支持使用 `user` 和 `environment`分别指定为前后摄像头
      success: function (imgList) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        const newImgUrl = imgList.tempFilePaths[0];
        setImgUrl(newImgUrl);

        Taro.getImageInfo({
          src: newImgUrl,
          success: (res) => {
            console.log("handleChooseImage--res", res);
            setCanvasSize({ width: res.width, height: res.height }); // 提前设置 canvas 的宽高
          }
        })
      },
      fail: function (err) {
        console.log("选择图片失败", err);
      }
    })
  }

  /**
   * 接收子组件返回的值
   */
  const handleTakePhotos = (imgUrl) => {
    setImgUrl(imgUrl);
    setIsOpenCamera(false);
  }

  /**
   * 打开相机
   */
  const handleOpenCamera = () => {
    setIsOpenCamera(true)
  }

  /**
   * 防抖
   */
  const debounce = (fn: Function, delay: number) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn();
    }, delay);
  }

  return (
    <MyLayout
      isUseBgColor={true}
      leftIcon="chevron-left"
      title={routerParams?.name}
      backFunc={() => Taro.navigateBack()}
    >
      <View className={styles.page}>
        <View className={styles.showPicture} style={{ marginTop: 20 }}>
          <Image src={imgUrl || defaultImg} />
        </View>

        <View className={styles.btn}>
          <View className={`${styles.operate} ${!imgUrl && styles.disable}`} onClick={() => imgUrl && handlePreviewImage()}>预览图片</View>

          <View className={`${styles.operate} ${!imgUrl && styles.disable}`} onClick={() => imgUrl && debounce(handleRotateImage, 1000)}>旋转图片</View>

          <View className={styles.normal} onClick={handleChooseImage}>使用官方组件拍照</View>

          <View className={styles.custom} onClick={handleOpenCamera}>使用自定义组件拍照</View>
        </View>

        <Canvas canvasId='canvasImg' style={{ ...canvasSize, position: "fixed", left: "100%" }} />
      </View>

      {/* 防止组件提前加载 */}
      {
        isOpenCamera && <TakePhotos
          failFunc={() => setIsOpenCamera(false)}
          successFunc={handleTakePhotos}
        />
      }
    </MyLayout >
  )
}

export default Index;