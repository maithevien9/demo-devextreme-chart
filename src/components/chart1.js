import ReactEcharts from 'echarts-for-react';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import '../App.css';
import ComponentA from '../DroppableContainer';
import ChatIcon from '../imgs/chat.png';
import lastData from '../lastData.json';
import paramsData from '../params1.json';

// import paramsData from './params30h.json';

const Wrapper = styled.div`
  ${({ selectedFrame, start, end, position }) =>
    selectedFrame !== null &&
    `[clip-path="url(#zr0-c${1})"] {transform: translate(0%, ${2 + (position * 100) / 500}%) scale(1, ${(end - start) / 100}); }`}
`;

const bc = new BroadcastChannel('my-awesome-site');

export default function Home() {
  const chartRef = useRef(null);
  const [dataZoomEnabled, setDataZoomEnabled] = useState(false);
  const [zoomRatio, setZoomRatio] = useState(100);
  const [selectedFrame, setSelectedFrame] = useState(0);
  const isGroupRef = useRef(false);
  const [hour, setHour] = useState(2);
  const [loading, setLoading] = useState(false);
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
                // {
                //   name: 'Custom2',
                //   coord: ['21632-4', 2000],
                //   label: { show: true, formatter: '20' },
                //   symbolOffset: [10, -16],
                //   itemStyle: {
                //     color: '#FF6700',
                //   },
                // },
              ],
            }
          : null,
    }))
  );

  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(100);
  const [position, setPosition] = useState(0);
  const [chartKey, setChartKey] = useState(0);

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
    //
  };

  useEffect(() => {
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
  }, [chartRef]);

  useEffect(() => {
    if (zoomRatio > 80) {
      if (!isGroupRef.current) {
        const chartInstance = chartRef.current.getEchartsInstance();
        const updatedOption = chartInstance.getOption();

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
              // {
              //   name: 'Custom2',
              //   coord: ['21632-4', 2000],
              //   label: { show: true, formatter: '20' },
              //   symbolOffset: [10, -16],
              //   itemStyle: {
              //     color: '#FF6700',
              //   },
              // },
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
              // { name: 'Custom', coord: ['21632-4', 1000], symbol: `image://${ChatIcon}`, symbolSize: 20, symbolOffset: [10, -16] }, // Mark a custom data point
              // { name: 'Custom', coord: ['21632-4', 2000], symbol: `image://${ChatIcon}`, symbolSize: 20, symbolOffset: [10, -16] }, // Mark a custom data point
              // { name: 'Custom', coord: ['21632-4', 3000], symbol: `image://${ChatIcon}`, symbolSize: 20, symbolOffset: [10, -16] }, // Mark a custom data point
              // { name: 'Custom', coord: ['21632-4', 4000], symbol: `image://${ChatIcon}`, symbolSize: 20, symbolOffset: [10, -16] }, // Mark a custom data point
              // { name: 'Custom', coord: ['21632-4', 5000], symbol: `image://${ChatIcon}`, symbolSize: 20, symbolOffset: [10, -16] }, // Mark a custom data point
              // { name: 'Custom', coord: ['21632-4', 6000], symbol: `image://${ChatIcon}`, symbolSize: 20, symbolOffset: [10, -16] }, // Mark a custom data point
              // { name: 'Custom', coord: ['21632-4', 7000], symbol: `image://${ChatIcon}`, symbolSize: 20, symbolOffset: [10, -16] }, // Mark a custom data point
              // { name: 'Custom', coord: ['21632-4', 8000], symbol: `image://${ChatIcon}`, symbolSize: 20, symbolOffset: [10, -16] }, // Mark a custom data point
              // { name: 'Custom', coord: ['21632-4', 9000], symbol: `image://${ChatIcon}`, symbolSize: 20, symbolOffset: [10, -16] }, // Mark a custom data point
              // { name: 'Custom', coord: ['21632-4', 10000], symbol: `image://${ChatIcon}`, symbolSize: 20, symbolOffset: [10, -16] }, // Mark a custom data point
              // { name: 'Custom', coord: ['21632-4', 11000], symbol: `image://${ChatIcon}`, symbolSize: 20, symbolOffset: [10, -16] }, // Mark a custom data point
              // { name: 'Custom', coord: ['21632-4', 12000], symbol: `image://${ChatIcon}`, symbolSize: 20, symbolOffset: [10, -16] }, // Mark a custom data point
              // { name: 'Custom', coord: ['21632-4', 13000], symbol: `image://${ChatIcon}`, symbolSize: 20, symbolOffset: [10, -16] }, // Mark a custom data point
              // { name: 'Custom', coord: ['21632-4', 14000], symbol: `image://${ChatIcon}`, symbolSize: 20, symbolOffset: [10, -16] }, // Mark a custom data point
              // { name: 'Custom', coord: ['21632-4', 15000], symbol: `image://${ChatIcon}`, symbolSize: 20, symbolOffset: [10, -16] }, // Mark a custom data point
              // { name: 'Custom', coord: ['21632-4', 16000], symbol: `image://${ChatIcon}`, symbolSize: 20, symbolOffset: [10, -16] }, // Mark a custom data point
              // { name: 'Custom', coord: ['21632-4', 1700], symbol: `image://${ChatIcon}`, symbolSize: 20, symbolOffset: [10, -16] }, // Mark a custom data point
              // { name: 'Custom', coord: ['21632-4', 18000], symbol: `image://${ChatIcon}`, symbolSize: 20, symbolOffset: [10, -16] }, // Mark a custom data point
              // { name: 'Custom', coord: ['21632-4', 19000], symbol: `image://${ChatIcon}`, symbolSize: 20, symbolOffset: [10, -16] }, // Mark a custom data point
              // { name: 'Custom', coord: ['21632-4', 20000], symbol: `image://${ChatIcon}`, symbolSize: 20, symbolOffset: [10, -16] }, // Mark a custom data point

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

  // const handleChange = (name) => {
  //   setSelectedFrame(name);

  //   setChartKey((prevKey) => prevKey + 1); // Update the chart key to force re-render
  // };

  const [selectedOption, setSelectedOption] = useState('No Altitude');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    console.log('check', event.target.value);

    setSeries((prev) => {
      return [prev.find((item) => item.name === event.target.value), ...prev.filter((item) => item.name !== event.target.value)];
    });
    setChartKey((prevKey) => prevKey + 1); // Update the chart key to force re-render
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: 30 }}>
        Zoom Level: {Math.round((100 * 100) / zoomRatio)}% - {Math.round(zoomRatio)}
        <div>
          <div>
            <label>
              <input type='radio' value='No Altitude' checked={selectedOption === 'No Altitude'} onChange={handleOptionChange} />
              No Altitude
            </label>
            <label>
              <input type='radio' value='Altitude' checked={selectedOption === 'Altitude'} onChange={handleOptionChange} />
              Altitude
            </label>
          </div>

          {/* <select
            name='Time'
            id='time'
            value={selectedFrame}
            onChange={(e) => {
              handleChange(e.target.value);
            }}
            style={{ width: 200, height: 40, paddingLeft: 20, paddingRight: 20 }}
          >
            {paramsData.map((item, index) => (
              <option key={index} value={item.name}>
                {item.name}
              </option>
            ))}
          </select> */}
        </div>
      </div>

      {loading ? (
        <div style={{ height: 540, paddingLeft: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading</div>
      ) : (
        <Wrapper selectedFrame={selectedFrame} start={start} end={end} position={position || -20}>
          <ReactEcharts
            option={options}
            style={{ height: 540, paddingLeft: 50 }}
            ref={chartRef}
            opts={{ renderer: 'svg' }}
            key={chartKey}
          />
        </Wrapper>
      )}

      {/* <div
        style={{
          width: 400,
          height: 50,
          display: 'flex',
          justifyContent: 'flex-start',
          paddingLeft: 80,
          position: 'absolute',
          top: 150,
          left: 0,
          paddingTop: 50,
        }}
      >
        <ComponentA start={start} end={end} setStart={setStart} setEnd={setEnd} position={position} setPosition={setPosition} />
      </div> */}
    </div>
  );
}
