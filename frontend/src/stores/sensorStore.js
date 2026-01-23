import { defineStore } from 'pinia'
import { getSensors } from '../services/dataService'

export const useSensorStore = defineStore('sensor', {
  state: () => ({
    sensors: []
  }),

  actions: {
    updateSensors() {
      this.sensors = getSensors()
    }
  }
})
