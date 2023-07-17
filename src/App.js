import ReactEcharts from 'echarts-for-react';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/chart1';
import lastData from './lastData.json';
import paramsData2 from './params2.json';

// import paramsData from './params30h.json';
import Chart3 from './components/charts3';
import Chart4 from './components/chart4';
import Chart5 from './components/chart5';

const bc = new BroadcastChannel('my-awesome-site');

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
            <Link to='/'>Overlay</Link>
          </li>
          <li>
            <Link to='/demo2'>Stack</Link>
          </li>
          <li>
            <Link to='/demo3'>Overlay with timer</Link>
          </li>

          <li>
            <Link to='/demo4'>Overlay has Altitude</Link>
          </li>

          <li>
            <Link to='/demo5'>Overlay without Altitude</Link>
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
            <Chart4 />
          </Route>
          <Route path='/demo5'>
            <Chart5 />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
