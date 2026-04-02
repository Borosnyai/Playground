<script setup>
import { computed } from 'vue'
import { useSensorStore } from '../../stores/sensorStore'
import SensorCard from '../SensorCard.vue'

// Access the global sensor store (Pinia)
const store = useSensorStore()

// Only show NON-gauge sensors in the grid
// Gauge sensors (temperature, air) are rendered in GaugeSection
const gridSensors = computed(() =>
  store.sensors.filter(
    sensor => sensor.type !== 'temperature' && sensor.type !== 'air'
  )
)
</script>
<template>
  <div class="sensor-grid">
    <SensorCard v-for="sensor in gridSensors" :key="sensor.id" :sensor="sensor" />
  </div>
</template>

<style scoped>
.sensor-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}
</style>
