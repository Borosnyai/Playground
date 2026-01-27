import { defineStore } from 'pinia'
import { getSensors } from '../services/dataService'

export const useSensorStore = defineStore('sensor', {
  state: () => ({
    sensors: []
  }),

  actions: {
    updateSensors() {
      const data = getSensors()
      console.log('Sensors:', data)
      this.sensors = data
    }
  },
  getters: {
    gaugeSensors: (state) =>
      state.sensors.filter(
        s => s.type === 'temperature' || s.type === 'air'
      ),

    monitoringSensors: (state) =>
      state.sensors.filter(s => s.type === 'vibration'),

    stateSensors: (state) =>
      state.sensors.filter(s => s.type === 'light'),

    valueSensors: (state) =>
      state.sensors.filter(
        s => s.type === 'distance' || s.type === 'pressure'
      )
  }
})
