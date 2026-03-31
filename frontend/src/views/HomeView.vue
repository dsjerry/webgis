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
    phase: 1, icon: `<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>`,
    color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/50',
    title: 'Phase 1: Web Dev Basics', titleCn: 'Web 开发基础',
    desc: 'HTML/CSS/JavaScript fundamentals and JSON data format.',
    descCn: 'HTML/CSS/JavaScript 基础、JSON 数据格式、异步编程与 npm 包管理。'
  },
  {
    phase: 2, icon: `<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
    color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800/50',
    title: 'Phase 2: GIS Fundamentals', titleCn: 'GIS 基础概念',
    desc: 'Coordinate systems, projections, and vector/raster data.',
    descCn: '坐标系与投影、矢量数据、栅格数据、空间参考系统基础。'
  },
  {
    phase: 3, icon: `<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>`,
    color: 'text-violet-500', bg: 'bg-violet-50 dark:bg-violet-950/30 border-violet-200 dark:border-violet-800/50',
    title: 'Phase 3: Frontend Map Dev', titleCn: '前端地图开发',
    desc: 'Leaflet, OpenLayers, and MapLibre GL JS.',
    descCn: 'Leaflet、OpenLayers、MapLibre GL JS 三大前端地图库的完整学习。'
  },
  {
    phase: 4, icon: `<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"/></svg>`,
    color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800/50',
    title: 'Phase 4: Spatial Database', titleCn: '空间数据库',
    desc: 'PostgreSQL + PostGIS: geometry types, spatial indexes, and spatial functions.',
    descCn: 'PostgreSQL + PostGIS：几何类型、空间索引、ST_* 函数族、空间查询优化。'
  },
  {
    phase: 5, icon: `<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"/></svg>`,
    color: 'text-teal-500', bg: 'bg-teal-50 dark:bg-teal-950/30 border-teal-200 dark:border-teal-800/50',
    title: 'Phase 5: Server-side API', titleCn: '服务端 API',
    desc: 'FastAPI, GeoServer WMS/WFS/WPS, and pgRouting.',
    descCn: 'FastAPI 空间数据 API、GeoServer 地图服务发布、pgRouting 路径规划。'
  },
  {
    phase: 6, icon: `<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>`,
    color: 'text-pink-500', bg: 'bg-pink-50 dark:bg-pink-950/30 border-pink-200 dark:border-pink-800/50',
    title: 'Phase 6: Spatial Analysis', titleCn: '空间分析',
    desc: 'Turf.js client-side analysis and server-side WPS processing.',
    descCn: 'Turf.js 客户端空间分析、服务端 WPS 叠加分析、地理编码与搜索。'
  },
  {
    phase: 7, icon: `<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>`,
    color: 'text-cyan-500', bg: 'bg-cyan-50 dark:bg-cyan-950/30 border-cyan-200 dark:border-cyan-800/50',
    title: 'Phase 7: Real-world Projects', titleCn: '实战项目',
    desc: 'Complete projects: city guide, GIS platform, real-time tracking, routing, choropleth maps.',
    descCn: '城市景点导览、GIS 信息平台、实时轨迹追踪、路径规划导航、数据可视化统计地图。'
  },
]
</script>

