import ReactEcharts from 'echarts-for-react';
import React, { useRef, useState } from 'react';
import '../App.css';
import lastData from '../lastData.json';
import paramsData from '../paramsHasAltitude.json';
import paramsWithoutAltitude from '../paramsWithoutAltitude.json';

export default function Home() {
  const chartRef = useRef(null);
  const [hour, setHour] = useState(2);
  const [series, setSeries] = useState(
    paramsData.map((item, index) => ({
      ...item,
      showSymbol: true,
      data: new Array(hour / 2)
        .fill(null)
        .map((item2) => {
          return item.data;
        })
        .flat()
        .map((i) => ({ value: i, symbol: 'none' })),
    }))
  );

  const [chartKey, setChartKey] = useState(0);

  const xAxis = lastData.map((item) => item.frame);
  const xAxis2 = lastData.map((item) => item.time);

  const customXAxisX = xAxis.map((item, index) => `${item}_${index}`);

  const newXAxis = [
    ...xAxis,
    ...new Array(hour / 2 - 1)
      .fill(null)
      .map((item2) => customXAxisX)
      .flat(),
  ];

  const newXAxis2 = [
    ...xAxis2,
    ...new Array(hour / 2 - 1)
      .fill(null)
      .map((item2) => xAxis2)
      .flat(),
  ];

  const options = {
    grid: { show: false },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        animation: false,
      },
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: 'none',
          icon: {
            back: 'none',
          },
        },
        restore: {},
      },
    },
    xAxis: [
      {
        type: 'category',
        data: newXAxis,
        splitLine: {
          show: true,
        },
        offset: 5,
      },
      {
        // type: 'category',
        data: newXAxis2,
        splitLine: {
          show: false,
        },
        offset: 10,
        axisTick: {
          show: false, // Hide the xAxis tick line
        },
        axisLine: {
          show: false, // Hide the xAxis line
        },
      },
    ],
    yAxis: {
      type: 'value',
      offset: 20,
      splitLine: {
        show: false,
      },
      // hide the yAxis line
      show: false,
    },
    series,
    dataZoom: [
      {
        type: 'slider',
        showDetail: false,
        zoomLock: false,
        brushSelect: false,
      },
      {
        type: 'inside',
      },
    ],
  };

  return (
    <ReactEcharts option={options} style={{ height: 540, paddingLeft: 50 }} ref={chartRef} opts={{ renderer: 'svg' }} key={chartKey} />
  );
}
