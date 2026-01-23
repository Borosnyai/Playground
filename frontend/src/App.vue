<script setup>
import { onMounted } from 'vue'
import { useSensorStore } from './stores/sensorStore'
import SensorCard from './components/SensorCard.vue'

const store = useSensorStore()

onMounted(() => {
  // ide jön majd a MockDataService
})
</script>

<template>
  <div class="container py-4">
    <h2 class="text-center text-light mb-4">Sensor Dashboard</h2>

    <div class="row g-3">
      <SensorCard v-for="sensor in store.sensors" :key="sensor.id" :sensor="sensor" />
    </div>
  </div>
</template>
