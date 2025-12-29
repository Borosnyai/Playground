<script setup>
import SensorCard from './components/SensorCard.vue'
import GaugeCard from './components/GuageCard.vue';


const sensors = [
  {
    name: 'Vibration Sensor',
    type: 'vibration',
    velocity: 2.5,
    frequency: 60,
    temperature: 45,
    status: 'OK'
  },
  {
    name: 'Light Barrier',
    type: 'light-barrier',
    blocked: false,
    temperature: 25,
    status: 'OK'
  },
  {
    name: 'Distance Sensor',
    type: 'distance',
    distance: 150,
    temperature: 30,
    status: 'OK'
  },
  {
    name: 'Pressure Sensor',
    type: 'pressure',
    pressure: 5.2,
    temperature: 28,
    status: 'OK'
  }
]
</script>

<template>
  <div class="app">
    <header>
      <h1>Sensor Dashboard</h1>
    </header>
    <div class="dashboard">
      <GaugeCard 
        name="Temperature"
        :value="70.8"
        :max="100"
        unit="°F"
      />
      <GaugeCard 
        name="Air Quality"
        :value="42"
        :max="100"
        unit="AQI"
      />
    <SensorCard 
      v-for="sensor in sensors"
      :key="sensor.name"
      :name="sensor.name"
      :type="sensor.type"
      :velocity="sensor.velocity"
      :frequency="sensor.frequency"
      :temperature="sensor.temperature"
      :distance="sensor.distance"
      :pressure="sensor.pressure"
      :blocked="sensor.blocked"
      :status="sensor.status"
    />
    </div>
  </div>
</template>

<style>
.app {
  background: #1a1a2e;
  min-height: 100vh;
  text-align: center;
}

header {
  background: #16213e;
  color: white;
  padding: 20px;
}

.dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
}
</style>