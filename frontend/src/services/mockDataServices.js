export function getMockSensors() {
  return [
    {
      id: 4,
      type: 'light',
      title: 'Light Barrier',
      blocked: Math.random() > 0.7,
      status: 'OK',
    },
    {
      id: 5,
      type: 'xy',
      title: 'XY Sensor',
      valueX: 0,
      valueY: 0,
      status: 'OK',
    }
  ]
}