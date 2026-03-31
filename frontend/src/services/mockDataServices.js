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
      sensorPrinciple: 0,               // 0 = Diffuse (default, as shown in the IODD-finder).    This value will later be sent to the IO-Link Master when the user changes it.

      // This is an array (list) of all possible options for SensorPrinciple.It comes from the IODD definition of the sensor.
      sensorPrincipleOptions: [             
        { label: 'Diffuse', value: 0 },        // value: 0 → this is the default "Diffuse" mode
        { label: 'Diffuse with background suppression', value: 1 }, // value: 1 → sensor ignores background objects behind the target
        { label: 'Retro-reflective', value: 2 },                    // value: 2 → sensor works with a reflector on the opposite side
        { label: 'Through-beam emitter', value: 3 },                 // value: 3 → this unit is the light sender in a through-beam pair
        { label: 'Through-beam receiver', value: 4 }                // value: 4 → this unit is the light receiver in a through-beam pair
      ]
    }
    
  ]
}