<template>
  <div class="min-h-full w-full flex flex-col">
    <!-- Hero：不参与与下方区块抢剩余高度，避免「学习路线图」被压成一条 -->
    <div class="relative shrink-0 overflow-hidden bg-linear-to-br from-emerald-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 px-6 py-12 sm:px-12 sm:py-16">
      <!-- Background decoration -->
      <div class="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 rounded-full bg-primary/10 dark:bg-primary/5 blur-3xl" />
      <div class="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-72 h-72 rounded-full bg-secondary/10 dark:bg-secondary/5 blur-3xl" />
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-linear-to-r from-primary/5 to-secondary/5 dark:from-primary/3 dark:to-secondary/3 blur-3xl" />

      <div class="relative max-w-3xl mx-auto text-center">
        <!-- Badge -->
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-linear-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 border border-primary/20 dark:border-primary/30 text-primary dark:text-primary-light text-xs font-semibold mb-6 animate-fade-in">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          30+ Interactive Examples · 7 Learning Phases
        </div>

        <!-- Title -->
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in" style="animation-delay: 0.1s">
          WebGIS <span class="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">从0到1</span> 学习平台
        </h1>
        <p class="text-gray-600 dark:text-gray-400 text-base sm:text-lg mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in" style="animation-delay: 0.2s">
          从 Web 开发基础到完整 GIS 系统开发，通过交互式示例和代码演示，循序渐进掌握 WebGIS 开发技能。涵盖 Leaflet、OpenLayers、MapLibre、PostGIS、FastAPI 等核心技术栈。
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-wrap gap-3 justify-center animate-fade-in" style="animation-delay: 0.3s">
          <button
            class="group px-7 py-3 rounded-xl bg-linear-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-semibold shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 text-sm flex items-center gap-2"
            @click="startLearning"
          >
            <svg class="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
            开始学习
          </button>
          <a
            href="https://leafletjs.com/" target="_blank"
            class="px-6 py-2.5 rounded-xl border-2 border-emerald-200 dark:border-emerald-800 hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 font-medium transition-all duration-200 text-sm flex items-center gap-2"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.654-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/></svg>
            Leaflet
          </a>
          <a
            href="https://openlayers.org/" target="_blank"
            class="px-6 py-2.5 rounded-xl border-2 border-blue-200 dark:border-blue-800 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/50 text-blue-700 dark:text-blue-400 font-medium transition-all duration-200 text-sm flex items-center gap-2"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.4c5.302 0 9.6 4.298 9.6 9.6s-4.298 9.6-9.6 9.6-9.6-4.298-9.6-9.6 4.298-9.6 9.6-9.6z"/></svg>
            OpenLayers
          </a>
        </div>

        <!-- Tech stack badges -->
        <div class="flex flex-wrap gap-2 mt-10 justify-center animate-fade-in" style="animation-delay: 0.4s">
          <span v-for="tech in ['Vue 3', 'TypeScript', 'Tailwind CSS', 'Leaflet', 'OpenLayers', 'MapLibre GL JS', 'PostgreSQL', 'PostGIS', 'FastAPI', 'Turf.js']" :key="tech"
            class="px-3 py-1.5 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 text-xs font-medium text-gray-600 dark:text-gray-400 shadow-sm hover:shadow-md hover:border-primary/30 hover:text-primary transition-all duration-200"
          >{{ tech }}</span>
        </div>
      </div>
    </div>

    <!-- Phase cards：按内容自然增高，整页滚动；勿用 flex-1 否则会吃掉视口剩余高度导致卡片区被压扁 -->
    <div class="shrink-0 px-6 py-10 sm:px-12 max-w-7xl mx-auto w-full">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">学习路线图</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Learning Path</p>
        </div>
        <div class="hidden sm:flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
          7 Phases
        </div>
      </div>

      <!-- Progress line -->
      <div class="relative mb-8">
        <div class="absolute top-1/2 left-0 right-0 h-0.5 bg-linear-to-r from-emerald-500 via-violet-500 to-cyan-500 dark:from-emerald-600 dark:via-violet-600 dark:to-cyan-600 opacity-20" />
        <div class="relative flex justify-between">
          <div v-for="i in 7" :key="i" class="w-3 h-3 rounded-full bg-linear-to-br from-primary to-secondary opacity-30 hover:opacity-60 transition-opacity cursor-pointer" />
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <div
          v-for="(card, index) in phaseCards"
          :key="card.phase"
          :class="['group relative rounded-2xl p-6 border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer card-lift', card.bg]"
          :style="{ animationDelay: `${index * 0.05}s` }"
        >
          <!-- Phase number -->
          <div class="absolute top-4 right-4 w-8 h-8 rounded-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex items-center justify-center text-xs font-bold text-gray-400 dark:text-gray-500 border border-gray-200/50 dark:border-gray-700/50">
            {{ card.phase }}
          </div>

          <!-- Icon -->
          <div :class="['mb-4 transition-transform duration-300 group-hover:scale-110', card.color]" v-html="card.icon" />

          <!-- Content -->
          <h3 class="font-bold text-gray-900 dark:text-white text-base mb-1 group-hover:text-primary transition-colors">{{ card.titleCn }}</h3>
          <h4 class="text-xs text-gray-500 dark:text-gray-400 mb-3">{{ card.title }}</h4>
          <p class="text-xs text-gray-600 dark:text-gray-400 leading-snug line-clamp-2 min-h-[2.75rem]">{{ card.descCn }}</p>

          <!-- Hover arrow -->
          <div class="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
            <svg class="w-5 h-5" :class="card.color" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
