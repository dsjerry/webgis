<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue"
import { useRoute } from "vue-router"
import { useExamplesStore } from "@/stores/examples"
import CodePreview from "@/components/layout/CodePreview.vue"
import LeafletMap from "@/components/map/LeafletMap.vue"
import OpenLayersMap from "@/components/map/OpenLayersMap.vue"
import MapLibreMap from "@/components/map/MapLibreMap.vue"

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
        { label: "Home", to: "/" },
        {
            label: `Phase ${example.value.phase}: ${example.value.phaseTitle}`,
            to: null,
        },
        { label: example.value.module, to: null },
        { label: example.value.title, to: null },
    ]
})

const phaseColors: Record<number, string> = {
    1: "bg-emerald-100/80 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50",
    2: "bg-blue-100/80 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 border border-blue-200 dark:border-blue-800/50",
    3: "bg-violet-100/80 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300 border border-violet-200 dark:border-violet-800/50",
    4: "bg-orange-100/80 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300 border border-orange-200 dark:border-orange-800/50",
    5: "bg-teal-100/80 text-teal-700 dark:bg-teal-900/50 dark:text-teal-300 border border-teal-200 dark:border-teal-800/50",
    6: "bg-pink-100/80 text-pink-700 dark:bg-pink-900/50 dark:text-pink-300 border border-pink-200 dark:border-pink-800/50",
    7: "bg-cyan-100/80 text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800/50",
}

function copyLink() {
    navigator.clipboard.writeText(window.location.href)
}
</script>

