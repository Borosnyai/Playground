<script setup>
import { onMounted } from 'vue'
import { useSensorStore } from '../../stores/sensorStore'

import OverviewBar from './OverviewBar.vue'
import GaugeSection from './GaugeSection.vue'
import SensorGrid from './SensorGrid.vue'
import TimeSeriesSection from './TimeSeriesSection.vue'

const store = useSensorStore()

onMounted(() => {
  store.updateSensors()
  setInterval(() => {
    store.updateSensors()
  }, 2000)
})
</script>

<template>
  <div class="dashboard-grid">

    <OverviewBar />

    <div class="sensors-row">
      <SensorGrid />
      <GaugeSection :gauges="store.gaugeSensors" />


    </div>

    <TimeSeriesSection :key="store.sensors.length" :sensors="[...store.monitoringSensors, ...store.gaugeSensors]" />


  </div>

</template>

<style scoped>
.sensors-row {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1.5rem;
  margin: 2rem 0;
  align-items: start;
}

@media (max-width: 1024px) {
  .sensors-row {
    grid-template-columns: 1fr;
  }
}
</style>
