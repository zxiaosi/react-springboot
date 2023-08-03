import MyLayout from "@/components/myLayout";
import { View } from "@tarojs/components";

import styles from "./index.module.scss";

// index.config.ts
definePageConfig({});

function Feature() {
  return (
    <MyLayout tabId={1}>
      <View className={styles.pages}>这是功能页面</View>
    </MyLayout>
  );
}

export default Feature;
