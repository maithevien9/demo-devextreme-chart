import lastData from './lastData.json';
import paramsData from './params.json';
import paramsData2 from './params2.json';

import { useState } from 'react';
import ReactEcharts from 'echarts-for-react';

import React, { useRef } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function Home() {
  const xAxis = lastData.map((item) => item.frame);
  const newXAxis = [...xAxis, ...xAxis, ...xAxis, ...xAxis, ...xAxis];
  const options = {
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: 'none',
        },
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: newXAxis,
    },
    yAxis: {
      type: 'value',
    },

    series: paramsData.map((item) => ({ ...item, showSymbol: false })),

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

  return <ReactEcharts option={options} style={{ height: 500 }} />;
}

function About() {
  const [startValue, setStartValue] = useState(0);
  const [endValue, setEndValue] = useState(9);

  const newArr = paramsData2.slice(startValue, endValue);

  const options2 = {
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
        },
      },
    },
    axisPointer: {
      link: [
        {
          xAxisIndex: 'all',
        },
      ],
    },
    dataZoom: [
      {
        show: true,
        realtime: true,
        xAxisIndex: newArr.map((item, index) => index),
        showDetail: false,
        zoomLock: false,
        brushSelect: false,
        bottom: 0,
        height: 20,
      },
      {
        type: 'inside',
        realtime: true,
        start: 30,
        end: 70,
        xAxisIndex: newArr.map((item, index) => index),
      },
    ],
    grid: newArr.map((item, index) => {
      if (index) {
        return { height: 150, top: 200 * index };
      }
      return { height: 150, top: 10 };
    }),
    xAxis: newArr.map((item, index) => {
      if (index) {
        return {
          gridIndex: index,
          type: 'category',
          boundaryGap: false,
          axisLine: { onZero: true },
          data: lastData.map((item) => item.frame),
        };
      }
      return { type: 'category', boundaryGap: false, axisLine: { onZero: true }, data: lastData.map((item) => item.frame) };
    }),

    yAxis: newArr.map((item, index) => {
      if (index) {
        return { type: 'value', gridIndex: index };
      }
      return { type: 'value', max: 500 };
    }),
    series: newArr.map((item, index) => ({ ...item, symbolSize: 8, xAxisIndex: index, yAxisIndex: index })),
  };

  return (
    <div>
      <ReactEcharts option={options2} style={{ height: 200 * newArr.length }} />
      <div style={{ margin: 20, display: 'flex', gap: 20, marginLeft: 300 }}>
        <button
          onClick={() => {
            if (startValue >= 9) {
              setEndValue((prev) => prev - 10);
              setStartValue((prev) => prev - 10);
            }
          }}
        >
          Prev Page
        </button>
        <button
          onClick={() => {
            if (paramsData2.length > endValue + 10) {
              setEndValue((prev) => prev + 10);
              setStartValue((prev) => prev + 10);
            }
          }}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to='/'>Demo 1</Link>
          </li>
          <li>
            <Link to='/demo2'>Demo 2</Link>
          </li>
        </ul>

        <hr />

        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/demo2'>
            <About />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
