<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useExamplesStore } from '@/stores/examples'
import CodePreview from '@/components/layout/CodePreview.vue'
import LeafletMap from '@/components/map/LeafletMap.vue'
import OpenLayersMap from '@/components/map/OpenLayersMap.vue'
import MapLibreMap from '@/components/map/MapLibreMap.vue'

const route = useRoute()
const store = useExamplesStore()

const showCode = ref(true)
const activeExampleId = computed(() => route.params.id as string)

const example = computed(() => {
  for (const phase of store.phases) {
    for (const mod of phase.modules) {
      const found = mod.examples.find(e => e.id === activeExampleId.value)
      if (found) return found
    }
  }
  return null
})

const breadcrumb = computed(() => {
  if (!example.value) return []
  return [
    { label: 'Home', to: '/' },
    { label: `Phase ${example.value.phase}: ${example.value.phaseTitle}`, to: null },
    { label: example.value.module, to: null },
    { label: example.value.title, to: null },
  ]
})

const phaseColors: Record<number, string> = {
  1: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  2: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  3: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
  4: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  5: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300',
  6: 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300',
  7: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300',
}

function copyLink() {
  navigator.clipboard.writeText(window.location.href)
}
</script>

<template>
  <div v-if="example" class="flex flex-col h-full">
    <!-- Example header -->
    <div class="flex-shrink-0 px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-1.5 flex-wrap">
        <template v-for="(crumb, i) in breadcrumb" :key="i">
          <span v-if="i > 0" class="text-gray-400">/</span>
          <router-link v-if="crumb.to" :to="crumb.to" class="hover:text-primary transition-colors">{{ crumb.label }}</router-link>
          <span v-else class="text-gray-600 dark:text-gray-300">{{ crumb.label }}</span>
        </template>
      </div>
      <div class="flex items-start justify-between gap-3">
        <div class="flex-1 min-w-0">
          <h1 class="text-base font-bold text-gray-900 dark:text-white truncate">{{ example.title }}</h1>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{{ example.description }}</p>
        </div>
        <div class="flex items-center gap-2 flex-shrink-0">
          <span :class="['px-2 py-0.5 rounded text-[10px] font-semibold', phaseColors[example.phase] || phaseColors[1]]">
            Phase {{ example.phase }}
          </span>
          <button
            class="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            @click="copyLink"
            title="Copy link"
          >
            <svg class="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
            </svg>
          </button>
        </div>
      </div>
      <!-- Tags -->
      <div class="flex flex-wrap gap-1 mt-2">
        <span
          v-for="tag in example.tags"
          :key="tag"
          class="px-1.5 py-0.5 rounded text-[10px] bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700"
        >
          {{ tag }}
        </span>
        <span class="px-1.5 py-0.5 rounded text-[10px] bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
          {{ example.mapType }}
        </span>
      </div>
    </div>

    <!-- Split pane: Map + Code -->
    <div class="flex-1 flex overflow-hidden">
      <!-- Map area -->
      <div class="flex-1 overflow-hidden" :class="showCode ? 'hidden sm:block' : ''">
        <div class="h-full relative">
          <!-- Map component -->
          <div class="absolute inset-0 overflow-hidden">
            <LeafletMap v-if="example.mapType === 'leaflet'" :example="example" />
            <OpenLayersMap v-else-if="example.mapType === 'openlayers'" :example="example" />
            <MapLibreMap v-else-if="example.mapType === 'maplibre'" :example="example" />
            <div v-else class="h-full flex items-center justify-center bg-gray-100 dark:bg-gray-900">
              <div class="text-center">
                <svg class="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h7"/>
                </svg>
                <p class="text-sm text-gray-400">No live map for this example type</p>
              </div>
            </div>
          </div>

          <!-- Mobile: code toggle -->
          <button
            class="sm:hidden absolute top-3 right-3 z-10 p-2 rounded-lg bg-white/90 dark:bg-gray-800/90 shadow-md backdrop-blur-sm border border-gray-200 dark:border-gray-700 transition-colors"
            @click="showCode = !showCode"
          >
            <svg class="w-4 h-4 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Code panel -->
      <div
        v-if="showCode"
        class="w-full sm:w-[45%] lg:w-[42%] flex-shrink-0 border-l border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden bg-white dark:bg-gray-900"
      >
        <!-- Code toggle (desktop) -->
        <div class="flex-shrink-0 flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
          <span class="text-xs font-medium text-gray-500 dark:text-gray-400">
            Code &middot; {{ example.files.length }} file{{ example.files.length > 1 ? 's' : '' }}
          </span>
          <button
            class="hidden sm:block p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            @click="showCode = false"
          >
            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Code content -->
        <div class="flex-1 overflow-y-auto">
          <CodePreview :files="example.files" />
        </div>
      </div>
    </div>
  </div>

  <!-- Not found -->
  <div v-else class="flex items-center justify-center h-full">
    <div class="text-center">
      <svg class="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      <p class="text-gray-500 dark:text-gray-400 text-sm">Example not found.</p>
      <router-link to="/" class="text-primary text-sm mt-2 inline-block hover:underline">&larr; Back to Home</router-link>
    </div>
  </div>
</template>
