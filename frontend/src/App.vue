<script setup>
import VariableTable from './components/VariableTable.vue'
</script>

<template>
  <div class="app-container">
    <h1>IO-Link Variablen</h1>
    <VariableTable />
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  padding: 24px;
  background: #0f172a;
  color: white;
  font-family: Arial, sans-serif;
}

h1 {
  margin-bottom: 20px;
}
</style>