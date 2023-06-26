import lastData from './lastData.json';
import paramsData from './params.json';

import ReactEcharts from 'echarts-for-react';

export default function App() {
  const preventEventsHandler = () => {
    console.log('prevent events handler called');
  };

  const options = {
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: 'none',
        },
        restore: {},
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
    // dataZoom: [
    //   {
    //     type: 'inside',
    //     xAxisIndex: 0,
    //     filterMode: 'filter',
    //   },
    // ],
    dataZoom: [
      // {
      //   type: 'slider',
      // },
      {
        type: 'inside',
      },
      // {
      //   show: true,
      //   realtime: true,
      //   start: 30,
      //   end: 70,
      //   xAxisIndex: [0, 1],
      // },
      // {
      //   type: 'inside',
      //   realtime: true,
      //   start: 30,
      //   end: 70,
      //   xAxisIndex: [0, 1],
      // },
    ],

    // dataZoom: [
    //   {
    //     throttle: 50,
    //     type: 'inside',
    //   },
    // ],
    onClick: preventEventsHandler,
  };

  preventEventsHandler(); // Test if it logs correctly

  const onEvents = {
    click: preventEventsHandler, // Note: The event name should be lowercase 'click'
  };

  const handleDataZoom = (params) => {
    console.log('check');

    // setOptions(updatedOptions);
  };

  return (
    <ReactEcharts
      option={options}
      onEvents={{
        dataZoom: handleDataZoom,
      }}
    />
  );
}
