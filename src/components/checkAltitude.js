import Chart4 from './chart4';
import Chart5 from './chart5';

export default function CheckAltitude() {
  return (
    <div style={{ padding: 30 }}>
      <div>
        <h3>Overlay has Altitude</h3>

        <Chart4 />
      </div>
      <div>
        <h3>Overlay Without Altitude</h3>
        <Chart5 />
      </div>
    </div>
  );
}
