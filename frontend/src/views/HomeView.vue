<script setup lang="ts">
import { useExamplesStore } from '@/stores/examples'
import { useRouter } from 'vue-router'

const store = useExamplesStore()
const router = useRouter()

function startLearning() {
  const firstPhase = store.phases[0]
  if (firstPhase?.modules[0]?.examples[0]) {
    router.push({ name: 'example', params: { id: firstPhase.modules[0].examples[0].id } })
  }
}

const phaseCards = [
  {
    phase: 1, icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>`,
    color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    title: 'Phase 1: Web Dev Basics', titleCn: 'Web 开发基础',
    desc: 'HTML/CSS/JavaScript fundamentals and JSON data format.',
    descCn: 'HTML/CSS/JavaScript 基础、JSON 数据格式、异步编程与 npm 包管理。'
  },
  {
    phase: 2, icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
    color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/30',
    title: 'Phase 2: GIS Fundamentals', titleCn: 'GIS 基础概念',
    desc: 'Coordinate systems, projections, and vector/raster data.',
    descCn: '坐标系与投影、矢量数据、栅格数据、空间参考系统基础。'
  },
  {
    phase: 3, icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>`,
    color: 'text-violet-500', bg: 'bg-violet-50 dark:bg-violet-950/30',
    title: 'Phase 3: Frontend Map Dev', titleCn: '前端地图开发',
    desc: 'Leaflet, OpenLayers, and MapLibre GL JS.',
    descCn: 'Leaflet、OpenLayers、MapLibre GL JS 三大前端地图库的完整学习。'
  },
  {
    phase: 4, icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"/></svg>`,
    color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-950/30',
    title: 'Phase 4: Spatial Database', titleCn: '空间数据库',
    desc: 'PostgreSQL + PostGIS: geometry types, spatial indexes, and spatial functions.',
    descCn: 'PostgreSQL + PostGIS：几何类型、空间索引、ST_* 函数族、空间查询优化。'
  },
  {
    phase: 5, icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"/></svg>`,
    color: 'text-teal-500', bg: 'bg-teal-50 dark:bg-teal-950/30',
    title: 'Phase 5: Server-side API', titleCn: '服务端 API',
    desc: 'FastAPI, GeoServer WMS/WFS/WPS, and pgRouting.',
    descCn: 'FastAPI 空间数据 API、GeoServer 地图服务发布、pgRouting 路径规划。'
  },
  {
    phase: 6, icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>`,
    color: 'text-pink-500', bg: 'bg-pink-50 dark:bg-pink-950/30',
    title: 'Phase 6: Spatial Analysis', titleCn: '空间分析',
    desc: 'Turf.js client-side analysis and server-side WPS processing.',
    descCn: 'Turf.js 客户端空间分析、服务端 WPS 叠加分析、地理编码与搜索。'
  },
  {
    phase: 7, icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>`,
    color: 'text-cyan-500', bg: 'bg-cyan-50 dark:bg-cyan-950/30',
    title: 'Phase 7: Real-world Projects', titleCn: '实战项目',
    desc: 'Complete projects: city guide, GIS platform, real-time tracking, routing, choropleth maps.',
    descCn: '城市景点导览、GIS 信息平台、实时轨迹追踪、路径规划导航、数据可视化统计地图。'
  },
]
</script>

<template>
  <div class="min-h-full flex flex-col">
    <!-- Hero -->
    <div class="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 px-6 py-12 sm:px-12 sm:py-16">
      <!-- Background decoration -->
      <div class="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 rounded-full bg-primary/5 dark:bg-primary/5 blur-3xl" />
      <div class="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-72 h-72 rounded-full bg-secondary/5 dark:bg-secondary/5 blur-3xl" />

      <div class="relative max-w-3xl mx-auto text-center">
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
          <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
          </svg>
          30+ Interactive Examples &middot; 7 Learning Phases
        </div>

        <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          WebGIS <span class="text-primary">从0到1</span> 学习平台
        </h1>
        <p class="text-gray-600 dark:text-gray-400 text-base mb-8 max-w-2xl mx-auto">
          从 Web 开发基础到完整 GIS 系统开发，通过交互式示例和代码演示，循序渐进掌握 WebGIS 开发技能。涵盖 Leaflet、OpenLayers、MapLibre、PostGIS、FastAPI 等核心技术栈。
        </p>

        <div class="flex flex-wrap gap-3 justify-center">
          <button
            class="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-medium shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all text-sm"
            @click="startLearning"
          >
            开始学习 &rarr;
          </button>
          <a
            href="https://leafletjs.com/" target="_blank"
            class="px-6 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary hover:text-primary text-gray-700 dark:text-gray-300 font-medium transition-colors text-sm"
          >
            Leaflet 文档
          </a>
          <a
            href="https://openlayers.org/" target="_blank"
            class="px-6 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-secondary hover:text-secondary text-gray-700 dark:text-gray-300 font-medium transition-colors text-sm"
          >
            OpenLayers 文档
          </a>
        </div>

        <!-- Tech stack badges -->
        <div class="flex flex-wrap gap-2 mt-8 justify-center">
          <span class="px-2.5 py-1 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-600 dark:text-gray-400 shadow-sm">Vue 3.5</span>
          <span class="px-2.5 py-1 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-600 dark:text-gray-400 shadow-sm">Tailwind CSS</span>
          <span class="px-2.5 py-1 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-600 dark:text-gray-400 shadow-sm">Bun</span>
          <span class="px-2.5 py-1 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-600 dark:text-gray-400 shadow-sm">Leaflet</span>
          <span class="px-2.5 py-1 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-600 dark:text-gray-400 shadow-sm">OpenLayers</span>
          <span class="px-2.5 py-1 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-600 dark:text-gray-400 shadow-sm">MapLibre GL JS</span>
          <span class="px-2.5 py-1 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-600 dark:text-gray-400 shadow-sm">PostgreSQL</span>
          <span class="px-2.5 py-1 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-600 dark:text-gray-400 shadow-sm">PostGIS</span>
          <span class="px-2.5 py-1 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-600 dark:text-gray-400 shadow-sm">FastAPI</span>
          <span class="px-2.5 py-1 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-600 dark:text-gray-400 shadow-sm">Turf.js</span>
        </div>
      </div>
    </div>

    <!-- Phase cards -->
    <div class="flex-1 px-6 py-8 sm:px-12 max-w-6xl mx-auto w-full">
      <h2 class="text-lg font-bold text-gray-900 dark:text-white mb-4">学习路线图 / Learning Path</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="card in phaseCards"
          :key="card.phase"
          :class="['rounded-xl p-5 border border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow', card.bg]"
        >
          <div :class="['mb-3', card.color]" v-html="card.icon" />
          <div class="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-0.5">Phase {{ card.phase }}</div>
          <h3 class="font-bold text-gray-900 dark:text-white text-sm mb-1">{{ card.titleCn }}</h3>
          <h4 class="text-xs text-gray-500 dark:text-gray-400 mb-2">{{ card.title }}</h4>
          <p class="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{{ card.descCn }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
