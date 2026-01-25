import { getMockSensors } from "./mockDataServices"
import { getMqttSensors } from "./mqttDataService"


const useMockData = true 

export function getSensors() {
  return useMockData ? getMockSensors() : getMqttSensors()
}

