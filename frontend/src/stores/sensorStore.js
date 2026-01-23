import { defineStore } from 'pinia'
import { getMockSensors } from '../services/mockDataService'

export const useSensorStore = defineStore('sensor', {
  state: () => ({
    sensors: []
  }),

  actions: {
    updateSensors() {
      this.sensors = getMockSensors()
    }
  }
})
