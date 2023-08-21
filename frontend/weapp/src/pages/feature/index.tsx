import MyLayout from "@/components/myLayout";
import { Swiper, SwiperItem, View } from "@tarojs/components";
import { AtTimeline } from "taro-ui";
import styles from "./index.module.scss";

// index.config.ts
definePageConfig({});

const changeLog = [
  { title: "初始化项目", icon: "check-circle" },
  { title: "封装请求方法", icon: "check-circle" },
  { title: "审核小程序", icon: "clock" },
  { title: "调试后端接口", icon: "clock" },
  { title: "调试用户功能", icon: "clock" },
];

function Feature() {
  return (
    <MyLayout tabId={1}>
      <View className={styles.page}>
        <View className={styles.changeLog}>
          <View>更新日志</View>
          <AtTimeline className={styles.timeline} items={changeLog} />
        </View>

        <Swiper
          className={styles.swiper}
          indicatorColor="#999"
          indicatorActiveColor="#333"
          vertical={false}
          circular
          indicatorDots
          autoplay
        >
          <SwiperItem className={styles.swiperItem}>
            <View className="at-icon at-icon-file-audio" />
          </SwiperItem>
          <SwiperItem className={styles.swiperItem}>
            <View className="at-icon at-icon-file-code" />
          </SwiperItem>
          <SwiperItem className={styles.swiperItem}>
            <View className="at-icon at-icon-file-png" />
          </SwiperItem>
        </Swiper>
      </View>
    </MyLayout>
  );
}

export default Feature;
