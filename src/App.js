import ReactEcharts from 'echarts-for-react';
import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';
import ComponentA from './DroppableContainer';
import ChatIcon from './imgs/chat.png';
import lastData from './lastData.json';
import paramsData from './params1.json';
import paramsData2 from './params2.json';
import Chart3 from './components/charts3';

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
  const isGroupRef = useRef(false);

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

    const handleClick = (params) => {
      if (params.componentType === 'markPoint' && params.color === '#FF6700') {
        const chart = chartRef.current.getEchartsInstance();
        const option = chart.getOption();
        const index = option.xAxis[0].data.findIndex((item) => item === params.data.coord[0]);
        const max = option.xAxis[0].data.length;
        const percent = (100 * index) / max;

        setZoomRatio(0.04);

        const updatedOptions = {
          ...option,
          dataZoom: [
            {
              type: 'inside',
              start: percent - 0.02,
              end: percent + 0.02,
              showDetail: false,
              zoomLock: false,
              brushSelect: false,
            },
            {
              type: 'slider',
            },
          ],
        };

        // Update the chart options using setOption
        chart.setOption(updatedOptions);
      }
      //
    };

    // Call getZoomRatio initially
    getZoomRatio();

    // Attach getZoomRatio to the chart's zoom event
    const chartInstance = chartRef.current.getEchartsInstance();
    chartInstance.on('dataZoom', getZoomRatio);
    chartInstance.on('restore', handleReStore);
    chartInstance.on('click', handleClick);

    // Cleanup function to detach the event listener
    return () => {
      chartInstance.off('dataZoom', getZoomRatio);
      chartInstance.off('restore', handleReStore);
      chartInstance.off('click', handleClick);
    };
  }, []);

  useEffect(() => {
    if (zoomRatio > 50) {
      if (!isGroupRef.current) {
        const chartInstance = chartRef.current.getEchartsInstance();
        const updatedOption = chartInstance.getOption();

        console.log('check');
        updatedOption.series = updatedOption.series.map((item) => ({
          ...item,
          markPoint: {
            data: [
              {
                name: 'Custom',
                coord: ['21591-3', 2000],
                label: { show: true, formatter: '20' },
                symbolOffset: [10, -16],
                itemStyle: {
                  color: '#FF6700',
                },
              },
              {
                name: 'Custom2',
                coord: ['21632-4', 2000],
                label: { show: true, formatter: '20' },
                symbolOffset: [10, -16],
                itemStyle: {
                  color: '#FF6700',
                },
              },
            ],
          },
        }));
        chartInstance.setOption(updatedOption);
      }
      isGroupRef.current = true;
    } else {
      if (isGroupRef.current) {
        const chartInstance = chartRef.current.getEchartsInstance();
        const updatedOption = chartInstance.getOption();

        updatedOption.series = updatedOption.series.map((item) => ({
          ...item,
          markPoint: {
            data: [
              { name: 'Custom', coord: ['21632-4', 1000], symbol: `image://${ChatIcon}`, symbolSize: 20, symbolOffset: [10, -16] }, // Mark a custom data point
              { name: 'Custom', coord: ['21632-4', 2000], symbol: `image://${ChatIcon}`, symbolSize: 20, symbolOffset: [10, -16] }, // Mark a custom data point
              { name: 'Custom', coord: ['21632-4', 3000], symbol: `image://${ChatIcon}`, symbolSize: 20, symbolOffset: [10, -16] }, // Mark a custom data point
              { name: 'Custom', coord: ['21632-4', 4000], symbol: `image://${ChatIcon}`, symbolSize: 20, symbolOffset: [10, -16] }, // Mark a custom data point
              { name: 'Custom', coord: ['21632-4', 5000], symbol: `image://${ChatIcon}`, symbolSize: 20, symbolOffset: [10, -16] }, // Mark a custom data point
              { name: 'Custom', coord: ['21632-4', 6000], symbol: `image://${ChatIcon}`, symbolSize: 20, symbolOffset: [10, -16] }, // Mark a custom data point
              { name: 'Custom', coord: ['21632-4', 7000], symbol: `image://${ChatIcon}`, symbolSize: 20, symbolOffset: [10, -16] }, // Mark a custom data point
              { name: 'Custom', coord: ['21632-4', 8000], symbol: `image://${ChatIcon}`, symbolSize: 20, symbolOffset: [10, -16] }, // Mark a custom data point
              { name: 'Custom', coord: ['21632-4', 9000], symbol: `image://${ChatIcon}`, symbolSize: 20, symbolOffset: [10, -16] }, // Mark a custom data point
              { name: 'Custom', coord: ['21632-4', 10000], symbol: `image://${ChatIcon}`, symbolSize: 20, symbolOffset: [10, -16] }, // Mark a custom data point
              { name: 'Custom', coord: ['21632-4', 11000], symbol: `image://${ChatIcon}`, symbolSize: 20, symbolOffset: [10, -16] }, // Mark a custom data point
              { name: 'Custom', coord: ['21632-4', 12000], symbol: `image://${ChatIcon}`, symbolSize: 20, symbolOffset: [10, -16] }, // Mark a custom data point
              { name: 'Custom', coord: ['21632-4', 13000], symbol: `image://${ChatIcon}`, symbolSize: 20, symbolOffset: [10, -16] }, // Mark a custom data point
              { name: 'Custom', coord: ['21632-4', 14000], symbol: `image://${ChatIcon}`, symbolSize: 20, symbolOffset: [10, -16] }, // Mark a custom data point
              { name: 'Custom', coord: ['21632-4', 15000], symbol: `image://${ChatIcon}`, symbolSize: 20, symbolOffset: [10, -16] }, // Mark a custom data point
              { name: 'Custom', coord: ['21632-4', 16000], symbol: `image://${ChatIcon}`, symbolSize: 20, symbolOffset: [10, -16] }, // Mark a custom data point
              { name: 'Custom', coord: ['21632-4', 1700], symbol: `image://${ChatIcon}`, symbolSize: 20, symbolOffset: [10, -16] }, // Mark a custom data point
              { name: 'Custom', coord: ['21632-4', 18000], symbol: `image://${ChatIcon}`, symbolSize: 20, symbolOffset: [10, -16] }, // Mark a custom data point
              { name: 'Custom', coord: ['21632-4', 19000], symbol: `image://${ChatIcon}`, symbolSize: 20, symbolOffset: [10, -16] }, // Mark a custom data point
              { name: 'Custom', coord: ['21632-4', 20000], symbol: `image://${ChatIcon}`, symbolSize: 20, symbolOffset: [10, -16] }, // Mark a custom data point

              { name: 'Custom', coord: ['21591-3', 1000], symbol: `image://${ChatIcon}`, symbolSize: 20, symbolOffset: [10, -16] }, // Mark a custom data point
              { name: 'Custom', coord: ['21591-3', 2000], symbol: `image://${ChatIcon}`, symbolSize: 20, symbolOffset: [10, -16] }, // Mark a custom data point
              { name: 'Custom', coord: ['21591-3', 3000], symbol: `image://${ChatIcon}`, symbolSize: 20, symbolOffset: [10, -16] }, // Mark a custom data point
              { name: 'Custom', coord: ['21591-3', 4000], symbol: `image://${ChatIcon}`, symbolSize: 20, symbolOffset: [10, -16] }, // Mark a custom data point
              { name: 'Custom', coord: ['21591-3', 500], symbol: `image://${ChatIcon}`, symbolSize: 20, symbolOffset: [10, -16] }, // Mark a custom data point
              { name: 'Custom', coord: ['21591-3', 6000], symbol: `image://${ChatIcon}`, symbolSize: 20, symbolOffset: [10, -16] }, // Mark a custom data point
              { name: 'Custom', coord: ['21591-3', 7000], symbol: `image://${ChatIcon}`, symbolSize: 20, symbolOffset: [10, -16] }, // Mark a custom data point
              { name: 'Custom', coord: ['21591-3', 8000], symbol: `image://${ChatIcon}`, symbolSize: 20, symbolOffset: [10, -16] }, // Mark a custom data point
              { name: 'Custom', coord: ['21591-3', 9000], symbol: `image://${ChatIcon}`, symbolSize: 20, symbolOffset: [10, -16] }, // Mark a custom data point
              { name: 'Custom', coord: ['21591-3', 10000], symbol: `image://${ChatIcon}`, symbolSize: 20, symbolOffset: [10, -16] }, // Mark a custom data point
              { name: 'Custom', coord: ['21591-3', 11000], symbol: `image://${ChatIcon}`, symbolSize: 20, symbolOffset: [10, -16] }, // Mark a custom data point
              { name: 'Custom', coord: ['21591-3', 12000], symbol: `image://${ChatIcon}`, symbolSize: 20, symbolOffset: [10, -16] }, // Mark a custom data point
              { name: 'Custom', coord: ['21591-3', 13000], symbol: `image://${ChatIcon}`, symbolSize: 20, symbolOffset: [10, -16] }, // Mark a custom data point
              { name: 'Custom', coord: ['21591-3', 14000], symbol: `image://${ChatIcon}`, symbolSize: 20, symbolOffset: [10, -16] }, // Mark a custom data point
              { name: 'Custom', coord: ['21591-3', 1500], symbol: `image://${ChatIcon}`, symbolSize: 20, symbolOffset: [10, -16] }, // Mark a custom data point
              { name: 'Custom', coord: ['21591-3', 16000], symbol: `image://${ChatIcon}`, symbolSize: 20, symbolOffset: [10, -16] }, // Mark a custom data point
              { name: 'Custom', coord: ['21591-3', 17000], symbol: `image://${ChatIcon}`, symbolSize: 20, symbolOffset: [10, -16] }, // Mark a custom data point
              { name: 'Custom', coord: ['21591-3', 18000], symbol: `image://${ChatIcon}`, symbolSize: 20, symbolOffset: [10, -16] }, // Mark a custom data point
              { name: 'Custom', coord: ['21591-3', 19000], symbol: `image://${ChatIcon}`, symbolSize: 20, symbolOffset: [10, -16] }, // Mark a custom data point
              { name: 'Custom', coord: ['21591-3', 20000], symbol: `image://${ChatIcon}`, symbolSize: 20, symbolOffset: [10, -16] }, // Mark a custom data point
            ],
          },
        }));
        chartInstance.setOption(updatedOption);
      }
      isGroupRef.current = false;
    }
  }, [zoomRatio]);

  const xAxis = lastData.map((item) => item.frame);
  const xAxis2 = lastData.map((item) => item.time);

  const newXAxis = [...xAxis];
  const newXAxis2 = [...xAxis2];

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

    series: paramsData.slice(0, 2).map((item, index) => ({
      ...item,
      showSymbol: true,
      data: item.data.map((i) => ({ value: i, symbol: 'none' })),
      markPoint:
        index === 0
          ? {
              data: [
                {
                  name: 'Custom',
                  coord: ['21591-3', 2000],
                  label: { show: true, formatter: '20' },
                  symbolOffset: [10, -16],
                  itemStyle: {
                    color: '#FF6700',
                  },
                },
                {
                  name: 'Custom2',
                  coord: ['21632-4', 2000],
                  label: { show: true, formatter: '20' },
                  symbolOffset: [10, -16],
                  itemStyle: {
                    color: '#FF6700',
                  },
                },
              ],
            }
          : null,
    })),

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
      <div>
        Zoom Level: {Math.round((100 * 100) / zoomRatio)}% - {Math.round(zoomRatio)}
      </div>

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
          <li>
            <Link to='/demo3'>Demo 3</Link>
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
        </Switch>
      </div>
    </Router>
  );
}

export default App;
