<template>
  <div class="gauge-card">
    <h3>{{ title }}</h3>
    <div class="gauge-value">{{ value }} {{ unit }}</div>
    <canvas ref="gaugeCanvas"></canvas>
    <span class="status-badge" :class="statusClass">{{ status }}</span>
  </div>
</template>

<script>
import { Chart } from 'chart.js/auto';

export default {
  name: 'GaugeCard',
  props: {
    title: String,
    value: Number,
    unit: String,
    status: String,
    max: { type: Number, default: 100 }
  },
  computed: {
    statusClass() {
      return this.status.toLowerCase();
    }
  },
  mounted() {
    this.createGauge();
  },
  methods: {
    createGauge() {
      const canvas = this.$refs.gaugeCanvas;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          datasets: [{
            data: [50, 50],
            backgroundColor: ['#eab308', 'rgba(255, 255, 255, 0.1)'],
            borderWidth: 0
          }]
        },
        options: {
          cutout: '75%',
          responsive: true,
          animation: false,
          plugins: { legend: { display: false }, tooltip: { enabled: false } }
        }
      });
    }
  }
}
</script>

<style scoped>
.gauge-card {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border: 1px solid rgba(100, 116, 139, 0.3);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

.gauge-card h3 {
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 1rem;
  color: #94a3b8;
}

.gauge-value {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

canvas {
  max-height: 150px;
  margin: 1rem auto;
}

.status-badge {
  display: inline-block;
  padding: 0.25rem 1rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-top: 0.5rem;
}

.status-badge.ok {
  background: #22c55e;
  color: #000;
}

.status-badge.warn {
  background: #eab308;
  color: #000;
}
</style>