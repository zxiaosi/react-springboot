import MyLayout from "@/components/myLayout";
import { View } from "@tarojs/components";
import Taro, { useReady, useRouter } from "@tarojs/taro";
import { AtTimeline } from "taro-ui";
import styles from "./index.module.scss";

const changeLog = [
  { title: "初始化项目", icon: "check-circle", content: ["2023-07-25"] },
  { title: "封装请求方法", icon: "check-circle", content: ["2023-08-14"] },
  { title: "调试用户功能", icon: "check-circle", content: ["2023-08-21"] },
  { title: "调试图片功能", icon: "check-circle", content: ["2023-09-25"] },
  { title: "封装地图模块", icon: "check-circle", content: ["2023-10-09"] },
  { title: "封装echarts模块", icon: "check-circle", content: ["2023-10-11"] },
  { title: "封装拍照模块", icon: "clock" },
  { title: "消息订阅", icon: "clock" },
  { title: "权限拦截", icon: "clock" },
];

const Index = () => {
  const router = useRouter();

  const routerParams = JSON.parse(router?.params?.item || "{}");

  useReady(() => {
    console.log(routerParams);
  })

  return (
    <MyLayout
      isUseBgColor={true}
      leftIcon="chevron-left"
      title={routerParams?.name}
      backFunc={() => Taro.navigateBack()}
    >
      <View className={styles.changeLog}>
        <View>更新日志</View>
        <AtTimeline className={styles.timeline} items={changeLog} />
      </View>
    </MyLayout>
  )
}

export default Index;