export function getMockSensors() {

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
