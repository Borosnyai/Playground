import { getMockSensors } from './mockDataServices';
import { startMQTT } from './mqttDataService';

const useMockData = true

// CHANGED: renamed from getSensors to initDataService
// because App.vue imports it with this name
export function initDataService(store) {
  if (useMockData) {
    console.log('Using MOCK data service')
    store.updateSensors(getMockSensors())
    setInterval(() => {
      store.updateSensors(getMockSensors())
    }, 2000)
  } else {
    console.log('Using MQTT data service')
    startMQTT((sensor) => {
      store.updateSensor(sensor)
    })
  }
}