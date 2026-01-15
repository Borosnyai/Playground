<script>
import { ref, onMounted } from 'vue'
import SensorCard from './components/SensorCard.vue'

const sensors = ref([])

function statusByRange(value, warnMin, warnMax, critMin, critMax) {
  if(value > critMin || value < critMax){
    return 'CRITICAL'
  }
  if (value < warnMin || value > warnMax) {
    return 'WARN'
  }
  return 'OK'
}
function colorBystatus(status) {
  if(status == 'OK'){
    return 'text-success'
  }
  return 'text-warning'
}


function random(min, max) {
  return +(Math.random() * (max - min) + min).toFixed(1)
}
function generateSensors() {

  const tempValue = random(20, 90)
  const airValue = random(10, 80)
  const vibValue = random(1, 6)

  sensors.value = [
    // Temperatur
    {
      id: 1,
      type: 'temperature',
      title: 'Temperature',
      value: tempValue,
      unit: '°C',
      status: statusByRange(tempValue, 30, 70, 20, 85)
    },
    // Luftqualität
    {
      id: 2,
      type: 'air',
      title: 'Air Quality',
      value: airValue,
      unit: 'AQI',
      status: statusByRange(airValue, 20, 60, 10, 80)
    },
    // Vibration
    {
      id: 3,
      type: 'vibration',
      title: 'Vibration Sensor',
      velocity: vibValue,
      frequency: random(40, 80),
      temperature: random(30, 60),
      status: statusByRange(vibValue, 1, 4, 0.5, 5.5)
    },
    // Light Barrier
    {
      id: 4,
      type: 'light',
      title: 'Light Barrier',
      blocked: Math.random() > 0.7,
      status: 'OK'
    },
    // Distance Sensor
    {
      id: 5,
      type: 'distance',
      title: 'Distance Sensor',
      value: random(50, 300),
      unit: 'mm',
      status: 'OK'
    },
    // Pressure
    {
      id: 6,
      type: 'pressure',
      title: 'Pressure Sensor',
      value: random(1, 6),
      unit: 'bar',
      status: 'OK'
    }
  ]
}
// Automatische Aktualisierung
onMounted(() => {
  generateSensors();
  setInterval(generateSensors, 2000)
})

</script>
<template>
  <div class="container py-4">
    <h2 class="text-center text-light mb-4">Sensor Dashboard</h2>

    <div class="row g-3">
      <SensorCard
        v-for="sensor in sensors"
        :key="sensor.id"
        :sensor="sensor"
      ></SensorCard>
    </div>
  </div>
</template>
