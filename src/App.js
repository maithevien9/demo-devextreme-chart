import lastData from './lastData.json';
import paramsData from './params.json';

import ReactEcharts from 'echarts-for-react';

export default function App() {
  const options = {
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: lastData.map((item) => item.frame),
    },
    yAxis: {
      type: 'value',
    },
    series: paramsData.map((item) => ({ ...item, showSymbol: false })),
    dataZoom: [
      {
        throttle: 50,
        type: 'inside',
      },
    ],
  };

  return <ReactEcharts option={options} />;
}
