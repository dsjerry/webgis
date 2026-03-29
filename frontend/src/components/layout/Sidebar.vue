<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useExamplesStore } from '@/stores/examples'

const emit = defineEmits<{ navigate: [] }>()
const router = useRouter()
const route = useRoute()
const store = useExamplesStore()

const expandedPhases = ref<Set<number>>(new Set([1, 3]))

const phaseIcons: Record<number, string> = {
  1: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>`,
  2: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
  3: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>`,
  4: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"/></svg>`,
  5: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"/></svg>`,
  6: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>`,
  7: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>`,
}

function togglePhase(id: number) {
  if (expandedPhases.value.has(id)) {
    expandedPhases.value.delete(id)
  } else {
    expandedPhases.value.add(id)
  }
}

function navigateTo(id: string) {
  store.setActiveExample(id)
  router.push({ name: 'example', params: { id } })
  emit('navigate')
}

function isActive(id: string): boolean {
  return route.params.id === id
}
</script>

<template>
  <div class="flex flex-col h-full">
    <!-- Logo area -->
    <div class="flex-shrink-0 px-4 py-4 border-b border-gray-200 dark:border-gray-800">
      <div class="flex items-center gap-2 mb-3">
        <svg class="w-7 h-7" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="si-g" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#10b981"/>
              <stop offset="100%" style="stop-color:#3b82f6"/>
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="45" fill="url(#si-g)"/>
          <path d="M30 65 L50 30 L70 65 Z" fill="white" opacity="0.9"/>
          <circle cx="50" cy="52" r="8" fill="#10b981"/>
        </svg>
        <div>
          <div class="font-semibold text-sm leading-tight">WebGIS 从0到1</div>
          <div class="text-[10px] text-gray-400 dark:text-gray-500">Learning Platform</div>
        </div>
      </div>

      <!-- Search -->
      <div class="relative">
        <svg class="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <input
          type="text"
          placeholder="Search examples..."
          class="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors placeholder:text-gray-400"
          :value="store.searchQuery"
          @input="store.setSearchQuery(($event.target as HTMLInputElement).value)"
        />
      </div>
    </div>

    <!-- Phase tree -->
    <nav class="flex-1 overflow-y-auto py-2 px-2">
      <div v-for="phase in store.filteredPhases" :key="phase.id" class="mb-1">
        <!-- Phase header -->
        <button
          class="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
          @click="togglePhase(phase.id)"
        >
          <!-- Phase icon -->
          <span v-html="phaseIcons[phase.id] || phaseIcons[1]" :class="['flex-shrink-0', phase.color]" />
          <span class="flex-1 text-xs font-semibold text-gray-700 dark:text-gray-200 truncate">{{ phase.title }}</span>
          <!-- Chevron -->
          <svg
            class="w-3 h-3 text-gray-400 transition-transform duration-200 flex-shrink-0"
            :class="{ 'rotate-90': expandedPhases.has(phase.id) }"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>

        <!-- Modules & Examples -->
        <div
          v-if="expandedPhases.has(phase.id)"
          class="ml-3 mt-0.5 space-y-0.5 border-l border-gray-200 dark:border-gray-700 pl-2"
        >
          <div v-for="mod in phase.modules" :key="mod.name">
            <!-- Module label -->
            <div class="px-2 py-1 text-[10px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider mt-1">
              {{ mod.name }}
            </div>

            <!-- Example items -->
            <button
              v-for="ex in mod.examples"
              :key="ex.id"
              class="w-full flex items-center gap-1.5 px-2 py-1 rounded-md text-left text-xs transition-all duration-150"
              :class="isActive(ex.id)
                ? 'bg-primary/10 text-primary dark:text-primary border-l-2 border-primary -ml-px'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'"
              @click="navigateTo(ex.id)"
            >
              <!-- Map type indicator dot -->
              <span
                class="w-1.5 h-1.5 rounded-full flex-shrink-0"
                :class="{
                  'bg-green-500': ex.mapType === 'leaflet',
                  'bg-blue-500': ex.mapType === 'openlayers',
                  'bg-purple-500': ex.mapType === 'maplibre',
                  'bg-amber-500': ex.mapType === 'turf',
                  'bg-teal-500': ex.mapType === 'postgis' || ex.mapType === 'nestjs',
                  'bg-cyan-500': ex.mapType === 'pgrouting',
                  'bg-pink-500': ex.mapType === 'pgrouting',
                  'bg-gray-400': ex.mapType === 'none' || ex.mapType === 'docker'
                }"
              />
              <span class="truncate">{{ ex.title }}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Footer -->
    <div class="flex-shrink-0 px-4 py-2 border-t border-gray-200 dark:border-gray-800 text-center">
      <span class="text-[10px] text-gray-400 dark:text-gray-600">30+ Examples &middot; 7 Phases</span>
    </div>
  </div>
</template>
