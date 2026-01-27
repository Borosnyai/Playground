<script setup>
import { onMounted } from 'vue'
import { useSensorStore } from './stores/sensorStore'
import { initDataService } from './services/dataService'

const store = useSensorStore()

onMounted(() => {
  initDataService(store)
})
</script>


<template>
  <DashboardLayout />
</template>
