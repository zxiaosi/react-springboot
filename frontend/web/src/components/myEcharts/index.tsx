import { useEffect, useRef } from "react";
import * as echarts from 'echarts';

const MyEcharts = () => {
  const echartsRef = useRef<HTMLDivElement>(null) as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    echarts?.init(echartsRef.current).setOption({
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫']
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36]
      }]
    })
  }, [])

  return <div ref={echartsRef} style={{ width: 800, height: 300 }} />
}

export default MyEcharts;