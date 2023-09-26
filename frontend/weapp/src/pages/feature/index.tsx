import MyLayout from "@/components/myLayout";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import styles from "./index.module.scss";

// index.config.ts
definePageConfig({});

const catalogList = [
  { id: 1, name: "更新日志", icon: "bell", url: "/pages/subFeature/changeLog/index" },
  { id: 2, name: "echart图", icon: "calendar", url: "" },
  { id: 3, name: "地图", icon: "map-pin", url: "" },
  { id: 4, name: "拍照", icon: "camera", url: "" },
]

const Index = () => {

  const handleCatalog = (item) => {
    if (item.url) {
      Taro.navigateTo({ url: item.url + `?item=${JSON.stringify(item)}` });
    } else {
      Taro.showToast({ title: '功能正在开发中...', icon: 'none' });
    }
  }

  return (
    <MyLayout
      tabId={1}
      navBarClass={styles.navBarClass}
    >
      <View className={styles.page}>
        {
          catalogList.map((catalog) => (
            <View key={catalog.id} className={styles.catalog} onClick={() => handleCatalog(catalog)}>
              <View className={styles.left}>
                <View className={`at-icon at-icon-${catalog.icon} ${styles.icon}`} />
                <View className={styles.name} >{catalog.name}</View>
              </View>

              <View className={`at-icon at-icon-chevron-right ${styles.right}`} />
            </View>
          ))
        }
      </View>
    </MyLayout>
  );
}

export default Index;
