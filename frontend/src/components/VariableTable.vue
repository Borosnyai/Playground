<script setup>
import { onMounted, ref } from 'vue'

const readValues = ref({})
const variables = ref([])
const loading = ref(true)
const error = ref('')
const writeValues = ref({})

function isReadOnly(access) {
  return access === 'AccessRightsT.RO'
}

function isReadWrite(access) {
  return access === 'AccessRightsT.RW'
}

function isWriteOnly(access) {
  return access === 'AccessRightsT.WO'
}

function canRead(access) {
  return isReadOnly(access) || isReadWrite(access)
}

function canWrite(access) {
  return isReadWrite(access) || isWriteOnly(access)
}

function getWriteKey(variable) {
  return `${variable.index}-${variable.subindex ?? 0}`
}

function formatDatatype(datatype) {
  if (!datatype) return '-'

  if (datatype.startsWith('ResolvedRecordT')) return 'Record'
  if (datatype.startsWith('ResolvedStringT')) return 'String'
  if (datatype.startsWith('ResolvedUIntegerT')) return 'UInteger'
  if (datatype.startsWith('ResolvedBooleanT')) return 'Boolean'
  if (datatype.startsWith('ResolvedArrayT')) return 'Array'

  return datatype
}

async function loadVariables() {
  try {
    loading.value = true
    error.value = ''

    const response = await fetch('http://localhost:3000/sensor/variables')

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`)
    }

    const data = await response.json()
    console.log('Geladene Variablen:', data)

    variables.value = data.variables || []
  } catch (err) {
    console.error('Fehler beim Laden:', err)
    error.value = 'Fehler beim Laden der Variablen'
  } finally {
    loading.value = false
  }
}

async function readValue(variable) {
  try {
    const subindex = variable.subindex ?? 0

    const response = await fetch(
      `http://localhost:3000/sensor/value/${variable.index}/${subindex}`
    )

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`)
    }

    const data = await response.json()

    readValues.value[getWriteKey(variable)] =
      data.value ?? data.name ?? JSON.stringify(data)

    console.log('Read result:', data)
  } catch (err) {
    console.error('Read error:', err)
    readValues.value[getWriteKey(variable)] = 'Fehler'
  }
}

async function writeValue(variable) {
  try {
    const key = getWriteKey(variable)
    const value = writeValues.value[key]
    const subindex = variable.subindex ?? 0

    const response = await fetch(
      `http://localhost:3000/sensor/value/${variable.index}/${subindex}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value }),
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`)
    }

    const data = await response.json()
    console.log('Write result:', data)
  } catch (err) {
    console.error('Write error:', err)
  }
}

onMounted(() => {
  loadVariables()
})
</script>

<template>
  <div class="table-wrapper">
    <p v-if="loading">Lade Variablen...</p>
    <p v-else-if="error">{{ error }}</p>

    <table v-else class="variable-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Index</th>
          <th>Subindex</th>
          <th>Datatype</th>
          <th>Zugriff</th>
          <th>Wert</th>
          <th>Aktion</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="variable in variables" :key="variable.id">
          <td>{{ variable.name }}</td>
          <td>{{ variable.index }}</td>
          <td>{{ variable.subindex ?? 0 }}</td>
          <td>{{ formatDatatype(variable.datatype) }}</td>
          <td>{{ variable.access_rights }}</td>
          <td>{{ readValues[getWriteKey(variable)] ?? '-' }}</td>
          <td>
            <div class="action-box">
              <button v-if="canRead(variable.access_rights)" @click="readValue(variable)">
                Read
              </button>

              <template v-if="canWrite(variable.access_rights)">
                <input v-model="writeValues[getWriteKey(variable)]" type="text" placeholder="Wert eingeben"
                  class="write-input" />
                <button @click="writeValue(variable)">
                  Write
                </button>
              </template>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-wrapper {
  background: #111827;
  padding: 16px;
  border-radius: 12px;
  overflow-x: auto;
}

.variable-table {
  width: 100%;
  border-collapse: collapse;
}

.variable-table th,
.variable-table td {
  border: 1px solid #334155;
  padding: 10px;
  text-align: left;
  vertical-align: top;
}

.variable-table th {
  background: #1e293b;
}

button {
  padding: 6px 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.action-box {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.write-input {
  width: 120px;
  padding: 4px 6px;
  border: 1px solid #334155;
  border-radius: 4px;
  background: white;
  color: black;
}
</style>