<script setup>
import { computed, ref } from 'vue'        // "ref" creates a reactive variable — when its value changes, Vue automatically updates the UI.

const props = defineProps({ sensor: Object })

const selectedPrinciple = ref(props.sensor.sensorPrinciple ?? 0)

function onPrincipleChange() {
  console.log('SensorPrinciple changed to:', selectedPrinciple.value)
  // Later: API calling towards the IO-Link Master.
}
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

      <!-- RW: SENSOR PRINCIPLE DROPDOWN -->
      <div v-if="sensor.sensorPrincipleOptions" class="mt-3 text-start">
        <label class="form-label small text-white-50">Sensor Principle (RW)</label>
        <select class="form-select form-select-sm bg-dark text-white border-secondary" v-model="selectedPrinciple"
          @change="onPrincipleChange">
          <option v-for="opt in sensor.sensorPrincipleOptions" :key="opt.value" :value="opt.value">
            {{ opt.label }} [{{ opt.value }}]
          </option>
        </select>
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