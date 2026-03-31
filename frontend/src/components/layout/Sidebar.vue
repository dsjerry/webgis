<script setup lang="ts">
import { ref, computed } from "vue"
import { useRouter, useRoute } from "vue-router"
import { useExamplesStore } from "@/stores/examples"

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
    router.push({ name: "example", params: { id } })
    emit("navigate")
}

function isActive(id: string): boolean {
    return route.params.id === id
}
</script>

<template>
    <div class="flex h-full min-h-0 flex-col">
        <!-- Logo area -->
        <div
            class="shrink-0 px-4 py-5 border-b border-gray-100 dark:border-gray-800/50"
        >
            <div class="flex items-center gap-3 mb-4">
                <div class="relative">
                    <svg class="w-9 h-9 drop-shadow-lg" viewBox="0 0 100 100">
                        <defs>
                            <linearGradient
                                id="si-g"
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="100%"
                            >
                                <stop offset="0%" style="stop-color: #10b981" />
                                <stop
                                    offset="100%"
                                    style="stop-color: #3b82f6"
                                />
                            </linearGradient>
                            <filter id="glow">
                                <feGaussianBlur
                                    stdDeviation="2"
                                    result="coloredBlur"
                                />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>
                        <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="url(#si-g)"
                            filter="url(#glow)"
                        />
                        <path
                            d="M30 65 L50 30 L70 65 Z"
                            fill="white"
                            opacity="0.9"
                        />
                        <circle cx="50" cy="52" r="8" fill="#10b981" />
                    </svg>
                    <div
                        class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white dark:border-gray-900 animate-pulse"
                    />
                </div>
                <div>
                    <div
                        class="font-bold text-sm leading-tight text-gray-900 dark:text-white"
                    >
                        WebGIS 从0到1
                    </div>
                    <div
                        class="text-[10px] text-gray-500 dark:text-gray-400 flex items-center gap-1"
                    >
                        <span class="w-1.5 h-1.5 rounded-full bg-green-500" />
                        Learning Platform
                    </div>
                </div>
            </div>

            <!-- Search -->
            <div class="relative group">
                <svg
                    class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
                <input
                    type="text"
                    placeholder="Search examples..."
                    class="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-800/80 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200 placeholder:text-gray-400"
                    :value="store.searchQuery"
                    @input="
                        store.setSearchQuery(
                            ($event.target as HTMLInputElement).value,
                        )
                    "
                />
            </div>
        </div>

        <!-- Phase tree -->
        <nav class="min-h-0 flex-1 overflow-y-auto px-3 py-3 scroll-smooth">
            <div
                v-for="phase in store.filteredPhases"
                :key="phase.id"
                class="mb-1.5"
            >
                <!-- Phase header -->
                <button
                    class="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left hover:bg-gray-100/80 dark:hover:bg-gray-800/50 transition-all duration-150 group"
                    @click="togglePhase(phase.id)"
                >
                    <!-- Phase icon with gradient background -->
                    <span
                        :class="[
                            'shrink-0 w-7 h-7 rounded-lg flex items-center justify-center',
                            phase.bgColor || 'bg-gray-100 dark:bg-gray-800',
                        ]"
                        v-html="phaseIcons[phase.id] || phaseIcons[1]"
                    />
                    <span
                        class="flex-1 text-xs font-semibold text-gray-700 dark:text-gray-200 truncate group-hover:text-gray-900 dark:group-hover:text-white transition-colors"
                        >{{ phase.title }}</span
                    >
                    <!-- Chevron with animation -->
                    <svg
                        class="w-4 h-4 text-gray-400 transition-all duration-200 shrink-0 group-hover:text-gray-600 dark:group-hover:text-gray-300"
                        :class="{ 'rotate-90': expandedPhases.has(phase.id) }"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </button>

                <!-- Modules & Examples -->
                <div
                    v-if="expandedPhases.has(phase.id)"
                    class="ml-3 mt-1 border-l-2 border-gray-100 dark:border-gray-800 pl-3 animate-slide-in-left"
                >
                    <div v-for="mod in phase.modules" :key="mod.name">
                        <!-- Module label -->
                        <div
                            class="px-2 py-2 text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mt-2 flex items-center gap-1.5"
                        >
                            <svg
                                class="w-3 h-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                />
                            </svg>
                            {{ mod.name }}
                        </div>

                        <!-- Example items -->
                        <button
                            v-for="ex in mod.examples"
                            :key="ex.id"
                            class="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-left text-xs transition-all duration-150"
                            :class="
                                isActive(ex.id)
                                    ? 'bg-linear-to-r from-primary/15 to-primary/5 dark:from-primary/20 dark:to-primary/10 text-primary dark:text-primary-light border-l-[3px] border-primary -ml-[3px] pl-2.5 font-medium'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-200'
                            "
                            @click="navigateTo(ex.id)"
                        >
                            <!-- Map type indicator dot with glow -->
                            <span
                                class="w-2 h-2 rounded-full shrink-0 transition-all duration-200"
                                :class="{
                                    'bg-green-500 shadow-lg shadow-green-500/50':
                                        ex.mapType === 'leaflet',
                                    'bg-blue-500 shadow-lg shadow-blue-500/50':
                                        ex.mapType === 'openlayers',
                                    'bg-purple-500 shadow-lg shadow-purple-500/50':
                                        ex.mapType === 'maplibre',
                                    'bg-amber-500 shadow-lg shadow-amber-500/50':
                                        ex.mapType === 'turf',
                                    'bg-teal-500 shadow-lg shadow-teal-500/50':
                                        ex.mapType === 'postgis' ||
                                        ex.mapType === 'nestjs',
                                    'bg-cyan-500 shadow-lg shadow-cyan-500/50':
                                        ex.mapType === 'pgrouting',
                                    'bg-gray-400':
                                        ex.mapType === 'none' ||
                                        ex.mapType === 'docker',
                                }"
                            />
                            <span class="truncate">{{ ex.title }}</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Footer -->
        <div
            class="shrink-0 px-4 py-3 border-t border-gray-100 dark:border-gray-800/50"
        >
            <div class="flex items-center justify-between">
                <span class="text-[10px] text-gray-400 dark:text-gray-600"
                    >30+ Examples · 7 Phases</span
                >
                <a
                    href="https://github.com"
                    target="_blank"
                    class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                    <svg
                        class="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
                        />
                    </svg>
                </a>
            </div>
        </div>
    </div>
</template>
