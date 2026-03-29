<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { Example } from '@/types/example'

const props = defineProps<{ example: Example }>()

const mapContainer = ref<HTMLDivElement>()
let mapInstance: L.Map | null = null

function initMap() {
  if (!mapContainer.value || mapInstance) return

  const center = props.example.mapCenter || [39.9042, 116.4074] // Beijing default
  const zoom = props.example.mapZoom || 12

  mapInstance = L.map(mapContainer.value, {
    center,
    zoom,
    zoomControl: true,
  })

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19,
  }).addTo(mapInstance)

  // Resize observer
  const ro = new ResizeObserver(() => {
    mapInstance?.invalidateSize()
  })
  ro.observe(mapContainer.value)

  onUnmounted(() => {
    ro.disconnect()
    mapInstance?.remove()
    mapInstance = null
  })
}

onMounted(() => {
  initMap()
})

watch(() => props.example.id, () => {
  if (mapInstance) {
    mapInstance.remove()
    mapInstance = null
  }
  initMap()
})
</script>

<template>
  <div ref="mapContainer" class="w-full h-full" />
</template>
