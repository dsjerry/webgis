<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import type { Example } from '@/types/example'

const props = defineProps<{ example: Example }>()

const mapContainer = ref<HTMLDivElement>()
let mapInstance: maplibregl.Map | null = null

function initMap() {
  if (!mapContainer.value || mapInstance) return

  const center = props.example.mapCenter || [116.4074, 39.9042]
  const zoom = props.example.mapZoom || 10

  mapInstance = new maplibregl.Map({
    container: mapContainer.value,
    style: {
      version: 8,
      sources: {
        'osm': {
          type: 'raster',
          tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
          tileSize: 256,
          attribution: '&copy; OpenStreetMap contributors',
        },
      },
      layers: [
        {
          id: 'osm',
          type: 'raster',
          source: 'osm',
          minzoom: 0,
          maxzoom: 19,
        },
      ],
    },
    center,
    zoom,
  })

  const ro = new ResizeObserver(() => {
    mapInstance?.resize()
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
