<script setup>
import { useSensorStore } from '../../stores/sensorStore'
import LightBarrierCard from './LightBarrier/LightBarrierCard.vue'
import XYCard from './XYSensor/XYCard.vue'
import ControlPanel from './MasterControl/ControlPanel.vue'

const store = useSensorStore()
store.updateSensors([
  { id: 1, type: 'light', title: 'Test Light', status: 'OK', blocked: false },
  { id: 2, type: 'xy', title: 'Test XY', status: 'OK', valueX: 0, valueY: 0 }
])
</script>

<template>
  <div class="container py-4">
    <h1 class="text-white mb-4 text-center">Sensor Dashboard</h1>

    <div class="row g-4 align-items-start">
      <template v-for="sensor in store.sensors" :key="sensor.id">
        <LightBarrierCard v-if="sensor.type === 'light'" :sensor="sensor" />
        <XYCard v-else-if="sensor.type === 'xy'" :sensor="sensor" />
      </template>

      <div class="col-12 col-md-4">
        <ControlPanel />
      </div>
    </div>
  </div>
</template>