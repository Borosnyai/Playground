<script setup>
import { computed } from 'vue'
import { useSensorStore } from '../../stores/sensorStore'
import SensorCard from '../SensorCard.vue'

// Access the global sensor store (Pinia)
const store = useSensorStore()

// Computed list of sensors from the store
const sensors = computed(() => store.sensors)
</script>

<template>
  <div class="row g-3">

    <!-- Show message if no sensors are available -->
    <p v-if="sensors.length === 0" class="text-light text-center">
      No sensor data available
    </p>

    <!-- Render one SensorCard per sensor -->
    <SensorCard v-for="sensor in sensors" :key="sensor.id" :sensor="sensor" />

  </div>
</template>
