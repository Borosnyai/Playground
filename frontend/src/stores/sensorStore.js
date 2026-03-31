import { defineStore } from 'pinia'
import { initDataService } from '../services/dataService'

export const useSensorStore = defineStore('sensor', {
  state: () => ({
    sensors: []
  }),

  actions: {
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
  }

})
