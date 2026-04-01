<script setup>
import { onMounted } from 'vue';
import { Chart } from 'chart.js/auto';

const props = defineProps({
  sensors: Array
});

onMounted(() => {
  props.sensors.forEach(sensor => {
    const data = Array.from({ length: 30 }, () =>
      sensor.value + (Math.random() - 0.5) * 15
    );

    const canvas = document.getElementById('chart_' + sensor.id);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map((_, i) => i),
        datasets: [{
          label: sensor.unit,
          data: data,
          borderColor: getColor(sensor.status),
          backgroundColor: getColor(sensor.status) + '20',
          borderWidth: 2,
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: {
            grid: { color: 'rgba(255, 255, 255, 0.1)' },
            ticks: { color: '#94a3b8' }
          },
          x: {
            grid: { display: false },
            ticks: { color: '#94a3b8' }
          }
        }
      }
    });
  });
});

function getColor(status) {
  if (status === 'OK') return '#22c55e';
  if (status === 'WARN') return '#eab308';
  return '#ef4444';
}
</script>

<template>
  <div class="timeseries-section">

    <h2>Sensor History</h2>
    <div class="chart-grid">
      <div v-for="sensor in sensors" :key="sensor.id" class="chart-card">
        <h3>{{ sensor.title }}</h3>
        <canvas :id="'chart_' + sensor.id"></canvas>
      </div>
    </div>
  </div>
</template>



<style scoped>
.time-series {
  min-height: 240px;
}

.timeseries-section {
  margin: 2rem 0;
}

.timeseries-section h2 {
  color: #e2e8f0;
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
}

.chart-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.chart-card {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border: 1px solid rgba(100, 116, 139, 0.3);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  min-height: 280px;
}

.chart-card h3 {
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 1rem;
  color: #94a3b8;
}

canvas {
  height: 200px !important;
  width: 100% !important;
}
</style>
