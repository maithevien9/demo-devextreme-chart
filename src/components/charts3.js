import paramsData from '../params3.json';
import lastData from '../lastData.json';
import ChatIcon from '../imgs/chat.png';
import { useRef, useState, useMemo } from 'react';
import ReactEcharts from 'echarts-for-react';

export default function Charts3() {
  const chartRef = useRef(null);
  const [hour, setHour] = useState(4);
  const xAxis = lastData.map((item) => item.frame);
  const xAxis2 = lastData.map((item) => item.time);
  const [loading, setLoading] = useState(false);

  const newXAxis = useMemo(() => {
    return new Array(hour / 2)
      .fill(null)
      .map((item) => xAxis)
      .flat();
  }, [hour, xAxis]);

  const newXAxis2 = useMemo(() => {
    return new Array(hour / 2)
      .fill(null)
      .map((item) => xAxis2)
      .flat();
  }, [hour, xAxis2]);

  const options = useMemo(() => {
    const va = {
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

      series: paramsData.map((item, index) => ({
        ...item,
        showSymbol: true,
        data: new Array(hour / 2)
          .fill(null)
          .map((item2) => {
            return item.data;
          })
          .flat()
          .map((i) => ({ value: i, symbol: 'none' })),
        markPoint:
          index === 0
            ? {
                data: [
                  { name: 'Custom', coord: ['21632-4', 5000], symbol: `image://${ChatIcon}`, symbolSize: 20, symbolOffset: [10, -16] }, // Mark a custom data point
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
    return va;
  }, [hour, newXAxis, newXAxis2]);

  return (
    <div>
      <select
        name='Time'
        id='time'
        value={hour}
        onChange={(e) => {
          setHour(e.target.value);
          setLoading(true);

          setTimeout(() => {
            setLoading(false);
          }, 0);
        }}
        style={{ width: 200, height: 50, paddingLeft: 20, paddingRight: 20 }}
      >
        <option value='2'>2</option>
        <option value='4'>4</option>
        <option value='6'>6</option>
        <option value='8'>8</option>
        <option value='10'>10</option>
        <option value='12'>12</option>
        <option value='14'>14</option>
        <option value='16'>16</option>
        <option value='18'>18</option>
        <option value='20'>20</option>
        <option value='22'>22</option>
        <option value='24'>24</option>
        <option value='26'>26</option>
        <option value='28'>28</option>
        <option value='30'>30</option>
      </select>
      {loading ? (
        <div style={{ height: 540, paddingLeft: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading</div>
      ) : (
        <ReactEcharts option={options} style={{ height: 540, paddingLeft: 50 }} ref={chartRef} opts={{ renderer: 'svg' }} />
      )}
    </div>
  );
}
