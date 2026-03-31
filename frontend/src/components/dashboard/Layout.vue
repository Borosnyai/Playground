<script setup>
import SensorCard from '../SensorCard.vue'
import ParameterPanel from '../ParameterPanel.vue';
import { useSensorStore } from '../../stores/sensorStore'

const store = useSensorStore()
</script>

<template>
  <div class="container py-4">
    <h1 class="text-white mb-4">Sensor Dashboard</h1>

    <!-- DASHBOARD: display only -->
    <div class="row g-3">
      <SensorCard v-for="sensor in store.sensors" :key="sensor.id" :sensor="sensor" />
    </div>

    <!-- PARAMETERS: one panel per sensor -->
    <div class="row g-3 mt-4">
      <ParameterPanel v-for="sensor in store.sensors" :key="sensor.id" :sensor="sensor" />
    </div>

  </div>
</template>