import ReactEcharts from 'echarts-for-react';
import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/chart1';
import lastData from './lastData.json';
import paramsData2 from './params2.json';
import Sroll from './components/Sroll';
import { debounce } from 'lodash-es';

// import paramsData from './params30h.json';
import Chart3 from './components/charts3';
import CheckAltitude from './components/checkAltitude.js';
import styled from 'styled-components';

const height = window.innerHeight - 250;
const chartHeight = 240;
const parametersMax = 15;

const chartsOnSCreen = Math.floor(height / chartHeight);

const Scroll = styled.div`
  position: absolute;
  top: 150px;
  right: 10px;

  header {
    font-family: 'Lobster', cursive;
    text-align: center;
    font-size: 25px;
  }

  #info {
    font-size: 18px;
    color: #555;
    text-align: center;
    margin-bottom: 25px;
  }

  a {
    color: #074e8c;
  }

  .scrollbar {
    margin-left: 30px;
    float: left;
    height: ${height}px;
    width: 105px;
    background: #f5f5f5;
    overflow-y: scroll;
    margin-bottom: 25px;
  }

  .force-overflow {
    min-height: ${(parametersMax * height) / 3}px;
    background: white;
  }

  #wrapper {
    text-align: center;
    width: 500px;
    margin: auto;
  }

  /*
 *  STYLE 1
 */

  #style-1::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: white;
  }

  #style-1::-webkit-scrollbar {
    width: 12px;
    background-color: #f5f5f5;
  }

  #style-1::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #555;
  }
`;

const Wrapper = styled.div`
  padding-top: 10;

  [fill='black'] {
    background: red !important;
    color: blue !important;
  }
`;

const bc = new BroadcastChannel('my-awesome-site');

function About() {
  const chartHeight = (height - 70 - (chartsOnSCreen - 1) * 100) / chartsOnSCreen;

  const [position, setPosition] = useState({ start: 0, end: chartsOnSCreen });
  const distanceParams = 100;
  const [chartKey, setChartKey] = useState(0);

  const debouncedPosition = debounce((value) => {
    setPosition(value);
    setChartKey((prev) => prev + 1);
  }, 100);

  const [startValue, setStartValue] = useState(0);
  const [endValue, setEndValue] = useState(parametersMax);
  const chartRef = useRef(null);

  const patinatedParams = paramsData2.slice(startValue, endValue);

  const newArr = patinatedParams.slice(position.start, position.end);

  const lastIndex = chartsOnSCreen - 1;

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
        height: 30,
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
      if (index === 1) {
        return { height: chartHeight, top: chartHeight + distanceParams };
      }
      if (index) {
        return { height: chartHeight, top: (chartHeight + distanceParams) * index };
      }
      return { height: chartHeight, top: 30 };
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
          color: index === lastIndex ? 'black' : 'white',
          opacity: index === lastIndex ? 1 : 0,
        },
        axisPointer: {
          show: true,
          lineStyle: {
            color: '#FF6700', // Customize the color of the split lines
            type: 'solid', // Choose the type of line (solid, dashed, dotted, etc.)
            // ... other lineStyle options
          },
          label: {
            show: false,
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
          show: true, // Set to false to hide the default split lines
          lineStyle: {
            type: 'solid', // Choose the type of line (solid, dashed, dotted, etc.)
            // ... other lineStyle options
          },
        },
        show: true,
      };
    }),
    series,
    graphic: series.map((item, index) => ({
      type: 'text',
      left: 150,
      top: index ? (index === 1 ? chartHeight + 60 : (chartHeight + 80) * index) : 0, // Specify the y-coordinate (in pixels) of the text
      style: {
        text: item.name, // The text you want to display
        fill: 'black', // The color of the text
        font: 'bold 16px Arial', // The font style of the text
      },
    })),
  };

  // console.log({ startPosition, endPosition });

  const handleScroll = (event) => {
    const { scrollTop, scrollHeight, clientHeight } = event.target;
    // const maxScrollTop = scrollHeight - clientHeight;
    // const end = maxScrollTop - scrollTop;

    debouncedPosition({
      start: Math.floor((parametersMax * scrollTop) / scrollHeight),
      end: Math.floor((parametersMax * scrollTop) / scrollHeight) + chartsOnSCreen,
    });

    // console.log('check', parametersMax * (1 - end / scrollHeight));
  };

  return (
    <Wrapper>
      <ReactEcharts option={options2} style={{ height: height }} opts={{ renderer: 'svg' }} ref={chartRef} key={chartKey} />
      <Sroll />

      <div style={{ margin: 20, display: 'flex', gap: 20, marginLeft: 300 }}>
        <button
          style={{ height: 30 }}
          onClick={() => {
            if (startValue >= parametersMax) {
              setEndValue((prev) => prev - 10);
              setStartValue((prev) => prev - 10);
            }
          }}
        >
          Prev Page
        </button>

        <Scroll>
          <div className='scrollbar' id='style-1' onScroll={handleScroll}>
            <div className='force-overflow'></div>
          </div>
        </Scroll>

        <button
          style={{ height: 30 }}
          onClick={() => {
            if (paramsData2.length > endValue + 10) {
              setEndValue((prev) => prev + 10);
              setStartValue((prev) => prev + 10);
            }
          }}
        >
          Next Page
        </button>

        <div>
          Note:
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 6 }}>
              <div style={{ height: 10, width: 10, background: 'red', borderRadius: 100 }} /> <span>Bad Data</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 6 }}>
              <div style={{ height: 10, width: 10, background: 'black', borderRadius: 100 }} /> <span>No Data</span>
            </div>
          </div>
        </div>
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
