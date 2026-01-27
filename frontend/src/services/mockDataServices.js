function random(min, max) {
  return +(Math.random() * (max - min) + min).toFixed(1)
}

function statusByRange(value, warnMin, warnMax, critMin, critMax) {
  if (value < critMin || value > critMax) {
    return 'CRITICAL'
  }
  if (value < warnMin || value > warnMax) {
    return 'WARN'
  }
  return 'OK'
}

export function getMockSensors() {
  const tempValue = random(20, 90)
  const airValue = random(10, 80)
  const vibValue = random(1, 6)

  return [
    {
      id: 1,
      type: 'temperature',
      title: 'Temperature',
      value: tempValue,
      unit: '°C',
      status: statusByRange(tempValue, 30, 70, 20, 85)
    },
    {
      id: 2,
      type: 'air',
      title: 'Air Quality',
      value: airValue,
      unit: 'AQI',
      status: statusByRange(airValue, 20, 60, 10, 80)
    },
    {
      id: 3,
      type: 'vibration',
      title: 'Vibration Sensor',
      velocity: vibValue,
      frequency: random(40, 80),
      temperature: random(30, 60),
      status: statusByRange(vibValue, 1, 4, 0.5, 5.5)
    },
    {
      id: 4,
      type: 'light',
      title: 'Light Barrier',
      blocked: Math.random() > 0.7,
      status: 'OK'
    },
    {
      id: 5,
      type: 'distance',
      title: 'Distance Sensor',
      value: random(50, 300),
      unit: 'mm',
      status: 'OK'
    },
    {
      id: 6,
      type: 'pressure',
      title: 'Pressure Sensor',
      value: random(1, 6),
      unit: 'bar',
      status: 'OK'
    },
    {
      id: 10,
      type: 'bcm',
      title: 'Condition Monitoring (BCM0001)',
      vibration: {
        x: random(0.5, 5),
        y: random(0.5, 5),
        z: random(0.5, 5),
        unit: 'mm/s'
      },
      temperature: {
        value: random(25, 70),
        unit: '°C'
      },
      status: Math.random() > 0.8 ? 'WARN' : 'OK'
    }
  ]
}
