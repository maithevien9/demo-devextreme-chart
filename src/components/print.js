import ReactEcharts from 'echarts-for-react';
import lastData from '../lastData.json';
import paramsData from '../paramsHasAltitude.json';
import React, { useState, useRef } from 'react';
import styles from 'styled-components';

const Ruler = styles.div`
ol,
li {
  /* removing the default list counters/markers: */
  list-style-type: none;
}

ol {
  /* resetting the counter so every <ol>
     has an independent count: */
  counter-reset: marker;
  display: flex;
  flex-direction: column-reverse;
}

li {
  /* 'real world' measurements are perhaps not
     entirely faithful on screen: */
  height: 0.5cm;
  border-bottom: 1px solid #000;
  /* including the border in the height of the element: */
  box-sizing: border-box;
  width: 1.5em;
  /* incrementing the counter: */
  counter-increment: marker;
  /* to position the counter relative
     to the <li>: */
  position: relative;
  border-left: 2px solid #000;
}

li:first-child,
li:nth-child(5n) {
  /* longer mark for the first and
     every fifth marker: */
  width: 1em;
}

/* preventing a 'tail' on the <ol> from the
   height of the last <li> (the counter is
   displayed at the top, not the bottom): */
li:last-child {
  height: 0;
}

li:first-child::after,
li:nth-child(5n)::after {
  /* positioning the pseudo-element that
     contains the counter: */
  position: absolute;
  /* vertically-centering it alongside the
     top border: */
  top: -0.5em;
  /* moving it the full width of the element,
     outside of the right side of the element: */
  left: 100%;
  height: 1em;
  line-height: 1em;
  width: 2em;
  text-align: center;
  /* specifying the counter to use: */
  content: counter(marker);
}
`;

export default function Print() {
  const xAxis = lastData.map((item) => item.frame);
  const xAxis2 = lastData.map((item) => item.time);
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

  const secondaryOptions = {
    grid: {
      show: false,
    },

    xAxis: [
      {
        type: 'category',
        data: newXAxis,
        boundaryGap: false,
        axisPointer: {
          show: false,
        },
        splitLine: {
          show: false, // Set to false to hide the default split lines
        },
        show: false,
      },
      {
        // type: 'category',
        boundaryGap: false,
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
        show: false,
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
  };

  const chartRef = useRef(null);

  return (
    <div id='componentB' style={{ display: 'flex', marginTop: 0, marginLef: 0, width: 1250 }}>
      <div style={{ display: 'flex', transform: 'rotate(90deg)' }} className='print-view'>
        <Ruler style={{ display: 'flex', gap: 0 }}>
          <ol id='rule' style={{ height: 950, marginTop: -50, paddingLeft: 100 }}>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ol>

          <ol id='rule' style={{ height: 700, marginTop: 200, marginLeft: 0 }}>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ol>

          <ol id='rule' style={{ height: 700, marginTop: 100 }}>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ol>

          <ol id='rule' style={{ height: 700, marginTop: 150 }}>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ol>
        </Ruler>

        <ReactEcharts
          option={secondaryOptions}
          style={{ height: 1100, width: 1000, marginLeft: -50 }}
          ref={chartRef}
          opts={{ renderer: 'svg' }}
        />
      </div>
    </div>
  );
}
