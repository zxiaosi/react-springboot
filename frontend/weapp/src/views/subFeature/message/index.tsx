import MyLayout from "@/components/myLayout";
import { View } from "@tarojs/components";
import Taro, { useReady, useRouter } from "@tarojs/taro";
import styles from "./index.module.scss";

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
        <View>服务通知</View>
      </View>
    </MyLayout>
  )
}

export default Index;