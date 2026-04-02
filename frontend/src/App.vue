<script setup>

import DashboardLayout from './components/dashboard/Layout.vue'
import { onMounted } from 'vue';
import { useSensorStore } from './stores/sensorStore';
import { initDataService } from './services/dataService';
import Layout from './components/Dashboard/Layout.vue'

const store = useSensorStore()

function initApp() {
  initDataService(store)
}
onMounted(() => {
  initApp()
})
</script>

<template>
  <Layout />
</template>