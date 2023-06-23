import { keysData } from './keys.js';
import * as echarts from 'echarts';
import paramsData from './params.json';
import lastData from './lastData.json';

import ReactEcharts from 'echarts-for-react';

export default function App() {
  const options = {
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: lastData.map((item) => item.frame),
    },
    yAxis: {
      type: 'value',
    },
    series: paramsData.map((item) => ({ ...item, showSymbol: false })),
    dataZoom: [
      {
        throttle: 50,
        type: 'inside',
      },
    ],
  };

  return (
    <div>
      Hello
      <ReactEcharts option={options} />
    </div>
  );
}

// import React, { useState } from 'react';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   ResponsiveContainer,
//   YAxis,
//   CartesianGrid,
//   Legend,
//   Tooltip,
//   ReferenceArea,
//   Bar,
//   ComposedChart,
// } from 'recharts';
// import { data as initialData } from './data';
// import { keysData } from './keys.js';
// import paramsData from './params.json';

// const getAxisYDomain = (from, to, ref, offset) => {
//   const refData = initialData.slice(from - 1, to);

//   let [bottom, top] = [refData[0][ref], refData[0][ref]];

//   refData.forEach((d) => {
//     if (d[ref] > top) top = d[ref];
//     if (d[ref] < bottom) bottom = d[ref];
//   });

//   return [(bottom | 0) - offset, (top | 0) + offset];
// };

// const initialState = {
//   data: initialData,
//   left: 'dataMin',
//   right: 'dataMax',
//   refAreaLeft: '',
//   refAreaRight: '',
//   top: 'dataMax+1',
//   bottom: 'dataMin-1',
//   top2: 'dataMax+20',
//   bottom2: 'dataMin-20',
//   animation: true,
// };

// function App() {
//   const [state, setState] = useState(initialState);
//   const { data, left, right, refAreaLeft, refAreaRight, top, bottom, top2, bottom2 } = state;

//   const zoom = () => {
//     let { refAreaLeft, refAreaRight } = state;

//     if (refAreaLeft === refAreaRight || refAreaRight === '') {
//       setState((prevState) => ({
//         ...prevState,
//         refAreaLeft: '',
//         refAreaRight: '',
//       }));
//       return;
//     }

//     // xAxis domain
//     if (refAreaLeft > refAreaRight) [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];

//     // yAxis domain
//     const [bottom, top] = getAxisYDomain(refAreaLeft, refAreaRight, 'cost', 1);
//     const [bottom2, top2] = getAxisYDomain(refAreaLeft, refAreaRight, 'impression', 50);

//     setState((prevState) => ({
//       ...prevState,
//       refAreaLeft: '',
//       refAreaRight: '',
//       data: data.slice(),
//       left: refAreaLeft,
//       right: refAreaRight,
//       bottom,
//       top,
//       bottom2,
//       top2,
//     }));
//   };

//   const zoomOut = () => {
//     setState((prevState) => ({
//       ...prevState,
//       data: data.slice(),
//       refAreaLeft: '',
//       refAreaRight: '',
//       left: 'dataMin',
//       right: 'dataMax',
//       top: 'dataMax+1',
//       bottom: 'dataMin',
//       top2: 'dataMax+50',
//       bottom2: 'dataMin+50',
//     }));
//   };

//   return (
//     <div>
//       <ResponsiveContainer
//         height={500}
//         width='100%'
//         margin={{
//           bottom: 5,
//           left: 20,
//           right: 30,
//           top: 30,
//         }}
//       >
//         <LineChart
//           width={800}
//           height={400}
//           data={paramsData.filter((item, index) => index < 100)}
//           onMouseDown={(e) => {
//             e &&
//               e.activeLabel &&
//               setState((prevState) => ({
//                 ...prevState,
//                 refAreaLeft: e.activeLabel,
//               }));
//           }}
//           onMouseMove={(e) =>
//             e &&
//             e.activeLabel &&
//             state.refAreaLeft &&
//             setState((prevState) => ({
//               ...prevState,
//               refAreaRight: e.activeLabel,
//             }))
//           }
//           onMouseUp={zoom}
//         >
//           {keysData?.map(({ value, color }, index) => (
//             <Line dataKey={value} dot={false} key={value} stroke={color} />
//           ))}
//           {refAreaLeft && refAreaRight ? <ReferenceArea x1={refAreaLeft} x2={refAreaRight} strokeOpacity={0.3} /> : null}
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//     // <div className='highlight-bar-charts' style={{ userSelect: 'none' }}>
//     //   <button type='button' className='btn update' onClick={zoomOut}>
//     //     Zoom Out
//     //   </button>

//     //   <ComposedChart
//     // width={800}
//     // height={400}
//     //     // data={data}
//     //     data={paramsData.filter((item, index) => index < 3000)}
//     // onMouseDown={(e) =>
//     //   e &&
//     //   e.activeLabel &&
//     //   setState((prevState) => ({
//     //     ...prevState,
//     //     refAreaLeft: e.activeLabel,
//     //   }))
//     // }
//     // onMouseMove={(e) =>
//     //   e &&
//     //   e.activeLabel &&
//     //   state.refAreaLeft &&
//     //   setState((prevState) => ({
//     //     ...prevState,
//     //     refAreaRight: e.activeLabel,
//     //   }))
//     // }
//     // onMouseUp={zoom}
//     //   >
//     //     <CartesianGrid strokeDasharray='3 3' />
//     // <XAxis allowDataOverflow dataKey='name' domain={[left, right]} type='number' />
//     // <YAxis allowDataOverflow domain={[bottom, top]} type='number' yAxisId='1' />
//     //     <YAxis orientation='right' allowDataOverflow domain={[bottom2, top2]} type='number' yAxisId='2' />
//     //     <Tooltip />

//     //     {keysData?.map(({ value }) => (
//     //       <Line dataKey={value} dot={false} key={value} stroke={randomColorHex()} />
//     //     ))}
//     //     {/* <Line yAxisId='1' type='natural' dataKey='cost' stroke='#8884d8' animationDuration={300} dot={false} /> */}
//     //     {/* <Bar yAxisId='2' dataKey='impression' animationDuration={300} /> */}

//     //     {refAreaLeft && refAreaRight ? <ReferenceArea yAxisId='1' x1={refAreaLeft} x2={refAreaRight} strokeOpacity={0.3} /> : null}
//     //   </ComposedChart>
//     // </div>
//   );
// }

// export default App;

// // <div>
// //   <ResponsiveContainer height={1000} width='100%'>
// //     <LineChart
// //       data={paramsData.filter((item, index) => index < 3000)}
// //       margin={{
// //         bottom: 5,
// //         left: 20,
// //         right: 30,
// //         top: 30,
// //       }}
// //     >
// // {keysData?.map(({ value }, index) => (
// //   <Line dataKey={value} dot={false} key={value} stroke={randomColorHex()} />
// // ))}
// //     </LineChart>
// //   </ResponsiveContainer>
// // </div>
