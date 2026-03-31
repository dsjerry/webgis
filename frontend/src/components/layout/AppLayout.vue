<script setup lang="ts">
import { ref, onMounted, watch } from "vue"
import { RouterView, useRoute } from "vue-router"
import Sidebar from "./Sidebar.vue"
import { useExamplesStore } from "@/stores/examples"

const store = useExamplesStore()
const route = useRoute()
const sidebarOpen = ref(false)

onMounted(() => {
    store.initDarkMode()
})

watch(
    () => route.path,
    () => {
        sidebarOpen.value = false
    },
)
</script>

<template>
    <div
        class="flex h-full min-h-0 w-full overflow-hidden bg-white/95 dark:bg-gray-950/95"
    >
        <!-- Mobile overlay -->
        <div
            v-if="sidebarOpen"
            class="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm lg:hidden"
            @click="sidebarOpen = false"
        />

        <!-- Sidebar -->
        <aside
            :class="[
                'fixed lg:static z-30 h-full shrink-0 transition-all duration-300 ease-out',
                'w-[280px] bg-sidebar dark:bg-sidebar-dark border-r border-gray-200/60 dark:border-gray-800/60',
                'flex flex-col min-h-0 overflow-hidden',
                sidebarOpen
                    ? 'translate-x-0'
                    : '-translate-x-full lg:translate-x-0',
            ]"
        >
            <Sidebar @navigate="sidebarOpen = false" />
        </aside>

        <!-- Main content -->
        <main class="flex-1 flex min-h-0 min-w-0 flex-col overflow-hidden">
            <!-- Top bar -->
            <header
                class="shrink-0 h-14 flex items-center gap-3 px-4 border-b border-gray-200/60 dark:border-gray-800/60 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-10"
            >
                <!-- Mobile menu toggle -->
                <button
                    class="lg:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors active:scale-95"
                    @click="sidebarOpen = !sidebarOpen"
                    aria-label="Toggle menu"
                >
                    <svg
                        class="w-5 h-5 text-gray-600 dark:text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>

                <!-- Logo -->
                <div class="flex items-center gap-2.5">
                    <div class="relative">
                        <svg
                            class="w-8 h-8 drop-shadow-md"
                            viewBox="0 0 100 100"
                        >
                            <defs>
                                <linearGradient
                                    id="logo-g"
                                    x1="0%"
                                    y1="0%"
                                    x2="100%"
                                    y2="100%"
                                >
                                    <stop
                                        offset="0%"
                                        style="stop-color: #10b981"
                                    />
                                    <stop
                                        offset="100%"
                                        style="stop-color: #3b82f6"
                                    />
                                </linearGradient>
                                <filter id="logo-shadow">
                                    <feDropShadow
                                        dx="0"
                                        dy="1"
                                        stdDeviation="2"
                                        flood-opacity="0.2"
                                    />
                                </filter>
                            </defs>
                            <circle
                                cx="50"
                                cy="50"
                                r="45"
                                fill="url(#logo-g)"
                                filter="url(#logo-shadow)"
                            />
                            <path
                                d="M30 65 L50 30 L70 65 Z"
                                fill="white"
                                opacity="0.9"
                            />
                            <circle cx="50" cy="52" r="8" fill="#10b981" />
                        </svg>
                    </div>
                    <span
                        class="font-bold text-sm text-gray-900 dark:text-white hidden sm:inline"
                        >WebGIS 从0到1</span
                    >
                </div>

                <div class="flex-1" />

                <!-- Theme toggle -->
                <button
                    class="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all active:scale-95"
                    @click="store.toggleDarkMode()"
                    aria-label="Toggle theme"
                >
                    <!-- Sun icon (shown in dark mode) -->
                    <svg
                        v-if="store.darkMode"
                        class="w-5 h-5 text-amber-400 transition-transform hover:rotate-45"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                            clip-rule="evenodd"
                        />
                    </svg>
                    <!-- Moon icon (shown in light mode) -->
                    <svg
                        v-else
                        class="w-5 h-5 text-gray-600 transition-transform hover:rotate-12"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
                        />
                    </svg>
                </button>
            </header>

            <!-- Page content -->
            <div class="min-h-0 flex-1 overflow-auto scroll-smooth">
                <RouterView />
            </div>
        </main>
    </div>
</template>
