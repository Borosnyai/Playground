import { defineStore } from 'pinia'

export const useSensorStore = defineStore('sensor', {
  state: () => ({
    sensors: []
  }),

  actions: {

    updateSensors() {
      const data = getSensors()
      this.sensors = data.map(sensor => {
        if (sensor.type === 'vibration') {
          return {
            ...sensor,
            details: {
              Velocity: `${sensor.velocity} mm/s`,
              Frequency: `${sensor.frequency} Hz`,
              Temperature: `${sensor.temperature} °C`
            }
          }
        }
        return sensor
      })
      updateSensors(sensors) {
        this.sensors = sensors
      },

      updateSensor(sensor) {
        const index = this.sensors.findIndex(s => s.id === sensor.id)
        if (index !== -1) {
          this.sensors[index] = sensor
        } else {
          this.sensors.push(sensor)
        }

      }
    },

    getters: {
      gaugeSensors: (state) =>
        state.sensors.filter(
          s => s.type === 'temperature' || s.type === 'air'
        ),

      monitoringSensors: state =>
        state.sensors.filter(s => s.type === 'vibration'),

      stateSensors: state =>
        state.sensors.filter(s => s.type === 'light'),

      valueSensors: state =>
        state.sensors.filter(
          s => s.type === 'distance' || s.type === 'pressure'
        )
    }

  })
