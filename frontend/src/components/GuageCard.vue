<script setup>
import { ref, onMounted } from 'vue'
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js'

ChartJS.register(ArcElement, Tooltip)

const props = defineProps({
  name: String,
  value: Number,
  max: Number,
  unit: String
})

const chartData = ref({
  datasets: [{
    data: [props.value, props.max - props.value],
    backgroundColor: ['#28a745', '#e0e0e0'],
    borderWidth: 0
  }]
})

const chartOptions = ref({
  responsive: true,
  cutout: '80%',
  plugins: {
    tooltip: { enabled: false }
  }
})
</script>

<template>
  <div class="gauge-card">
    <h3>{{ name }}</h3>
    <div class="gauge">
      <Doughnut :data="chartData" :options="chartOptions" />
      <div class="gauge-value">
        <span class="value">{{ value }}</span>
        <span class="unit">{{ unit }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gauge-card {
  background: #2c3e50;
  color: white;
  padding: 20px;
  border-radius: 12px;
}

.gauge {
  position: relative;
  width: 200px;
  margin: 0 auto;
}

.gauge-value {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.value {
  display: block;
  font-size: 2em;
  font-weight: bold;
  color: #28a745;
}

.unit {
  font-size: 0.9em;
}
</style>