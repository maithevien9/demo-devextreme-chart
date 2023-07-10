import ReactEcharts from 'echarts-for-react';
import React, { useEffect, useRef, useState } from 'react';
import { DndProvider, useDrag } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import './App.css';
import lastData from './lastData.json';
import paramsData from './params.json';
import paramsData2 from './params2.json';
import Ruler from './Ruler';
import ComponentA from './DroppableContainer';
import echarts from 'echarts';
import styled from 'styled-components';

const Wrapper = styled.div`
  ${({ selectedFrame, start, end, position }) =>
    selectedFrame !== null &&
    `[clip-path="url(#zr0-c${selectedFrame ?? 1})"] {transform: translate(0%, ${2 + (position * 100) / 500}%) scale(1, ${
      (end - start) / 100
    }); }`}
`;

const bc = new BroadcastChannel('my-awesome-site');

function Home() {
  const chartRef = useRef(null);
  const [dataZoomEnabled, setDataZoomEnabled] = useState(false);
  const [zoomRatio, setZoomRatio] = useState(100);
  const [selectedFrame, setSelectedFrame] = useState(0);

  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(100);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const getZoomRatio = () => {
      const chart = chartRef.current.getEchartsInstance();
      const option = chart.getOption();
      const newZoomRatio = option.dataZoom[0].end - option.dataZoom[0].start;
      setZoomRatio(newZoomRatio);
    };

    const handleReStore = () => {
      setZoomRatio(100);
    };

    // Call getZoomRatio initially
    getZoomRatio();

    // Attach getZoomRatio to the chart's zoom event
    const chartInstance = chartRef.current.getEchartsInstance();
    chartInstance.on('dataZoom', getZoomRatio);
    chartInstance.on('restore', handleReStore);

    // Cleanup function to detach the event listener
    return () => {
      chartInstance.off('dataZoom', getZoomRatio);
      chartInstance.off('restore', handleReStore);
    };
  }, []);

  const xAxis = lastData.map((item) => item.frame);
  const xAxis2 = lastData.map((item) => item.time);

  const newXAxis = [...xAxis, ...xAxis, ...xAxis, ...xAxis, ...xAxis];
  const newXAxis2 = [...xAxis2, ...xAxis2, ...xAxis2, ...xAxis2, ...xAxis2];

  const options = {
    grid: { show: false },
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

    series: paramsData.slice(0, 2).map((item) => ({ ...item, showSymbol: false })),

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

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check if the keyboard shortcut is pressed (e.g., Ctrl + D)
      if (event.key === 'd') {
        if (!dataZoomEnabled) {
          const chartInstance = chartRef.current.getEchartsInstance();

          // Programmatically trigger the dataZoom selection
          chartInstance.dispatchAction({
            type: 'takeGlobalCursor',
            key: 'dataZoomSelect',
            dataZoomSelectActive: true,
          });
          setDataZoomEnabled(true);
        } else {
          const chartInstance = chartRef.current.getEchartsInstance();

          // Programmatically trigger the dataZoom selection
          chartInstance.dispatchAction({
            type: 'takeGlobalCursor',
            key: 'dataZoomSelect',
            dataZoomSelectActive: false,
          });
          setDataZoomEnabled(false);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [dataZoomEnabled]);

  return (
    <div>
      <div>Zoom Level: {100 - zoomRatio}%</div>

      <Wrapper selectedFrame={selectedFrame} start={start} end={end} position={position || -20}>
        <ReactEcharts option={options} style={{ height: 540, paddingLeft: 50 }} ref={chartRef} opts={{ renderer: 'svg' }} />
      </Wrapper>

      <div
        style={{
          width: 400,
          height: 50,
          display: 'flex',
          justifyContent: 'flex-start',
          paddingLeft: 80,
          position: 'absolute',
          top: 110,
          left: 0,
          paddingTop: 50,
        }}
      >
        <ComponentA start={start} end={end} setStart={setStart} setEnd={setEnd} position={position} setPosition={setPosition} />
      </div>
    </div>
  );
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
            <Link to='/'>Demo 1</Link>
          </li>
          <li>
            <Link to='/demo2'>Demo 2</Link>
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
        </Switch>
      </div>
    </Router>
  );
}

export default App;
