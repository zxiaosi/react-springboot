import MyEcharts from "@/components/myEcharts";
import MyLayout from "@/components/myLayout";
import { useRouter } from "@tarojs/taro";
import Taro from "@tarojs/taro";
import styles from "./index.module.scss";
import { View } from "@tarojs/components";
import img1 from "./3D/starfield.jpg"
import img2 from "./3D/world.topo.bathy.200401.jpg"
import hdr1 from "./3D/pisa.hdr"

definePageConfig({
  // 使用echarts一定要先导入, 否则导致拿不到dom (会导致 useReady 出现问题)
  usingComponents: { "ec-canvas": "@/views/subEcharts/wxecharts/ec-canvas" },
});

const Index = () => {
  const router = useRouter();

  // const routerParams = JSON.parse(router?.params?.item || "{}");

  // 柱状图配置
  const barOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'          // 默认为直线，可选为：'line' | 'shadow'
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
        data: [] as any,
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
        data: [] as any,
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
        data: [] as any,
        itemStyle: {
        }
      }
    ]
  };

  // 折线图配置
  const lineOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: [] as any
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [] as any
  };

  /**
   * 饼状图配置
   */
  const pieOption = {
    legend: {
      top: 'bottom'
    },
    series: [
      {
        type: 'pie',
        radius: [25, 125],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: [] as any
      }
    ]
  }

  /**
   * 初始化折线图数据
   */
  const lineEchartsData = (chart) => {
    const legendData = ['邮箱', '广告', '视频', '搜索引擎'];

    const seriesData = [
      [120, 132, 101, 134, 90, 230, 210],
      [220, 182, 191, 234, 290, 330, 310],
      [150, 232, 201, 154, 190, 330, 410],
      [820, 932, 901, 934, 1290, 1330, 1320]
    ]

    const seriesList = legendData.map((legend: string, idx: number) => {
      const series = {
        name: legend,
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        data: seriesData[idx]
      }

      if (idx == legendData.length - 1) {
        return { ...series, label: { show: true, position: 'top' } };
      } else {
        return series;
      }

    });

    lineOption.legend.data = legendData;
    lineOption.series = seriesList;

    chart.setOption(lineOption);
  }

  /**
  * 初始化柱状图数据
  * @param chart 
  */
  const barEchartsData = (chart) => {
    // 测试数据
    const dataArr = [
      [300, 270, 340, 344, 300, 320, 310],
      [120, 102, 141, 174, 190, 250, 220],
      [-20, -32, -21, -34, -90, -130, -110]
    ];

    barOption.series.map((item, idx) => {
      item.data = dataArr[idx];
    });

    chart.setOption(barOption);
  }

  /**
   * 初始化饼状图数据
   * @param chart
   */
  const pieEchartsData = (chart) => {
    const seriesData = [
      { value: 40, name: 'rose 1' },
      { value: 38, name: 'rose 2' },
      { value: 32, name: 'rose 3' },
      { value: 30, name: 'rose 4' },
      { value: 28, name: 'rose 5' },
      { value: 26, name: 'rose 6' },
      { value: 22, name: 'rose 7' },
      { value: 18, name: 'rose 8' }
    ]

    pieOption.series[0].data = seriesData;

    chart.setOption(pieOption);
  }
  return (
    <MyLayout
      isUseBgColor={true}
      leftIcon="chevron-left"
      // title={routerParams?.name}
      title={"图表"}
      backFunc={() => Taro.navigateBack()}
    >
      <View className={styles.lineChart}>
        <View className={styles.title}>折线图</View>
        <MyEcharts id="line" customClass={styles.chart} optionFunc={lineEchartsData} />
      </View>

      <View className={styles.barChart}>
        <View className={styles.title}>柱状图</View>
        <MyEcharts id="bar" customClass={styles.chart} delay={1000} optionFunc={barEchartsData} />
      </View>

      <View className={styles.pieChart}>
        <View className={styles.title}>饼状图</View>
        <MyEcharts id="pie" customClass={styles.chart} delay={2000} height={"400px"} optionFunc={pieEchartsData} />
      </View>
    </MyLayout >
  )

}

export default Index;