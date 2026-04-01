<script setup>
import SensorCard from './LightBarrier/LightBarrierCard.vue'
import { useSensorStore } from '../../stores/sensorStore'
import LightBarrierCard from './LightBarrier/LightBarrierCard.vue'
import XYSensorCard from './XYSensor/XYCard.vue'
import ControlPanel from './MasterControl/ControlPanel.vue'

const store = useSensorStore()
</script>

<template>
  <div class="row mt-4 justify-content-center">
    <h1 class="text-white mb-4 text-center">Sensor Dashboard</h1>

    <!-- Sensors -->
    
    <!--LightBArrier-->
    <div class="row g-4 align-items-start">
      <template v-for="sensor in store.sensors" :key="sensor.id">
        <LightBarrierCard v-if="sensor.type === 'light'" :sensor="sensor" />

        <!--XYSensor coming soon-->
        <XYSensorCard v-else-if="sensor.type === 'xy'" :sensor="sensor" />
      </template>
    </div>

    <!-- Button -->
    <div class="row mt-4 justify-content-center">
      <div class="col-12 col-md-8 col-lg-5">
        <ControlPanel />
      </div>
    </div>
  </div>
</template>