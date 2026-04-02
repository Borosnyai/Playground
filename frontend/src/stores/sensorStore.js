import { defineStore } from 'pinia';

export const useSensorStore = defineStore('sensor', {
  state: () => ({
    sensors: []
  }),

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
  },

  actions: {
    setSensors(sensors) {
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
  }
})