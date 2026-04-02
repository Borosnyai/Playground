<script setup>
import { computed } from 'vue'
import { useSensorStore } from '../../stores/sensorStore'

// Access the global sensor store
const store = useSensorStore()

// Total number of sensors
const totalSensors = computed(() => store.sensors.length)

// Number of sensors with WARN or CRITICAL status
const warningCount = computed(() =>
  store.sensors.filter(
    s => s.status === 'WARN' || s.status === 'CRITICAL'
  ).length
)

// Overall system status
const systemStatus = computed(() => {
  if (warningCount.value > 0) return 'ATTENTION REQUIRED'
  return 'SYSTEM OK'
})
</script>

<template>
  <div class="overview-bar mb-4 p-3 rounded text-light">

    <div class="row text-center">

      <!-- TOTAL SENSORS -->
      <div class="col-md-4">
        <h5>Total Sensors</h5>
        <p class="overview-value">{{ totalSensors }}</p>
      </div>

      <!-- WARNINGS -->
      <div class="col-md-4">
        <h5>Warnings</h5>
        <p class="overview-value" :class="warningCount > 0 ? 'text-warning' : 'text-success'">
          {{ warningCount }}
        </p>
      </div>

      <!-- SYSTEM STATUS -->
      <div class="col-md-4">
        <h5>Status</h5>
        <p class="overview-value" :class="systemStatus === 'SYSTEM OK' ? 'text-success' : 'text-warning'">
          {{ systemStatus }}
        </p>
      </div>

    </div>
  </div>
</template>

<style scoped>
.overview-bar {
  background: linear-gradient(135deg, #1f2937, #111827);
}

.overview-value {
  font-size: 1.6rem;
  font-weight: bold;
}
</style>
