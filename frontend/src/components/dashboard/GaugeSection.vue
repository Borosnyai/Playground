<script setup>
// Import the Pinia sensor store
// This gives access to sensor data and getters
import { useSensorStore } from '../../stores/sensorStore'

// Create a store instance
const store = useSensorStore()
</script>

<template>
  <!-- Row for gauge cards -->
  <div class="row mb-4">

    <!-- Loop through gauge sensors (temperature + air quality) -->
    <div v-for="sensor in store.gaugeSensors" :key="sensor.id" class="col-md-6">
      <!-- Single gauge card -->
      <div class="gauge-card text-center">

        <!-- Sensor title -->
        <h4>{{ sensor.title }}</h4>

        <!-- Main sensor value with unit -->
        <p class="gauge-value">
          {{ sensor.value }} {{ sensor.unit }}
        </p>

        <!-- Status badge with color based on sensor status -->
        <span class="badge" :class="sensor.status === 'OK'
          ? 'bg-success'
          : 'bg-warning'">
          {{ sensor.status }}
        </span>

      </div>
    </div>

  </div>
</template>

<style scoped>
/* Card background and spacing */
.gauge-card {
  background: #2c3e50;
  color: white;
  padding: 24px;
  border-radius: 12px;
}

/* Large value display for dashboard overview */
.gauge-value {
  font-size: 2.2rem;
  font-weight: bold;
}
</style>