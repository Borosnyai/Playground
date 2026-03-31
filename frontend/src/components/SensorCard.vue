<script setup>
import { computed, ref } from 'vue'        // "ref" creates a reactive variable — when its value changes, Vue automatically updates the UI.

const props = defineProps({ sensor: Object })

const selectedPrinciple = ref(props.sensor.sensorPrinciple ?? 0)

const statusClass = computed(() => {
  if (props.sensor.status === 'CRITICAL') return 'bg-danger'
  if (props.sensor.status === 'WARN') return 'bg-warning'
  return 'bg-success'
})
</script>

<template>
  <div class="col-12 col-md-6 col-lg-4 mx-auto">
    <div class="sensor-card text-center">

      <h4 class="mb-3">{{ sensor.title }}</h4>

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
  padding: 12px;
  border-radius: 10px;
  min-height: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>