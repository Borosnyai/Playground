import { defineStore } from 'pinia'
import { getSensors } from '../services/dataService'

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
