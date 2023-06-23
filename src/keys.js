function randomColorHex() {
  var red = Math.floor(Math.random() * 256);
  var green = Math.floor(Math.random() * 256);
  var blue = Math.floor(Math.random() * 256);
  var hexRed = red.toString(16).padStart(2, '0');
  var hexGreen = green.toString(16).padStart(2, '0');
  var hexBlue = blue.toString(16).padStart(2, '0');
  var hexColor = '#' + hexRed + hexGreen + hexBlue;

  return hexColor;
}

export const keysData = [
  { value: 'Altitude (Pressure)', index: 4 },
  { value: 'Radio Altitude #1', index: 5 },
  { value: 'Airspeed', index: 6 },
  { value: 'Ground Speed', index: 7 },
  { value: 'Elevator Position', index: 8 },
  { value: 'Pitch Attitude', index: 9 },
  { value: 'AOA #1', index: 10 },
  { value: 'Aileron Position', index: 13 },
  { value: 'Roll Attitude', index: 14 },
  { value: 'Rudder Position', index: 15 },
  { value: 'Heading', index: 17 },
  { value: 'Drift Angle', index: 18 },
  { value: 'T.E Flap Position', index: 23 },
  { value: 'Stabiliser Position', index: 24 },
  { value: 'Vertical Acceleration', index: 32 },
  { value: 'Longitudinal Acceleration', index: 40 },
  { value: 'Lateral Acceleration', index: 44 },
  { value: 'Present Position Longitude #1', index: 48 },
  { value: 'Present Position Latitude #1', index: 49 },
  { value: 'Glideslope Deviation #1', index: 59 },
  { value: 'Glideslope Deviation #2', index: 60 },
  { value: 'Localiser Deviation #1', index: 61 },
  { value: 'Localiser Deviation #2', index: 62 },
  { value: 'VOR Frequency #1', index: 63 },
  { value: 'VOR Frequency #2', index: 64 },
  { value: 'Total Air Temp', index: 109 },
  { value: 'Engine #1 N1', index: 110 },
  { value: 'Engine #2 N1', index: 111 },
  { value: 'Engine #1 N2', index: 112 },
  { value: 'Engine #2 N2', index: 113 },
  { value: 'Engine Pressure Ratio #1', index: 114 },
  { value: 'Engine Pressure Ratio #2', index: 115 },
  { value: 'Engine #1 TGT', index: 116 },
  { value: 'Engine #2 TGT', index: 117 },
  { value: 'Engine #1 Fuel Flow', index: 126 },
  { value: 'Engine #2 Fuel Flow', index: 127 },
  { value: 'GMT (UTC)', index: 153 },
  { value: 'GMT Seconds', index: 154 },
  { value: 'Date Day', index: 155 },
  { value: 'Date Month', index: 156 },
  { value: 'Flight Number', index: 157 },
].map((item) => ({ ...item, color: randomColorHex() }));
