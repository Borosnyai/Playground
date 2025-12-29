<script setup>
defineProps({
  name: String,
  type: String,
  velocity: Number,
  frequency: Number,
  temperature: Number,
  distance: Number,
  pressure: Number,
  blocked: Boolean,
  status: String
})
</script>

<template>
  <div class="sensor-card">
    <h3>{{ name }}</h3>
    
    <div v-if="type === 'vibration'">
      <p>Velocity: {{ velocity }} mm/s</p>
      <p>Frequency: {{ frequency }} Hz</p>
      <p>Temperature: {{ temperature }} °C</p>
    </div>
    
    <div v-if="type === 'light-barrier'">
      <p>Blocked: {{ blocked ? 'Yes' : 'No' }}</p>
      <p>Temperature: {{ temperature }} °C</p>
    </div>
    
    <div v-if="type === 'distance'">
      <p>Distance: {{ distance }} mm</p>
      <p>Temperature: {{ temperature }} °C</p>
    </div>
    
    <div v-if="type === 'pressure'">
      <p>Pressure: {{ pressure }} bar</p>
      <p>Temperature: {{ temperature }} °C</p>
    </div>
    
    <p>Status: <span class="badge">{{ status }}</span></p>
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