import MyLayout from "@/components/myLayout";
import { View } from "@tarojs/components";

import styles from "./index.module.scss";

// index.config.ts
definePageConfig({});

function User() {
  return (
    <MyLayout>
      <View className={styles.pages}>我是用户页面</View>
    </MyLayout>
  );
}

export default User;
