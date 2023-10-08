import MyNavBar from "@/components/myNavBar";
import { View } from "@tarojs/components";
import Taro, { useReady, useRouter } from "@tarojs/taro";
import { AtTimeline } from "taro-ui";
import styles from "./index.module.scss";

const changeLog = [
  { title: "初始化项目", icon: "check-circle" },
  { title: "封装请求方法", icon: "check-circle" },
  { title: "审核小程序", icon: "check-circle" },
  { title: "调试后端接口", icon: "check-circle" },
  { title: "调试用户功能", icon: "check-circle" },
  { title: "权限拦截", icon: "clock" },
  { title: "开始业务详情", icon: "clock" },
];

const Index = () => {
  const router = useRouter();

  const routerParams = JSON.parse(router?.params?.item || "{}");

  useReady(() => {
    console.log(routerParams);
  })

  return (
    <>
      <MyNavBar
        isUseBgColor={true}
        leftIcon="chevron-left"
        title={routerParams?.name}
        backFunc={() => Taro.navigateBack()}
      />

      <View className={styles.changeLog}>
        <View>更新日志</View>
        <AtTimeline className={styles.timeline} items={changeLog} />
      </View>
    </>

  )
}

export default Index;