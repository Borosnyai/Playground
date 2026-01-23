<script setup>
import { onMounted } from 'vue'
import { useSensorStore } from './stores/sensorStore'
import SensorCard from './components/SensorCard.vue'

const store = useSensorStore()

onMounted(() => {
  // MockDataService
  store.updateSensors()
  setInterval(store.updateSensors, 2000)
})
</script>
<template>
  <div class="container py-4">
    <h2 class="text-center text-light mb-4">Sensor Dashboard</h2>

    <div class="row g-3">
      <template v-if="store.sensors.length === 0">
        <div class="col-12">
          <p class="text-center text-light">
            No sensor data available
          </p>
        </div>
      </template>

      <template v-else>
        <SensorCard v-for="sensor in store.sensors" :key="sensor.id" :sensor="sensor" />
      </template>
    </div>
  </div>
</template>
