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
  const vibFreq = random(40, 80)
  const vibTemp = random(30, 60)

  return [
    {
      id: 1,
      type: 'temperature',
      title: 'Temperature',
      name: 'Temperature',
      value: tempValue,
      unit: '°C',
      status: statusByRange(tempValue, 30, 70, 20, 85),
      max: 100
    },
    {
      id: 2,
      type: 'air',
      title: 'Air Quality',
      name: 'Air Quality',
      value: airValue,
      unit: 'AQI',
      status: statusByRange(airValue, 20, 60, 10, 80),
      max: 100
    },
    {
      id: 3,
      type: 'vibration',
      title: 'Vibration Sensor',
      name: 'Vibration Sensor',
      value: vibValue,
      unit: 'mm/s',
      velocity: vibValue,
      frequency: vibFreq,
      temperature: vibTemp,
      status: statusByRange(vibValue, 1, 4, 0.5, 5.5),
      details: {
        Velocity: `${vibValue} mm/s`,
        Frequency: `${vibFreq} Hz`,
        Temperature: `${vibTemp} °C`
      }
    }
  ]
}