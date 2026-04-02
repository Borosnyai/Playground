<template>
  <div class="gauge-section">
    <h2>Gauge sensors: {{ gauges.length }}</h2>
    <div class="gauge-grid">
      <GaugeCard v-for="gauge in gauges" :key="gauge.id" :title="gauge.name" :value="gauge.value" :unit="gauge.unit"
        :status="gauge.status" :max="gauge.max" />
    </div>
  </div>
</template>

<script>
import GaugeCard from './GaugeCard.vue';

export default {
  components: { GaugeCard },
  props: {
    gauges: Array
  }
}
</script>

<style scoped>
.gauge-section {
  margin: 0;
}

.gauge-section h2 {
  color: #e2e8f0;
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
}

.gauge-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}
</style>