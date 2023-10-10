import { View } from "@tarojs/components";
import Taro, { useLoad, useReady } from "@tarojs/taro";
import { useRef, useState } from 'react'
import styles from "./index.module.scss";

// @ts-ignore 
import * as echarts from "@/views/subEcharts/wxecharts/echarts";

/**
 * 文件版:
 *    简单使用：https://blog.csdn.net/m0_45236510/article/details/122840656
 *    延迟加载：https://github.com/ecomfe/echarts-for-weixin/blob/master/pages/lazyLoad/index.js
 * 
 * 插件版: 
 *    npm: https://www.npmjs.com/package/echarts-taro3-react echarts-taro3-react
 *    报错解决: https://github.com/Cecilxx/echarts-taro3-react/issues/34
 *    建议使用: https://www.npmjs.com/package/taro3-echarts-react taro3-echarts-react
 * 
 * 使用 文件版 注意:
 *    1. 从 https://github.com/ecomfe/echarts-for-weixin 下载 master 分支下的 ec-canvas
 *    2. 将 ec-canvas 文件夹放到 src/modules/wxecharts 下 (自定义, 结合 【3】})
 *    3. 需要在配置文件过滤掉 echarts 的包文件, 否则编译后找不到文件
 *       文件 copy 配置 https://taro.redwoodjs.cn/docs/config-detail#copy
 */

interface Props {
  id: string;   // dom id
  width?: number | string; // 图表宽度 
  height?: number | string; // 图表高度
  delay?: number; // 延时时间(过多长时间之后获取dom)
  option: (chart: any) => void; // 配置项(返回一个对象)
}

/**
 * 自定义 echart 组件
 * @param props {@link Props}
 */
const MyEcharts = (props: Props) => {
  const { id, width = "100%", height = "300rpx", delay = 200, option } = props;

  const chart = useRef<any>(); // echarts实例

  useReady(() => {
    const { page } = Taro.getCurrentInstance();

    setTimeout(() => {
      // @ts-ignore
      const echartsDom = page?.selectComponent("#" + id);
      console.log("echartsDom", echartsDom);
      initChart(echartsDom);
    }, delay);
  })

  useLoad(() => {
    console.log("echart组件销毁了");
    dispose();
  })

  const initChart = (echartsDom: any) => {
    echartsDom.init((canvas: any, width: any, height: any, dpr: any) => {
      const echartsDom = echarts.init(canvas, null, { width: width, height: height, dpr: dpr });

      option?.(echartsDom);

      // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
      chart.current = echartsDom;

      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return echartsDom;
    })
  }

  const dispose = () => {
    chart.current?.dispose();
  }

  return (
    <View className={styles.echarts} style={{ width, height }}>
      {/* 将 lazyLoad 设为 true 后，需要手动初始化图表 */}
      {/* @ts-ignore */}
      <ec-canvas id={id} canvas-id={id} ec={{ lazyLoad: true }} />
    </View>
  )

}

export default MyEcharts;