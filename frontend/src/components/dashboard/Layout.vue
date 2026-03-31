<script setup>
import SensorCard from '../SensorCard.vue'
import { useSensorStore } from '../../stores/sensorStore'

const store = useSensorStore()
</script>

<template>
  <div class="container py-4">
    <h1 class="text-white mb-4">Sensor Dashboard</h1>
    <div class="row g-3">
      <SensorCard v-for="sensor in store.sensors" :key="sensor.id" :sensor="sensor" />
    </div>
  </div>
</template>