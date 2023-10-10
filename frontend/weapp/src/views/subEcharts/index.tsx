import MyEcharts from "@/components/myEcharts";
import MyLayout from "@/components/myLayout";
import { useRouter } from "@tarojs/taro";
import Taro from "@tarojs/taro";
import styles from "./index.module.scss";
import { getNavBarHeight } from "@/utils";

definePageConfig({
  // 使用echarts一定要先导入, 否则导致拿不到dom (会导致 useReady 出现问题)
  usingComponents: { "ec-canvas": "@/views/subEcharts/wxecharts/ec-canvas" },
});

const { statusBarHeight, navHeight } = getNavBarHeight(); // 顶部状态栏高度

const Index = () => {
  const router = useRouter();

  const routerParams = JSON.parse(router?.params?.item || "{}");

  const echartsOption = (data1: any, data2: any, data3: any) => {
    let option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data: ['热度', '正面', '负面']
      },
      grid: {
        left: 20,
        right: 20,
        bottom: 15,
        top: 40,
        containLabel: true
      },
      xAxis: [
        {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisLabel: {
            color: '#666'
          }
        }
      ],
      yAxis: [
        {
          type: 'category',
          axisTick: { show: false },
          data: ['汽车之家', '今日头条', '百度贴吧', '一点资讯', '微信', '微博', '知乎'],
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisLabel: {
            color: '#666'
          }
        }
      ],
      series: [
        {
          name: '热度',
          type: 'bar',
          label: {
            normal: {
              show: true,
              position: 'inside'
            }
          },
          data: data1,
          itemStyle: {
            // emphasis: {
            //   color: '#37a2da'
            // }
          }
        },
        {
          name: '正面',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true
            }
          },
          data: data2,
          itemStyle: {
            // emphasis: {
            //   color: '#32c5e9'
            // }
          }
        },
        {
          name: '负面',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'left'
            }
          },
          data: data3,
          itemStyle: {
            // emphasis: {
            //   color: '#67e0e3'
            // }
          }
        }
      ]
    };

    return option;
  }

  const initEchartsData = (chart) => {
    // 测试数据
    let dataArr = [
      [300, 270, 340, 344, 300, 320, 310],
      [120, 102, 141, 174, 190, 250, 220],
      [-20, -32, -21, -34, -90, -130, -110]
    ];

    let option = echartsOption(dataArr[0], dataArr[1], dataArr[2]);
    chart.setOption(option);
  }

  return (
    <MyLayout
      isUseBgColor={true}
      leftIcon="chevron-left"
      title={routerParams?.name}
      backFunc={() => Taro.navigateBack()}
    >
      <MyEcharts
        id="echarts"
        height={`calc(100vh - ${statusBarHeight + navHeight}px)`}
        option={initEchartsData}
      />
    </MyLayout>
  )

}

export default Index;