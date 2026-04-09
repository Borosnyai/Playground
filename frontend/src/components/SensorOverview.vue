<script setup>
import { onMounted, ref, computed } from 'vue'
import SensorsData from './SensorsData.vue'
import VariableTable from './VariableTable.vue'

const loading = ref(true)
const error = ref('')
const rawData = ref(null)
const activeTab = ref('overview')

const overviewCompany = computed(() => {
    const d = rawData.value || {}
    return firstNonEmpty(
        d.manufacturer,
        d.vendorName,
        d.vendor,
        d.manufacturer_name,
        'Balluff GmbH'
    )
})

const overviewProduct = computed(() => {
    const d = rawData.value || {}
    return firstNonEmpty(
        d.productName,
        d.product_name,
        d.name,
        d.deviceName,
        'BOS 21M-UUI-RP30-S4'
    )
})

async function loadOverview() {
    try {
        loading.value = true
        error.value = ''

        const response = await fetch('http://localhost:8000/iodd')

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`)
        }

        const data = await response.json()
        console.log('Geladene Variablen:', data)

        rawData.value = data || []

        
    } catch (err) {
        console.error('Fehler beim Laden der Übersicht:', err)
        error.value = 'Fehler beim Laden der Übersichtsdaten'
    } finally {
        loading.value = false
    }
}

function firstNonEmpty(...values) {
    for (const value of values) {
        if (value !== undefined && value !== null && String(value).trim() !== '') {
            return value
        }
    }
    return '-'
}

const overviewRows = computed(() => {
    const d = rawData.value || {}

    return [
        {
            label: 'Manufacturer',
            value: firstNonEmpty(
                d.manufacturer,
                d.vendorName,
                d.vendor,
                d.manufacturer_name
            ),
        },
        {
            label: 'Article number',
            value: firstNonEmpty(
                d.articleNumber,
                d.article_number,
                d.productId,
                d.article,
                
            ),
        },
        {
            label: 'Product name',
            value: firstNonEmpty(
                d.productName,
                d.product_name,
                d.name,
                d.deviceName,
                d.device_name
            ),
        },
        {
            label: 'Device ID',
            value: firstNonEmpty(
                d.deviceId,
                d.device_id,
                d.id
            ),
        },
        {
            label: 'Description',
            value: firstNonEmpty(
                d.description,
                d.shortDescription,
                d.text
            ),
        },
        {
            label: 'Device family',
            value: firstNonEmpty(
                d.deviceFamily,
                d.device_family,
                d.family
            ),
        },
        {
            label: 'Uploaded At',
            value: firstNonEmpty(
                d.uploadedAt,
                d.uploaded_at,
                d.createdAt
            ),
        },
        {
            label: 'IO-Link Rev.',
            value: firstNonEmpty(
                d.ioLinkRevision,
                d.io_link_revision,
                d.ioLinkRev
            ),
        },
        {
            label: 'Version',
            value: firstNonEmpty(
                d.version,
                d.deviceVersion
            ),
        },
        {
            label: 'IODD-Release-Date',
            value: firstNonEmpty(
                d.ioddReleaseDate,
                d.iodd_release_date,
                d.releaseDate
            ),
        },
        {
            label: 'Device description',
            value: firstNonEmpty(
                d.fileName,
                d.filename,
                d.deviceDescriptionFile
            ),
            isFile: true,
        },
    ]
})

const manufacturerLogo = computed(() => {
    const d = rawData.value || {}
    return firstNonEmpty(d.logoUrl, d.logo, '')
})

const productImage = computed(() => {
    const d = rawData.value || {}
    return firstNonEmpty(d.image_Url, d.image, d.productImage, '')
})

onMounted(() => {
    loadOverview()
})
</script>

<template>
    <div class="overview-wrapper">
        <div class="top-brand-bar">
            <div class="brand-left">
                <div class="brand-text">BOS 21M-UUI-RP30-S4</div>
            </div>
        </div>
        <!--Details Bar-->
        <div class="details-bar">
            <div class="details-back"></div>
            <div class="details-title">Details</div>
            <div class="details-device">
                <div class="details-company">{{ overviewCompany }}</div>
                <div class="details-product">{{ overviewProduct }}</div>
            </div>
        </div>

        <div class="tabs">
            <button class="tab" :class="{ active: activeTab === 'overview' }" @click="activeTab = 'overview'">
                Overview
            </button>

            <button class="tab" :class="{ active: activeTab === 'ioddviewer' }" @click="activeTab = 'ioddviewer'">
                Sensors data
            </button>

            <button class="tab" :class="{ active: activeTab === 'vartable' }" @click="activeTab = 'vartable'">
                Table of variables
            </button>
        </div>

        <div class="content">
            <div v-if="loading" class="status-box">Lade Übersicht...</div>
            <div v-else-if="error" class="status-box error">{{ error }}</div>

            <template v-else>
                <div v-show="activeTab === 'overview'" class="overview-layout">
                    <div class="overview-left">
                        <div v-for="row in overviewRows" :key="row.label" class="info-row">
                            <div class="info-label">{{ row.label }}</div>

                            <div class="info-value">{{ row.value }}</div>
                        </div>
                    </div>

                    <div class="overview-right">
                        <div class="product-box">
                            <img v-if="productImage && productImage !== '-'" :src="productImage" alt="Sensor"
                                class="product-image" />
                            <div v-else class="image-placeholder">
                                Sensor Bild
                            </div>
                        </div>
                    </div>
                </div>

                <div v-show="activeTab === 'ioddviewer'">
                    <SensorsData />
                </div>
                <div v-show="activeTab === 'vartable'">
                    <VariableTable />
                </div>
            </template>
        </div>
    </div>
</template>

<style scoped>
.overview-wrapper {
    background: #f7f7f7;
    min-height: 100vh;
    color: #2f3b4a;
    font-family: Arial, sans-serif;
}

/* ===== TOP BRAND BAR ===== */
.top-brand-bar {
    height: 70px;
    background: #f3f3f3;
    display: flex;
    align-items: center;
    padding: 0 22px;
    border-bottom: 1px solid #d8d8d8;
}

.brand-left {
    display: flex;
    align-items: center;
    gap: 12px;
}

.brand-logo {
    height: 42px;
    width: auto;
    object-fit: contain;
    display: block;
}

.brand-text {
    font-size: 24px;
    font-weight: 700;
    color: #4d79bd;
}

/* ===== DETAILS BAR ===== */
.details-bar {
    height: 50px;
    background: #4a4a4a;
    color: white;
    display: grid;
    grid-template-columns: 54px 110px 1fr;
    align-items: center;
}

.details-back {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    color: #9a9a9a;
    border-right: 1px solid #666;
    cursor: pointer;
}

.details-title {
    font-size: 20px;
    font-weight: 700;
    padding-left: 20px;
}

.details-device {
    display: flex;
    flex-direction: column;
    justify-content: center;
    line-height: 1.2;
    padding-left: 18px;
}

.details-company,
.details-product {
    font-size: 14px;
    color: #f2f2f2;
}

/* ===== TABS ===== */
.tabs {
    display: flex;
    gap: 0;
    padding: 0 22px;
    background: #efefef;
    border-bottom: 1px solid #dcdcdc;
}

.tab {
    border: none;
    background: transparent;
    padding: 14px 14px 12px;
    cursor: pointer;
    font-size: 16px;
    color: #5a6470;
    border-bottom: 3px solid transparent;
}

.tab.active {
    color: #3b79c9;
    border-bottom-color: #3b79c9;
}

/* ===== CONTENT ===== */
.content {
    padding: 24px 36px 40px;
}

.status-box {
    padding: 14px 16px;
    background: white;
    border: 1px solid #dcdcdc;
}

.status-box.error {
    color: #b42318;
}

/* ===== MAIN LAYOUT ===== */
.overview-layout {
    display: grid;
    grid-template-columns: minmax(700px, 1fr) 280px;
    gap: 48px;
    align-items: start;
}

/* ===== LEFT SIDE ===== */
.overview-left {
    background: transparent;
}

.info-row {
    display: grid;
    grid-template-columns: 210px 1fr;
    min-height: 38px;
    align-items: center;
    border-bottom: 1px solid #dddddd;
}

.info-label {
    color: #6c7b8a;
    padding: 10px 0;
}

.info-value {
    color: #243447;
    padding: 10px 0 10px 24px;
    front-weight: 500;
}

/* ===== RIGHT SIDE ===== */
.overview-right {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 60px;
}

.product-box {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.product-image {
    max-width: 350px;
    max-height: 350px;
    object-fit: contain;
    margin-top: 40px;
    padding-top: 40px;
}

.image-placeholder {
    width: 180px;
    height: 240px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #7b8794;
    border: 1px dashed #c9c9c9;
    background: white;
}

.logo-placeholder {
    width: 160px;
    height: 60px;
}

.image-placeholder {
    width: 140px;
    height: 180px;
}

/* ===== PLACEHOLDER TAB ===== */
.placeholder-tab {
    padding: 30px;
    background: white;
    border: 1px solid #dddddd;
    color: #667085;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 1000px) {
    .overview-layout {
        grid-template-columns: 1fr;
    }

    .overview-right {
        align-items: flex-start;
    }
}

@media (max-width: 700px) {
    .content {
        padding: 18px;
    }
}
</style>