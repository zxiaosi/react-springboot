import { View, Text } from "@tarojs/components";
import { AtButton, AtIcon } from "taro-ui";

import styles from "./index.module.scss";
import MyLayout from "@/components/myLayout";

// index.config.ts
definePageConfig({});

function Home() {
  return (
    <MyLayout>
      <View className={styles.pages}>
        <Text>Hello world!</Text>
        <AtIcon value="clock" size="30" color="#F00"></AtIcon>
        <AtButton loading type="primary">
          中文
        </AtButton>
      </View>
    </MyLayout>
  );
}

export default Home;
