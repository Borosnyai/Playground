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


  return [

        {
          id: 4,
          type: 'light',              // Type is used in SensorCard to decide how to display the data

          title: 'Light Barrier',

          blocked: Math.random() > 0.7,
          // Simulates whether the light beam is blocked or not
          // Math.random() gives a number between 0 and 1
          // > 0.7 means: 30% chance it is blocked, 70% chance it is not

          status: 'OK',       // Status is OK for now!
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