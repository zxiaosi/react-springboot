import { View } from "@tarojs/components";
import Taro, { useReady, useUnload } from "@tarojs/taro";
import { useRef } from 'react'
import styles from "./index.module.scss";

// @ts-ignore 
import * as echarts from "@/views/subEcharts/wxecharts/echarts";

/**
 * 文件版:
 *    简单使用: https://blog.csdn.net/m0_45236510/article/details/122840656
 *    延迟加载: https://github.com/ecomfe/echarts-for-weixin/blob/master/pages/lazyLoad/index.js
 *    报错解决: https://github.com/NervJS/taro/issues/9986#issuecomment-980821588
 * 
 * 插件版: 
 *    npm: https://www.npmjs.com/package/echarts-taro3-react echarts-taro3-react
 *    报错解决: https://github.com/Cecilxx/echarts-taro3-react/issues/34
 *    建议使用: https://www.npmjs.com/package/taro3-echarts-react taro3-echarts-react
 * 
 * 使用 文件版 注意:
 *    1. 从 https://github.com/ecomfe/echarts-for-weixin 下载 master 分支下的 ec-canvas
 *    2. 将 ec-canvas 文件夹放到 src/modules/wxecharts 下 (自定义, 结合 【3】})
 *    3. 需要在配置文件中复制 ec-canvas.wxml 文件到分包中 (Taro 好像不编译 wxml 文件)
 *       文件 copy 配置 https://taro.redwoodjs.cn/docs/config-detail#copy
 *    
 *    开启 canvas 新的渲染方式: ec-canvas.js -> isUseNewCanvas 为 true
 */

interface Props {
  id: string;   // dom id
  width?: number | string; // 图表宽度 
  height?: number | string; // 图表高度
  delay?: number; // 延时时间(过多长时间之后获取dom)
  customClass?: any; // 自定义样式类名
  optionFunc: (chart: any) => void; // 配置项(返回一个对象)
}

/**
 * 自定义 echart 组件
 * @param props {@link Props}
 */
const MyEcharts = (props: Props) => {
  const { id, width = "100%", height = "300px", delay = 200, customClass, optionFunc } = props;

  const ec = {
    lazyLoad: true, // 将 lazyLoad 设为 true 后，需要手动初始化图表
  }

  const chartInstance = useRef<any>(); // echarts实例

  useReady(() => {
    const { page } = Taro.getCurrentInstance();

    setTimeout(() => { // 防止获取不到dom
      // @ts-ignore
      const ecComponent = page?.selectComponent("#" + id); // 获取ec-canvas组件
      console.log("ecComponent", ecComponent);

      initChart(ecComponent);
    }, delay)
  })

  useUnload(() => {
    console.log("echart组件销毁了");
    dispose();
  })

  /**
   * 初始化图表
   * @param ecComponent ec-canvas组件
   */
  const initChart = (ecComponent: any) => {

    // ec-canvas 的初始化
    ecComponent.init((canvas: any, width: any, height: any, dpr: any) => { // 获取组件的 canvas、width、height、像素比后的回调函数

      // echarts 的初始化
      const chart = echarts.init(canvas, null, { width, height, devicePixelRatio: dpr });

      // 向 echart 图表添加配置项
      optionFunc?.(chart);

      // 将图表实例绑定到 chartInstance 上，可以在其他成员函数（如 dispose）中访问
      chartInstance.current = chart;

      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    })
  }

  /**
   * 图表销毁
   */
  const dispose = () => {
    chartInstance.current?.dispose();
  }

  return (
    <View className={`${styles.echarts} ${customClass}`} style={{ width, height }}>
      {/* @ts-ignore */}
      <ec-canvas id={id} canvas-id={id} ec={ec} />
    </View>
  )

}

export default MyEcharts;