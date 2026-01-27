import { getMockSensors } from "./mockDataServices"
import { startMQTT } from "./mqttDataService"


const useMockData = true 

export function getSensors() {
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

