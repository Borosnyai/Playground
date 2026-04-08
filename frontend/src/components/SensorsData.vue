<script setup>
import { ref, computed } from 'vue'
import SensorsData from './SensorsData.vue'

const sections = [
  'Features',
  'Identification',
  'Parameter',
  'Diagnosis',
  'Process Data Structure',
  'Connection',
  'Events',
]

const activeSection = ref('Features')

const dataMap = {
  Features: [
    {
      title: 'Feature',
      rows: [
        { name: 'Data Storage', value: 'Supported' },
        { name: 'Block Parameterization', value: 'Supported' },
      ],
    },
    {
      title: 'Profile',
      rows: [
        { name: 'Smart Sensor - SSP 0', value: 'Generic Profiled Sensor' },
        { name: 'Function', value: 'Device identification' },
        { name: 'Function', value: 'Multiple switching signal' },
        { name: 'Function', value: 'Device diagnosis' },
        { name: 'Function', value: 'Teach channel' },
      ],
    },
    {
      title: 'Communication Characteristic',
      rows: [
        { name: 'IO-Link Revision', value: 'V1.1' },
        { name: 'Transmission Rate', value: 'COM2 (38.4 kbit/s)' },
        { name: 'Min. Cycle Time', value: '4.0 ms' },
        { name: 'Process Data Input', value: '3 bytes' },
        { name: 'Process Data Output', value: '2 bit' },
        { name: 'SIO Mode Support', value: 'Yes' },
        { name: 'ISDU Support', value: 'Yes' },
      ],
    },
    {
      title: 'Supported Product Variants',
      rows: [
        { name: 'BOS026R', value: 'BOS 21M-UUI-RP30-S4' },
      ],
    },
  ],

  Identification: [],
  Parameter: [],
  Diagnosis: [],
  'Process Data Structure': [],
  Connection: [],
  Events: [],
}

const openGroups = ref({})

function getGroups(section) {
  return dataMap[section] || []
}

function toggleGroup(title) {
  openGroups.value[title] = !openGroups.value[title]
}

function isOpen(title) {
  return !!openGroups.value[title]
}

function expandAll() {
  const groups = getGroups(activeSection.value)
  const next = {}
  for (const group of groups) {
    next[group.title] = true
  }
  openGroups.value = next
}

function collapseAll() {
  const groups = getGroups(activeSection.value)
  const next = {}
  for (const group of groups) {
    next[group.title] = false
  }
  openGroups.value = next
}

function selectSection(section) {
  activeSection.value = section
  collapseAll()
}

const currentGroups = computed(() => getGroups(activeSection.value))
</script>

<template>
  <div class="sensor-data-layout">
    <!-- LEFT MENU -->
    <div class="left-menu">
      <button
        v-for="section in sections"
        :key="section"
        class="left-menu-item"
        :class="{ active: activeSection === section }"
        @click="selectSection(section)"
      >
        {{ section }}
      </button>
    </div>

    <!-- RIGHT CONTENT -->
    <div class="right-content">
      <div class="top-actions">
        <button class="action-btn" @click="expandAll">Expand</button>
        <button class="action-btn" @click="collapseAll">Collapse</button>
      </div>

      <div class="table-header">
        <div class="col-name">Name</div>
        <div class="col-value">Value</div>
      </div>

      <div v-if="currentGroups.length === 0" class="empty-box">
        Noch keine Daten in diesem Bereich.
      </div>

      <div
        v-for="group in currentGroups"
        :key="group.title"
        class="group-block"
      >
        <button class="group-header" @click="toggleGroup(group.title)">
          <span class="icon-box">
            {{ isOpen(group.title) ? '−' : '+' }}
          </span>

          <span class="group-title">{{ group.title }}</span>
        </button>

        <div v-if="isOpen(group.title)" class="group-body">
          <div
            v-for="(row, index) in group.rows"
            :key="group.title + '-' + index"
            class="data-row"
          >
            <div class="data-name">{{ row.name }}</div>
            <div class="data-value">{{ row.value }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sensor-data-layout {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 34px;
  align-items: start;
}

.left-menu {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 8px;
}

.left-menu-item {
  border: none;
  background: transparent;
  text-align: left;
  padding: 6px 0;
  cursor: pointer;
  color: #6c7b8a;
  font-size: 16px;
}

.left-menu-item.active {
  color: #3b79c9;
  font-weight: 600;
}

.right-content {
  width: 100%;
}

.top-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-bottom: 12px;
}

.action-btn {
  padding: 4px 14px;
  border: 1px solid #5c6570;
  background: #f8f8f8;
  cursor: pointer;
  font-size: 14px;
}

.table-header {
  display: grid;
  grid-template-columns: 1fr 320px;
  border-bottom: 1px solid #9f9f9f;
  margin-bottom: 6px;
}

.col-name,
.col-value {
  padding: 0 8px 6px 8px;
  color: #7b7b7b;
  font-size: 15px;
}

.col-value {
  border-left: 1px solid #9f9f9f;
}

.group-block {
  margin-bottom: 4px;
}

.group-header {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  border: none;
  background: transparent;
  border-bottom: 1px solid #bdbdbd;
  padding: 8px 0 8px 0;
  cursor: pointer;
  text-align: left;
}

.icon-box {
  width: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #6a6a6a;
  font-size: 18px;
  font-weight: bold;
}

.group-title {
  color: #4c83c8;
  font-size: 16px;
}

.group-body {
  width: 100%;
}

.data-row {
  display: grid;
  grid-template-columns: 1fr 320px;
  min-height: 30px;
  border-bottom: 1px solid #d3d3d3;
}

.data-name,
.data-value {
  padding: 6px 8px;
  font-size: 15px;
  color: #6d6d6d;
}

.data-name {
  padding-left: 34px;
}

.data-value {
  border-left: 1px solid #c7c7c7;
  color: #2f3b4a;
}

.empty-box {
  padding: 20px 8px;
  color: #8a8a8a;
  border-bottom: 1px solid #d3d3d3;
}

@media (max-width: 1000px) {
  .sensor-data-layout {
    grid-template-columns: 1fr;
  }

  .table-header,
  .data-row {
    grid-template-columns: 1fr;
  }

  .col-value,
  .data-value {
    border-left: none;
  }

  .data-name {
    padding-left: 8px;
  }

  .top-actions {
    justify-content: flex-start;
  }
}
</style>