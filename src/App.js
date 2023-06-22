import Chart, {
  ArgumentAxis,
  CommonSeriesSettings,
  Format,
  Grid,
  Label,
  Legend,
  Margin,
  Point,
  ScrollBar,
  Series,
  Tooltip,
  ValueAxis,
  ZoomAndPan,
} from 'devextreme-react/chart';
import React from 'react';
import keysData from './keys.json';
import paramsData from './params.json';

function App() {
  return (
    <div style={{ paddingTop: 200 }}>
      <Chart palette='Violet' dataSource={paramsData.slice(0, 100)}>
        <CommonSeriesSettings argumentField='frame' type='line' />

        <ArgumentAxis>
          <Grid visible={true} width={1300} />
        </ArgumentAxis>

        <ValueAxis>
          <Grid visible={false} />
        </ValueAxis>

        {keysData.map((item) => (
          <Series key={item.value} valueField={item.value} name={item.value}>
            <Point visible={false} />
          </Series>
        ))}
        <Margin bottom={20} />
        <ArgumentAxis allowDecimals={false} axisDivisionFactor={60}>
          <Label>
            <Format type='decimal' />
          </Label>
          <Grid visible={true} />
        </ArgumentAxis>
        <Legend verticalAlignment='top' horizontalAlignment='right' />
        <Tooltip enabled={true} />
        <ZoomAndPan argumentAxis={'both'} dragToZoom={true} allowMouseWheel={true} panKey={'shift'} />
        <ScrollBar visible={true} position='bottom' />
      </Chart>
    </div>
  );
}

export default App;
