<script setup>
import { computed } from 'vue'

const props = defineProps({
  sensor: Object
})

const statusClass = computed(() => {
  if (props.sensor.status === 'CRITICAL') return 'bg-danger'
  if (props.sensor.status === 'WARN') return 'bg-warning'
  return 'bg-success'
})
</script>

<template>
  <div class="col-12 col-md-6 col-lg-4">
    <div class="sensor-card text-center">

      <h4 class="mb-3">{{ sensor.title }}</h4>

      <!-- MAIN VALUE -->
      <p class="sensor-value">
        {{ sensor.value }} {{ sensor.unit }}
      </p>

      <!-- OPTIONAL DETAILS -->
      <div v-if="sensor.details">
        <p v-for="(val, key) in sensor.details" :key="key" class="sensor-detail">
          {{ key }}: {{ val }}
        </p>
      </div>

      <!-- STATUS -->
      <span class="badge mt-3" :class="statusClass">
        {{ sensor.status }}
      </span>

    </div>
  </div>
</template>



<style scoped>
.sensor-card {
  background: #2c3e50;
  color: white;
  padding: 20px;
  border-radius: 10px;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.sensor-value {
  font-size: 1.8rem;
  font-weight: bold;
}

.sensor-detail {
  font-size: 0.9rem;
  opacity: 0.85;
}
</style>