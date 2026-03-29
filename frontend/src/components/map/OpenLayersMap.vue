<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import { fromLonLat } from 'ol/proj'
import 'ol/ol.css'
import type { Example } from '@/types/example'

const props = defineProps<{ example: Example }>()

const mapContainer = ref<HTMLDivElement>()
let mapInstance: Map | null = null

function initMap() {
  if (!mapContainer.value || mapInstance) return

  const center = props.example.mapCenter || [116.4074, 39.9042] // Beijing (lon/lat for OL)
  const zoom = props.example.mapZoom || 10

  mapInstance = new Map({
    target: mapContainer.value,
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
    ],
    view: new View({
      center: fromLonLat(center),
      zoom,
    }),
  })

  const ro = new ResizeObserver(() => {
    mapInstance?.updateSize()
  })
  ro.observe(mapContainer.value)

  onUnmounted(() => {
    ro.disconnect()
    mapInstance?.setTarget(undefined)
    mapInstance = null
  })
}

onMounted(() => {
  initMap()
})

watch(() => props.example.id, () => {
  if (mapInstance) {
    mapInstance.setTarget(undefined)
    mapInstance = null
  }
  initMap()
})
</script>

<template>
  <div ref="mapContainer" class="w-full h-full" />
</template>