<template>
    <div
        v-if="example"
        class="flex flex-col h-full bg-gray-50/50 dark:bg-gray-950/50"
    >
        <!-- Example header -->
        <div
            class="shrink-0 px-4 py-3 border-b border-gray-200/60 dark:border-gray-800/60 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
        >
            <div
                class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2 flex-wrap"
            >
                <template v-for="(crumb, i) in breadcrumb" :key="i">
                    <svg
                        v-if="i > 0"
                        class="w-3 h-3 text-gray-300 dark:text-gray-600"
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
                    <router-link
                        v-if="crumb.to"
                        :to="crumb.to"
                        class="hover:text-primary transition-colors flex items-center gap-1"
                    >
                        <svg
                            v-if="i === 0"
                            class="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                        </svg>
                        {{ crumb.label }}
                    </router-link>
                    <span v-else class="text-gray-600 dark:text-gray-300">{{
                        crumb.label
                    }}</span>
                </template>
            </div>
            <div class="flex items-start justify-between gap-3">
                <div class="flex-1 min-w-0">
                    <h1
                        class="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2"
                    >
                        <span
                            class="w-2 h-2 rounded-full"
                            :class="{
                                'bg-green-500 shadow-lg shadow-green-500/50':
                                    example.mapType === 'leaflet',
                                'bg-blue-500 shadow-lg shadow-blue-500/50':
                                    example.mapType === 'openlayers',
                                'bg-purple-500 shadow-lg shadow-purple-500/50':
                                    example.mapType === 'maplibre',
                            }"
                        />
                        {{ example.title }}
                    </h1>
                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {{ example.description }}
                    </p>
                </div>
                <div class="flex items-center gap-2 shrink-0">
                    <span
                        :class="[
                            'px-2.5 py-1 rounded-lg text-[11px] font-semibold',
                            phaseColors[example.phase] || phaseColors[1],
                        ]"
                    >
                        Phase {{ example.phase }}
                    </span>
                    <button
                        class="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        @click="copyLink"
                        title="Copy link"
                    >
                        <svg
                            class="w-4 h-4 text-gray-400 hover:text-primary transition-colors"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <!-- Tags -->
            <div class="flex flex-wrap gap-1.5 mt-2.5">
                <span
                    v-for="tag in example.tags"
                    :key="tag"
                    class="px-2 py-0.5 rounded-md text-[10px] font-medium bg-gray-100/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-400 border border-gray-200/60 dark:border-gray-700/60 hover:border-primary/50 hover:text-primary transition-colors cursor-default"
                >
                    #{{ tag }}
                </span>
                <span
                    class="px-2 py-0.5 rounded-md text-[10px] font-medium bg-linear-to-r from-primary/10 to-secondary/10 text-primary dark:text-primary-light border border-primary/20 dark:border-primary/30"
                >
                    {{ example.mapType }}
                </span>
            </div>
        </div>

        <!-- Split pane: Map + Code -->
        <div class="flex-1 flex overflow-hidden">
            <!-- Map area -->
            <div
                class="flex-1 overflow-hidden relative"
                :class="showCode ? 'hidden sm:block' : ''"
            >
                <div class="h-full relative">
                    <!-- Map component -->
                    <div
                        class="absolute inset-0 overflow-hidden rounded-none sm:rounded-l-2xl"
                    >
                        <LeafletMap
                            v-if="example.mapType === 'leaflet'"
                            :example="example"
                        />
                        <OpenLayersMap
                            v-else-if="example.mapType === 'openlayers'"
                            :example="example"
                        />
                        <MapLibreMap
                            v-else-if="example.mapType === 'maplibre'"
                            :example="example"
                        />
                        <div
                            v-else
                            class="h-full flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-50 dark:from-gray-900 dark:to-gray-950"
                        >
                            <div class="text-center">
                                <div
                                    class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center"
                                >
                                    <svg
                                        class="w-8 h-8 text-gray-300 dark:text-gray-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="1.5"
                                            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                                        />
                                    </svg>
                                </div>
                                <p
                                    class="text-sm text-gray-500 dark:text-gray-400 font-medium"
                                >
                                    No live map for this example type
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Mobile: code toggle -->
                    <button
                        class="sm:hidden absolute top-3 right-3 z-10 p-2.5 rounded-xl bg-white/90 dark:bg-gray-800/90 shadow-lg backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60 transition-all hover:scale-105 active:scale-95"
                        @click="showCode = !showCode"
                    >
                        <svg
                            class="w-5 h-5 text-gray-600 dark:text-gray-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                            />
                        </svg>
                    </button>

                    <!-- Map controls overlay -->
                    <div
                        class="absolute bottom-4 left-4 flex items-center gap-2"
                    >
                        <div
                            class="px-3 py-1.5 rounded-lg bg-white/90 dark:bg-gray-800/90 shadow-lg backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60 text-xs text-gray-500 dark:text-gray-400"
                        >
                            <span
                                class="inline-block w-2 h-2 rounded-full mr-1.5"
                                :class="{
                                    'bg-green-500':
                                        example.mapType === 'leaflet',
                                    'bg-blue-500':
                                        example.mapType === 'openlayers',
                                    'bg-purple-500':
                                        example.mapType === 'maplibre',
                                }"
                            />
                            {{ example.mapType }}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Code panel -->
            <div
                v-if="showCode"
                class="w-full sm:w-[45%] lg:w-[42%] shrink-0 flex flex-col overflow-hidden bg-white dark:bg-gray-900 border-l border-gray-200/60 dark:border-gray-800/60 sm:rounded-l-2xl shadow-2xl"
            >
                <!-- Code toggle (desktop) -->
                <div
                    class="shrink-0 flex items-center justify-between px-4 py-2.5 border-b border-gray-100 dark:border-gray-800/60 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm"
                >
                    <div class="flex items-center gap-2">
                        <div class="flex gap-1.5">
                            <div class="w-2.5 h-2.5 rounded-full bg-red-400" />
                            <div
                                class="w-2.5 h-2.5 rounded-full bg-yellow-400"
                            />
                            <div
                                class="w-2.5 h-2.5 rounded-full bg-green-400"
                            />
                        </div>
                        <span
                            class="text-xs font-medium text-gray-500 dark:text-gray-400 ml-1"
                        >
                            Code · {{ example.files.length }} file{{
                                example.files.length > 1 ? "s" : ""
                            }}
                        </span>
                    </div>
                    <button
                        class="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                        @click="showCode = false"
                    >
                        <svg
                            class="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                        Close
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
    <div
        v-else
        class="flex items-center justify-center h-full bg-linear-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900"
    >
        <div class="text-center max-w-sm">
            <div
                class="w-24 h-24 mx-auto mb-6 rounded-3xl bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center shadow-xl"
            >
                <svg
                    class="w-12 h-12 text-gray-300 dark:text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            </div>
            <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Example Not Found
            </h2>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">
                The example you're looking for doesn't exist or has been moved.
            </p>
            <router-link
                to="/"
                class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-medium shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all"
            >
                <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                </svg>
                Back to Home
            </router-link>
        </div>
    </div>
</template>
