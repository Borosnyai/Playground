<script setup>
import { computed } from 'vue'

const props = defineProps({
  sensor: Object
})

const colorClass = computed(() => {
  return props.sensor.status === 'OK'
    ? 'text-success'
    : 'text-warning'
})
</script>

<template>
  <div class="sensor-card">
    <h3>{{ sensor.title }}</h3>

    <!-- TEMPERATURE -->
    <div v-if="sensor.type === 'temperature'">
      <p :class="colorClass">
        {{ sensor.value }} {{ sensor.unit }}
      </p>
    </div>

    <!-- VIBRATION -->
    <div v-else-if="sensor.type === 'vibration'">
      <p>Velocity: {{ sensor.velocity }} mm/s</p>
      <p>Frequency: {{ sensor.frequency }} Hz</p>
      <p>Temperature: {{ sensor.temperature }} °C</p>
    </div>

    <!-- LIGHT BARRIER -->
    <div v-else-if="sensor.type === 'light'">
      <p>Blocked: {{ sensor.blocked ? 'Yes' : 'No' }}</p>
    </div>

    <!-- DISTANCE -->
    <div v-else-if="sensor.type === 'distance'">
      <p>Distance: {{ sensor.value }} {{ sensor.unit }}</p>
    </div>

    <!-- PRESSURE -->
    <div v-else-if="sensor.type === 'pressure'">
      <p>Pressure: {{ sensor.value }} {{ sensor.unit }}</p>
    </div>

    <!-- STATUS -->
    <span
      class="badge"
      :class="sensor.status === 'OK' ? 'bg-success' : 'bg-warning'"
    >
      {{ sensor.status }}
    </span>
  </div>
</template>


<style scoped>
.sensor-card {
  background: #2c3e50;
  color: white;
  border: 1px solid #3a4f66;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.badge {
  background: #28a745;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
}
</style>