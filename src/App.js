import ReactEcharts from 'echarts-for-react';
import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/chart1';
import lastData from './lastData.json';
import paramsData2 from './params2.json';

// import paramsData from './params30h.json';
import Chart3 from './components/charts3';
import CheckAltitude from './components/checkAltitude.js';
import styled from 'styled-components';

const Wrapper = styled.div`
  [fill='black'] {
    background: red !important;
    color: blue !important;
  }
`;

const bc = new BroadcastChannel('my-awesome-site');

function About() {
  const [startValue, setStartValue] = useState(0);
  const [endValue, setEndValue] = useState(9);
  const chartRef = useRef(null);

  const newArr = paramsData2.slice(startValue, endValue);

  const handleChartClick = (params) => {
    if (params.componentType === 'markLine') {
      const chart = chartRef.current.getEchartsInstance();
      const option = chart.getOption();
      const index = option.xAxis[0].data.findIndex((item) => item === params.data.coord[0]);
      const max = option.xAxis[0].data.length;
      const percent = (100 * index) / max;

      const updatedOptions = {
        ...option,
        dataZoom: [
          {
            type: 'slider',
            showDetail: false,
            zoomLock: false,
            brushSelect: false,
            start: percent - 0.02,
            end: percent + 0.02,
          },
          {
            type: 'inside',
          },
        ],
      };

      // Update the chart options using setOption
      chart.setOption(updatedOptions);
    }
  };

  React.useEffect(() => {
    const chartInstance = chartRef.current.getEchartsInstance();

    // Add the click event listener to the chart instance
    chartInstance.on('click', handleChartClick);

    // Clean up the chart instance on unmount
    return () => {
      chartInstance.off('click', handleChartClick);
    };
  }, []);

  const series = newArr.map((item, index) => ({
    ...item,
    xAxisIndex: index,
    yAxisIndex: index,
    showSymbol: false,
    markLine: {
      data:
        index === 8
          ? [
              {
                label: {
                  formatter: '{b}',
                  backgroundColor: 'black',
                  borderRadius: 100,
                  color: 'black',
                  width: 10,
                  height: 10,
                  position: 'start',
                  distance: 20,
                },
                name: 'ii',
                xAxis: '21632-3',
              },
              {
                label: {
                  formatter: '{b}',
                  backgroundColor: 'red',
                  borderRadius: 100,
                  color: 'red',
                  width: 10,
                  height: 10,
                  position: 'start',
                  distance: 20,
                },
                name: 'ii',
                xAxis: '21232-3',
              },
            ]
          : [],
      lineStyle: {
        color: 'white',
      },
      label: {
        distance: 20,
      },
    },
  }));

  const options2 = {
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
      // if (index) {
      return {
        gridIndex: index,
        boundaryGap: false,
        axisLine: { onZero: true },
        data: lastData.map((item) => item.frame),
        type: 'category',
        axisLabel: {
          color: index === 8 ? 'black' : 'white',
        },
        axisPointer: {
          show: true,
          lineStyle: {
            color: '#FF6700', // Customize the color of the split lines
            type: 'solid', // Choose the type of line (solid, dashed, dotted, etc.)
            // ... other lineStyle options
          },
        },
        splitLine: {
          show: true, // Set to false to hide the default split lines
          lineStyle: {
            type: 'solid', // Choose the type of line (solid, dashed, dotted, etc.)
            // ... other lineStyle options
          },
        },
        offset: 0,
      };
    }),

    yAxis: newArr.map((item, index) => {
      return {
        type: 'value',
        gridIndex: index,
        offset: 20,
        splitLine: {
          show: false,
        },
        show: false,
      };
    }),
    series,
  };

  const option3 = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      boundaryGap: false,
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
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [150, 230, 224, null, 135, 147, 260],
        type: 'line',
        markLine: {
          lineStyle: {
            color: 'white',
          },

          label: {
            formatter: '{b}',
            backgroundColor: 'black',
            borderRadius: 100,
            color: 'black',
            width: 20,
            height: 20,
          },
          data: [
            {
              name: 'ii',
              xAxis: 'Thu',
            },
          ],
        },
      },
    ],
  };

  return (
    <Wrapper>
      <ReactEcharts option={options2} style={{ height: 200 * newArr.length }} opts={{ renderer: 'svg' }} ref={chartRef} />
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
    </Wrapper>
  );
}

function App() {
  useEffect(() => {
    bc.onmessage = (event) => {
      if (event.data === 'Event') {
        // console.log('check');
      }
    };
  }, []);

  return (
    // <DndProvider backend={HTML5Backend}>
    <Router>
      <div>
        <ul>
          <li>
            <Link to='/'>Overlay</Link>
          </li>
          <li>
            <Link to='/demo2'>Stack</Link>
          </li>
          <li>
            <Link to='/demo3'>Overlay with timer</Link>
          </li>

          <li>
            <Link to='/demo4'>Check Altitude</Link>
          </li>
        </ul>

        {/* <button
          onClick={() => {
            // bc.postMessage('Event');
            var win = window.open('about:blank', '_self');
            win.close();
            bc.postMessage('Event');
          }}
        >
          Trigger
        </button> */}

        <hr />

        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/demo2'>
            <About />
          </Route>
          <Route path='/demo3'>
            <Chart3 />
          </Route>
          <Route path='/demo4'>
            <CheckAltitude />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
