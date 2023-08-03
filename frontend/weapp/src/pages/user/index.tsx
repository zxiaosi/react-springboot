import MyLayout from "@/components/myLayout";
import { View } from "@tarojs/components";

import styles from "./index.module.scss";

// index.config.ts
definePageConfig({});

function User() {
  return (
    <MyLayout tabId={2}>
      <View className={styles.pages}>这是我的页面</View>
    </MyLayout>
  );
}

export default User;
