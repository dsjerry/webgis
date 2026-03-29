import type { Phase } from '@/types/example'

export const examplesData: Phase[] = [
  // ============================================================
  // Phase 1: Web Development Basics
  // ============================================================
  {
    id: 1,
    title: 'Phase 1: Web 开发基础',
    titleEn: 'Web Development Basics',
    icon: 'code',
    color: 'text-emerald-500',
    modules: [
      {
        name: 'HTML/CSS Layout',
        nameEn: 'HTML/CSS Layout',
        examples: [
          {
            id: 'html-css-split-pane',
            phase: 1,
            phaseTitle: 'Web 开发基础',
            module: 'HTML/CSS Layout',
            title: 'CSS Grid 响应式双栏布局',
            titleEn: 'CSS Grid Split-Pane Layout',
            description: '使用 CSS Grid 创建常见的 WebGIS 应用布局：侧边栏 + 主内容区。该布局采用响应式设计，小屏幕时侧边栏可折叠。',
            descriptionEn: 'Build a common WebGIS app layout with CSS Grid: sidebar + main content. Responsive with collapsible sidebar on mobile.',
            tags: ['CSS Grid', 'Layout', 'Responsive', 'Flexbox'],
            mapType: 'none',
            mapCenter: [39.9042, 116.4074],
            mapZoom: 11,
            files: [
              {
                filename: 'AppLayout.vue',
                language: 'vue',
                code: `<script setup lang="ts">
import { ref } from 'vue'
const sidebarOpen = ref(true)
</script>

<template>
  <!-- 外层: 全屏 flex 容器 -->
  <div class="app-root">
    <!-- 侧边栏: 固定宽度 -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <h2>WebGIS 从0到1</h2>
      </div>
      <nav class="sidebar-nav">
        <a href="#">首页</a>
        <a href="#">示例</a>
        <a href="#">文档</a>
      </nav>
    </aside>

    <!-- 主内容区 -->
    <main class="main-content">
      <!-- 工具栏 -->
      <header class="toolbar">
        <button @click="sidebarOpen = !sidebarOpen">切换侧边栏</button>
      </header>

      <!-- 内容区: Grid 双栏 (示例预览 + 代码) -->
      <div class="content-grid">
        <div class="preview-pane">
          <h3>地图预览</h3>
          <div class="map-placeholder">
            交互式地图将在这里渲染
          </div>
        </div>
        <div class="code-pane">
          <h3>源代码</h3>
          <pre><code>// 你的代码</code></pre>
        </div>
      </div>
    </main>
  </div>
</template>`,
              },
              {
                filename: 'layout.css',
                language: 'css',
                code: `/* 1. 全屏容器 */
.app-root {
  display: flex;
  height: 100vh;
  overflow: hidden;
  font-family: system-ui, sans-serif;
}

/* 2. 侧边栏: 固定宽度 280px */
.sidebar {
  width: 280px;
  flex-shrink: 0;
  background: #f8fafc;
  border-right: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  padding: 16px;
  border-bottom: 1px solid #e2e8f0;
}

.sidebar-nav {
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.sidebar-nav a {
  padding: 8px 12px;
  border-radius: 6px;
  color: #374151;
  text-decoration: none;
  font-size: 14px;
}

.sidebar-nav a:hover {
  background: #e2e8f0;
}

/* 3. 主内容区 */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-width: 0; /* 防止内容溢出 */
}

/* 4. 工具栏 */
.toolbar {
  height: 56px;
  padding: 0 16px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  gap: 12px;
}

/* 5. 内容区: 双栏 Grid */
.content-grid {
  flex: 1;
  display: grid;
  grid-template-columns: 60fr 40fr;
  overflow: hidden;
}

.preview-pane,
.code-pane {
  overflow: auto;
  padding: 16px;
}

/* 6. 响应式: 小屏幕合并为单栏 */
@media (max-width: 768px) {
  .content-grid {
    grid-template-columns: 1fr;
  }

  .sidebar {
    position: fixed;
    left: -280px;
    height: 100%;
    z-index: 100;
    transition: left 0.3s ease;
  }

  .sidebar.open {
    left: 0;
  }
}`,
              },
            ],
          },
        ],
      },
      {
        name: 'JavaScript Async',
        nameEn: 'JavaScript Async',
        examples: [
          {
            id: 'js-async-geojson',
            phase: 1,
            phaseTitle: 'Web 开发基础',
            module: 'JavaScript Async',
            title: 'Fetch API 异步加载 GeoJSON',
            titleEn: 'Async GeoJSON Loading with Fetch',
            description: '使用 fetch + async/await 异步加载 GeoJSON 地理数据。学习 Promise、错误处理、JSON 解析等异步编程核心概念。',
            descriptionEn: 'Load GeoJSON data asynchronously using fetch + async/await. Learn Promise, error handling, and JSON parsing.',
            tags: ['fetch', 'async/await', 'JSON', 'Promise'],
            mapType: 'leaflet',
            mapCenter: [39.9042, 116.4074],
            mapZoom: 11,
            files: [
              {
                filename: 'GeoJsonLoader.vue',
                language: 'vue',
                code: `<script setup lang="ts">
import { ref, onMounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const mapContainer = ref<HTMLDivElement>()
const info = ref<{ count: number; names: string[] }>({ count: 0, names: [] })
const loading = ref(false)
const error = ref('')

onMounted(() => {
  const map = L.map(mapContainer.value!).setView([39.9042, 116.4074], 11)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap',
    maxZoom: 19,
  }).addTo(map)

  loadGeoJSON(map)
})

async function loadGeoJSON(map: L.Map) {
  loading.value = true
  error.value = ''

  try {
    // 使用公共 GeoJSON 数据 (北京市行政区边界)
    const url = 'https://raw.githubusercontent.com/xiangyuecn/GeoJSON-Guide-Book/master/%E5%8C%97%E4%BA%AC%E5%B8%82/Beijing.json'

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(\`HTTP \${response.status}: \${response.statusText}\`)
    }

    const geojson = await response.json()

    // 渲染 GeoJSON 图层
    const layer = L.geoJSON(geojson, {
      style: { color: '#3b82f6', weight: 2, fillOpacity: 0.1 },
      onEachFeature: (feature, layer) => {
        const name = feature.properties?.name || feature.properties?.NAME || '未命名'
        layer.bindPopup(\`<b>\${name}</b>\`)
      },
    }).addTo(map)

    // 自动适配边界
    map.fitBounds(layer.getBounds())

    // 更新信息
    const features = geojson.features || []
    info.value = {
      count: features.length,
      names: features.slice(0, 5).map((f: any) => f.properties?.name || '未命名'),
    }

  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error'
    console.error('Failed to load GeoJSON:', err)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="relative h-full">
    <!-- 地图容器 -->
    <div ref="mapContainer" class="w-full h-full" />

    <!-- 信息面板 -->
    <div class="info-panel">
      <h3>GeoJSON 加载结果</h3>
      <p>要素数量: <strong>{{ info.count }}</strong></p>
      <p v-if="error" class="error">错误: {{ error }}</p>
      <p v-if="loading" class="loading">加载中...</p>
    </div>
  </div>
</template>

<style scoped>
.info-panel {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1000;
  background: white;
  padding: 12px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  font-size: 13px;
  max-width: 220px;
}
.error { color: #ef4444; }
.loading { color: #3b82f6; }
</style>`,
              },
            ],
          },
        ],
      },
    ],
  },

  // ============================================================
  // Phase 2: GIS Fundamentals
  // ============================================================
  {
    id: 2,
    title: 'Phase 2: GIS 基础概念',
    titleEn: 'GIS Fundamentals',
    icon: 'globe',
    color: 'text-blue-500',
    modules: [
      {
        name: 'Coordinates & CRS',
        nameEn: 'Coordinates & CRS',
        examples: [
          {
            id: 'gis-coordinates',
            phase: 2,
            phaseTitle: 'GIS 基础概念',
            module: 'Coordinates & CRS',
            title: '经纬度与坐标系',
            titleEn: 'Lat/Lng and Coordinate Reference Systems',
            description: '理解 WGS84 (EPSG:4326) 和 Web Mercator (EPSG:3857) 两种常用坐标系。点击地图查看不同投影下的坐标转换结果。',
            descriptionEn: 'Understand WGS84 and Web Mercator projections. Click the map to see coordinate transformations.',
            tags: ['WGS84', 'EPSG:4326', 'EPSG:3857', 'Web Mercator', 'Projection'],
            mapType: 'leaflet',
            mapCenter: [39.9042, 116.4074],
            mapZoom: 10,
            files: [
              {
                filename: 'CoordinateCrs.vue',
                language: 'vue',
                code: `<script setup lang="ts">
import { ref, onMounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const mapContainer = ref<HTMLDivElement>()
let map: L.Map
let marker: L.Marker

const coordInfo = ref({
  latlng: { lat: 39.9042, lng: 116.4074 },
  projected: { x: 0, y: 0 },
  zoom: 10,
})

onMounted(() => {
  map = L.map(mapContainer.value!).setView([39.9042, 116.4074], 10)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap',
    maxZoom: 19,
  }).addTo(map)

  // 添加可拖动的标记
  marker = L.marker([39.9042, 116.4074], { draggable: true }).addTo(map)
  marker.bindPopup('拖动我查看坐标').openPopup()

  // 地图点击 → 更新坐标
  map.on('click', (e) => {
    updateCoords(e.latlng)
    marker.setLatLng(e.latlng)
  })

  // 标记拖动 → 更新坐标
  marker.on('dragend', () => {
    updateCoords(marker.getLatLng())
  })

  // 缩放变化 → 更新缩放级别
  map.on('zoomend', () => {
    coordInfo.value.zoom = map.getZoom()
  })

  updateCoords(marker.getLatLng())
})

function updateCoords(latlng: L.LatLng) {
  // WGS84 (EPSG:4326): 标准经纬度
  // Web Mercator (EPSG:3857): 用于 Web 地图渲染
  const R = 6378137 // 地球半径
  const lat = latlng.lat * Math.PI / 180
  const lng = latlng.lng * Math.PI / 180

  coordInfo.value = {
    latlng: { lat: latlng.lat, lng: latlng.lng },
    projected: {
      x: Math.round(R * lng),
      y: Math.round(R * Math.log(Math.tan(Math.PI / 4 + lat / 2))),
    },
    zoom: map.getZoom(),
  }
}
</script>

<template>
  <div class="relative h-full">
    <div ref="mapContainer" class="w-full h-full" />

    <!-- 坐标信息面板 -->
    <div class="coord-panel">
      <h4>坐标系参考</h4>
      <table>
        <tr>
          <td>坐标系</td>
          <td>格式</td>
          <td>当前值</td>
        </tr>
        <tr>
          <td><b>WGS84</b><br><span class="sub">EPSG:4326</span></td>
          <td class="sub">(lat, lng)</td>
          <td>{{ coordInfo.latlng.lat.toFixed(6) }},<br>{{ coordInfo.latlng.lng.toFixed(6) }}</td>
        </tr>
        <tr>
          <td><b>Mercator</b><br><span class="sub">EPSG:3857</span></td>
          <td class="sub">(x, y)</td>
          <td>{{ coordInfo.projected.x.toLocaleString() }},<br>{{ coordInfo.projected.y.toLocaleString() }}</td>
        </tr>
        <tr>
          <td><b>缩放级别</b></td>
          <td class="sub">zoom</td>
          <td>{{ coordInfo.zoom }}</td>
        </tr>
      </table>
      <p class="tip">点击地图或拖动标记查看实时坐标</p>
    </div>
  </div>
</template>

<style scoped>
.coord-panel {
  position: absolute;
  bottom: 24px;
  right: 10px;
  z-index: 1000;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(8px);
  padding: 12px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  font-size: 12px;
  min-width: 220px;
}
.coord-panel h4 {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #1f2937;
}
table { width: 100%; border-collapse: collapse; }
td { padding: 4px 0; border-bottom: 1px solid #f3f4f6; }
td:last-child { text-align: right; font-family: monospace; }
.sub { font-size: 10px; color: #9ca3af; }
.tip { font-size: 11px; color: #6b7280; margin-top: 8px; }
</style>`,
              },
            ],
          },
        ],
      },
      {
        name: 'Vector Data',
        nameEn: 'Vector Data',
        examples: [
          {
            id: 'gis-vector-data',
            phase: 2,
            phaseTitle: 'GIS 基础概念',
            module: 'Vector Data',
            title: '矢量数据渲染',
            titleEn: 'Vector Data Rendering',
            description: '学习 GeoJSON 点、线、面三种几何类型的定义与渲染方式。GeoJSON 是 WebGIS 中最重要的矢量数据格式。',
            descriptionEn: 'Learn GeoJSON Point, LineString, and Polygon geometry types. GeoJSON is the most important vector data format in WebGIS.',
            tags: ['GeoJSON', 'Point', 'LineString', 'Polygon', 'Geometry'],
            mapType: 'leaflet',
            mapCenter: [39.9042, 116.4074],
            mapZoom: 12,
            files: [
              {
                filename: 'VectorTypes.vue',
                language: 'vue',
                code: `<script setup lang="ts">
import { ref, onMounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const mapContainer = ref<HTMLDivElement>()
let map: L.Map

onMounted(() => {
  map = L.map(mapContainer.value!).setView([39.9042, 116.4074], 12)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap',
    maxZoom: 19,
  }).addTo(map)

  // GeoJSON 数据: 点、线、面
  const geojsonData = {
    type: 'FeatureCollection',
    features: [
      // --- Point: 故宫 ---
      {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [116.3970, 39.9165] },
        properties: { name: '故宫', type: 'landmark', color: '#ef4444' },
      },
      // --- Point: 天安门广场 ---
      {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [116.3975, 39.9043] },
        properties: { name: '天安门广场', type: 'landmark', color: '#f97316' },
      },
      // --- Point: 鸟巢 ---
      {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [116.4056, 39.9928] },
        properties: { name: '国家体育场', type: 'landmark', color: '#3b82f6' },
      },
      // --- LineString: 二环路 ---
      {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [
            [116.45, 39.85], [116.45, 39.95], [116.35, 39.95],
            [116.35, 39.85], [116.45, 39.85],
          ],
        },
        properties: { name: '环路', type: 'road', color: '#3b82f6', weight: 3 },
      },
      // --- Polygon: 中轴线区域 ---
      {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [116.38, 39.90], [116.42, 39.90],
            [116.42, 39.94], [116.38, 39.94], [116.38, 39.90],
          ]],
        },
        properties: { name: '中轴线区域', type: 'area', color: '#10b981', opacity: 0.3 },
      },
    ],
  }

  // 渲染 GeoJSON
  L.geoJSON(geojsonData as any, {
    pointToLayer: (feature, latlng) => {
      return L.circleMarker(latlng, {
        radius: 8,
        fillColor: feature.properties.color,
        color: '#fff',
        weight: 2,
        fillOpacity: 0.9,
      })
    },
    style: (feature) => {
      const p = feature?.properties
      if (p?.type === 'road') {
        return { color: p.color, weight: p.weight, dashArray: '5,5' }
      }
      return { color: p?.color || '#666', fillOpacity: p?.opacity || 0.2 }
    },
    onEachFeature: (feature, layer) => {
      const p = feature.properties
      layer.bindPopup(\`<b>\${p.name}</b><br>类型: \${p.type}\`)
    },
  }).addTo(map)

  // 标注说明
  L.control.layers({}, {}, { collapsed: false }).addTo(map)
})
</script>

<template>
  <div ref="mapContainer" class="w-full h-full" />
</template>`,
              },
            ],
          },
        ],
      },
    ],
  },

  // ============================================================
  // Phase 3: Frontend Map Development
  // ============================================================
  {
    id: 3,
    title: 'Phase 3: 前端地图开发',
    titleEn: 'Frontend Map Development',
    icon: 'map',
    color: 'text-violet-500',
    modules: [
      {
        name: 'Leaflet Basics',
        nameEn: 'Leaflet Basics',
        examples: [
          {
            id: 'leaflet-basic-map',
            phase: 3,
            phaseTitle: '前端地图开发',
            module: 'Leaflet Basics',
            title: 'Leaflet 基础地图',
            titleEn: 'Leaflet Basic Map',
            description: 'Leaflet 入门示例：加载地图、添加底图图层、设置中心点和缩放级别、添加缩放控件和比例尺。',
            descriptionEn: 'Leaflet getting started: load map, add tile layer, set center/zoom, add zoom control and scale.',
            tags: ['Leaflet', 'tileLayer', 'Map', 'Control'],
            mapType: 'leaflet',
            mapCenter: [31.2304, 121.4737],
            mapZoom: 12,
            files: [
              {
                filename: 'BasicMap.vue',
                language: 'vue',
                code: `<script setup lang="ts">
import { ref, onMounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const mapContainer = ref<HTMLDivElement>()

onMounted(() => {
  // 1. 创建地图实例，指定中心点和缩放级别
  const map = L.map(mapContainer.value!, {
    center: [31.2304, 121.4737], // 上海
    zoom: 12,
    zoomControl: false,           // 默认缩放控件
  })

  // 2. 添加 OSM 底图
  const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19,
  })
  osm.addTo(map)

  // 3. 添加高德地图底图 (备选)
  const gaode = L.tileLayer(
    'https://webst0{s}.is.autonavi.com/appmapx/css?v=1.4.11&x={x}&y={y}&z={z}',
    { subdomains: '1234', attribution: '&copy; 高德地图' }
  )

  // 4. 添加标注点
  const marker = L.marker([31.2304, 121.4737], {
    title: '上海市中心',
    alt: 'Shanghai',
  }).addTo(map)

  marker.bindPopup(\`
    <b>上海市中心</b><br>
    经度: 121.4737<br>
    纬度: 31.2304
  \`).openPopup()

  // 5. 添加工具
  L.control.zoom({ position: 'topright' }).addTo(map)
  L.control.scale({ position: 'bottomleft', imperial: false }).addTo(map)

  // 6. 图层切换
  L.control.layers(
    { 'OSM': osm, '高德': gaode },
    {},
    { position: 'topright', collapsed: false }
  ).addTo(map)

  // 7. 鼠标位置控件
  L.control.mousePosition().addTo(map)
})
</script>

<template>
  <div ref="mapContainer" class="w-full h-full" />
</template>

<style>
/* Leaflet 默认字体调整 */
.leaflet-container { font-family: inherit; }
</style>`,
              },
              {
                filename: 'package.json',
                language: 'json',
                code: `{
  "dependencies": {
    "leaflet": "^1.9.4"
  },
  "devDependencies": {
    "@types/leaflet": "^1.9.17"
  }
}`,
              },
            ],
          },
          {
            id: 'leaflet-markers-popups',
            phase: 3,
            phaseTitle: '前端地图开发',
            module: 'Leaflet Basics',
            title: '标记、弹窗与交互',
            titleEn: 'Markers, Popups and Interaction',
            description: 'Leaflet 的标记（Marker）、弹窗（Popup）和交互事件。学习自定义图标、多个标注点绑定不同信息。',
            descriptionEn: 'Leaflet Markers, Popups, and interaction events. Learn custom icons and multiple annotations.',
            tags: ['Leaflet', 'Marker', 'Popup', 'Icon', 'Event'],
            mapType: 'leaflet',
            mapCenter: [31.2304, 121.4737],
            mapZoom: 13,
            files: [
              {
                filename: 'MarkersPopup.vue',
                language: 'vue',
                code: `<script setup lang="ts">
import { ref, onMounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const mapContainer = ref<HTMLDivElement>()
const activeCount = ref(0)

interface Place {
  name: string
  coords: [number, number]
  desc: string
  category: 'food' | 'park' | 'landmark'
}

const places: Place[] = [
  { name: '外滩', coords: [31.2437, 121.4905], desc: '上海最著名的滨江景点', category: 'landmark' },
  { name: '豫园', coords: [31.2277, 121.4895], desc: '明代古典园林', category: 'park' },
  { name: '上海中心大厦', coords: [31.2354, 121.5011], desc: '632米，上海最高楼', category: 'landmark' },
  { name: '田子坊', coords: [31.2194, 121.4735], desc: '石库门建筑艺术街区', category: 'food' },
  { name: '新天地', coords: [31.2245, 121.4715], desc: '石库门改造的时尚地标', category: 'food' },
  { name: '世纪公园', coords: [31.2153, 121.5532], desc: '上海市区最大的公园', category: 'park' },
]

const categoryColors: Record<string, string> = {
  landmark: '#ef4444',
  park: '#10b981',
  food: '#f59e0b',
}

onMounted(() => {
  const map = L.map(mapContainer.value!).setView([31.2304, 121.4737], 13)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(map)

  // 为每个地点添加标注
  places.forEach((place) => {
    // 自定义图标
    const icon = L.divIcon({
      html: \`
        <div style="
          width: 24px; height: 24px;
          background: \${categoryColors[place.category]};
          border: 3px solid white;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        "></div>
      \`,
      className: 'custom-marker',
      iconSize: [24, 24],
      iconAnchor: [12, 24],
      popupAnchor: [0, -24],
    })

    const marker = L.marker(place.coords, { icon }).addTo(map)

    marker.bindPopup(\`
      <div style="min-width: 160px">
        <h3 style="margin:0 0 4px;font-size:14px;font-weight:600">
          \${place.name}
        </h3>
        <span style="
          display:inline-block;padding:2px 6px;
          border-radius:4px;font-size:11px;
          background:\${categoryColors[place.category]}22;
          color:\${categoryColors[place.category]};
        ">\${place.category}</span>
        <p style="margin:6px 0 0;font-size:12px;color:#666">
          \${place.desc}
        </p>
      </div>
    \`)

    // 点击计数
    marker.on('click', () => {
      activeCount.value++
    })
  })
})
</script>

<template>
  <div class="relative h-full">
    <div ref="mapContainer" class="w-full h-full" />

    <div class="legend-panel">
      <h4>图例 Legend</h4>
      <div v-for="(color, cat) in categoryColors" :key="cat" class="legend-item">
        <span class="dot" :style="{ background: color }" />
        <span>{{ cat }}</span>
      </div>
      <p class="click-count">点击标记: {{ activeCount }}</p>
    </div>
  </div>
</template>

<style scoped>
.legend-panel {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1000;
  background: rgba(255,255,255,0.95);
  padding: 12px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
  font-size: 12px;
  min-width: 120px;
}
.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 4px 0;
}
.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
.click-count {
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid #e5e7eb;
  color: #6b7280;
}
</style>`,
              },
            ],
          },
          {
            id: 'leaflet-geojson-layer',
            phase: 3,
            phaseTitle: '前端地图开发',
            module: 'Leaflet Basics',
            title: 'GeoJSON 数据加载与渲染',
            titleEn: 'GeoJSON Layer Loading and Rendering',
            description: '使用 L.geoJSON() 方法加载外部 GeoJSON 文件，根据属性值设置不同样式。GeoJSON 是 WebGIS 数据交换的事实标准。',
            descriptionEn: 'Load external GeoJSON with L.geoJSON(). Style features by property values. GeoJSON is the de facto standard for web GIS data exchange.',
            tags: ['Leaflet', 'GeoJSON', 'Style', 'L.geoJSON'],
            mapType: 'leaflet',
            mapCenter: [35.6762, 139.6503],
            mapZoom: 10,
            files: [
              {
                filename: 'GeoJsonLayer.vue',
                language: 'vue',
                code: `<script setup lang="ts">
import { ref, onMounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const mapContainer = ref<HTMLDivElement>()

onMounted(async () => {
  const map = L.map(mapContainer.value!).setView([35.6762, 139.6503], 10)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(map)

  // GeoJSON 数据: 日本各行政区
  const japanGeoJson = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [[[139.6, 35.5], [139.9, 35.5], [139.9, 35.8], [139.6, 35.8], [139.6, 35.5]]],
        },
        properties: { name: '东京都', pop: 13960000, color: '#ef4444' },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [[[139.0, 35.4], [139.4, 35.4], [139.4, 35.8], [139.0, 35.8], [139.0, 35.4]]],
        },
        properties: { name: '神奈川县', pop: 9230000, color: '#3b82f6' },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [[[139.5, 34.9], [139.9, 34.9], [139.9, 35.3], [139.5, 35.3], [139.5, 34.9]]],
        },
        properties: { name: '千叶县', pop: 6280000, color: '#10b981' },
      },
    ],
  }

  // L.geoJSON 核心配置
  L.geoJSON(japanGeoJson as any, {
    // 根据属性值动态设置样式
    style: (feature) => ({
      color: feature?.properties?.color || '#666',
      weight: 2,
      fillOpacity: 0.5,
    }),

    // 每个要素绑定事件和弹窗
    onEachFeature: (feature, layer) => {
      const p = feature.properties
      layer.bindPopup(\`
        <b>\${p.name}</b><br>
        人口: \${p.pop?.toLocaleString()}<br>
        人口等级: \${getPopLevel(p.pop)}
      \`)

      // 鼠标悬停高亮
      layer.on({
        mouseover: (e) => {
          const l = e.target
          l.setStyle({ weight: 4, fillOpacity: 0.8 })
          l.bringToFront()
        },
        mouseout: (e) => {
          geoJsonLayer.resetStyle(e.target)
        },
      })
    },

    // Point 类型用 CircleMarker 渲染
    pointToLayer: (feature, latlng) => {
      return L.circleMarker(latlng, {
        radius: 8,
        fillColor: feature.properties.color,
        color: '#fff',
        weight: 2,
      })
    },
  }).addTo(map)

  // 保存引用用于 resetStyle
  const geoJsonLayer = L.geoJSON(japanGeoJson as any)
})

function getPopLevel(pop?: number): string {
  if (!pop) return '未知'
  if (pop > 10000000) return '超大'
  if (pop > 5000000) return '大'
  if (pop > 2000000) return '中'
  return '小'
}
</script>

<template>
  <div ref="mapContainer" class="w-full h-full" />
</template>`,
              },
            ],
          },
        ],
      },
      {
        name: 'OpenLayers',
        nameEn: 'OpenLayers',
        examples: [
          {
            id: 'ol-wms-layer',
            phase: 3,
            phaseTitle: '前端地图开发',
            module: 'OpenLayers',
            title: 'OpenLayers WMS 服务加载',
            titleEn: 'OpenLayers WMS Layer Loading',
            description: '使用 OpenLayers 加载 WMS (Web Map Service) 图层。WMS 是 OGC 标准地图服务协议，可动态渲染服务端地图。',
            descriptionEn: 'Load WMS (Web Map Service) layers with OpenLayers. WMS is an OGC standard for dynamically rendered map services.',
            tags: ['OpenLayers', 'WMS', 'OGC', 'TileLayer'],
            mapType: 'openlayers',
            mapCenter: [116.4, 39.9],
            mapZoom: 6,
            files: [
              {
                filename: 'WmsLayer.vue',
                language: 'vue',
                code: `<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import ImageWMS from 'ol/source/ImageWMS'
import { fromLonLat } from 'ol/proj'
import 'ol/ol.css'

const mapContainer = ref<HTMLDivElement>()
let map: Map

onMounted(() => {
  // 底图: OSM
  const osmLayer = new TileLayer({
    source: new OSM(),
  })

  // WMS 图层: 国土地理院 (日本)
  const wmsLayer = new TileLayer({
    source: new ImageWMS({
      url: 'https://maps.gsi.go.jp/xyz/std/{z}/{x}/{y}.png',
      params: { LAYERS: 'std', FORMAT: 'image/png' },
      crossOrigin: 'anonymous',
    }),
    opacity: 0.8,
    visible: true,
  })

  // 第二个 WMS 图层 (示例)
  const wmsLayer2 = new TileLayer({
    source: new ImageWMS({
      url: 'https://www.wms.nrw.de/umwelt/umweltkarte',
      params: { LAYERS: 'biotope_types' },
      crossOrigin: 'anonymous',
    }),
    visible: false,
  })

  map = new Map({
    target: mapContainer.value!,
    layers: [osmLayer, wmsLayer],
    view: new View({
      center: fromLonLat([139.69, 35.69]),
      zoom: 6,
    }),
  })

  // 图层切换 (手动)
  const toggleWms = () => {
    wmsLayer.setVisible(!wmsLayer.getVisible())
  }

  // 点击获取 WMS 信息 (GetFeatureInfo)
  map.on('click', (evt) => {
    const view = map.getView()
    const viewResolution = view.getResolution()
    const viewProjection = view.getProjection()

    const wmsSource = wmsLayer.getSource() as ImageWMS
    if (!wmsSource) return

    const url = wmsSource.getFeatureInfoUrl(
      evt.coordinate, viewResolution, viewProjection,
      { INFO_FORMAT: 'application/json', FEATURE_COUNT: 5 }
    )

    if (url) {
      console.log('WMS FeatureInfo URL:', url)
      // fetch(url).then(res => res.json()).then(data => console.log(data))
    }
  })

  // 添加图层控件
  const layerSwitcher = document.createElement('div')
  layerSwitcher.innerHTML = \`
    <button onclick="this.parentElement.dispatchEvent(new CustomEvent('toggle'))">
      Toggle WMS Layer
    </button>
  \`
  layerSwitcher.style.cssText = 'position:absolute;top:10px;right:10px;z-index:1000'

  const btn = document.createElement('button')
  btn.textContent = 'Toggle WMS'
  btn.style.cssText = 'padding:8px 16px;background:white;border-radius:6px;box-shadow:0 2px 8px rgba(0,0,0,0.15);cursor:pointer;font-size:13px'
  btn.onclick = toggleWms
  document.querySelector('.ol-overlaycontainer')?.appendChild(btn)
})
</script>

<template>
  <div ref="mapContainer" class="w-full h-full" />
</template>`,
              },
            ],
          },
        ],
      },
      {
        name: 'MapLibre GL JS',
        nameEn: 'MapLibre GL JS',
        examples: [
          {
            id: 'maplibre-vector-tiles',
            phase: 3,
            phaseTitle: '前端地图开发',
            module: 'MapLibre GL JS',
            title: 'MapLibre 矢量瓦片加载',
            titleEn: 'MapLibre Vector Tile Loading',
            description: 'MapLibre GL JS 是开源的高性能矢量瓦片地图库。使用自定义样式 JSON 加载矢量瓦片底图，支持 GPU 加速渲染。',
            descriptionEn: 'MapLibre GL JS is an open-source, GPU-accelerated vector tile map library. Load vector tiles with custom style JSON.',
            tags: ['MapLibre', 'Vector Tile', 'Style', 'GPU'],
            mapType: 'maplibre',
            mapCenter: [139.6917, 35.6895],
            mapZoom: 12,
            files: [
              {
                filename: 'VectorTiles.vue',
                language: 'vue',
                code: `<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

const mapContainer = ref<HTMLDivElement>()
let map: maplibregl.Map

onMounted(() => {
  map = new maplibregl.Map({
    container: mapContainer.value!,
    // MapLibre 样式规范 (Style Specification)
    style: {
      version: 8,
      name: 'Custom Vector Style',
      sources: {
        // 矢量瓦片源
        'osm-vector': {
          type: 'vector',
          // 使用 OpenMapTiles 公开矢量瓦片
          tiles: [
            'https://api.maptiler.com/tiles/v3/{z}/{x}/{y}.pbf?key=get_your_key',
          ],
          minzoom: 0,
          maxzoom: 14,
        },
        // 光栅底图源
        'osm-raster': {
          type: 'raster',
          tiles: [
            'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
          ],
          tileSize: 256,
          attribution: '&copy; OpenStreetMap',
        },
      },
      layers: [
        // 光栅底图层
        {
          id: 'raster-base',
          type: 'raster',
          source: 'osm-raster',
          minzoom: 0,
          maxzoom: 18,
        },
        // 矢量道路层 (来自矢量瓦片)
        {
          id: 'roads',
          type: 'line',
          source: 'osm-vector',
          'source-layer': 'transportation', // 矢量瓦片中的图层名
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#4a90d9',
            'line-width': 2,
            'line-opacity': 0.7,
          },
        },
      ],
    },
    center: [139.6917, 35.6895],
    zoom: 12,
  })

  // 添加导航控件
  map.addControl(new maplibregl.NavigationControl(), 'top-right')
  map.addControl(new maplibregl.ScaleControl({ maxWidth: 200 }), 'bottom-left')
  map.addControl(new maplibregl.FullscreenControl())

  // 点击获取要素信息
  map.on('click', (e) => {
    const features = map.queryRenderedFeatures(e.point, {
      layers: ['roads'],
    })
    if (features.length > 0) {
      console.log('Feature:', features[0].properties)
    }
  })
})

onUnmounted(() => {
  map?.remove()
})
</script>

<template>
  <div ref="mapContainer" class="w-full h-full" />
</template>`,
              },
              {
                filename: 'style.json',
                language: 'json',
                code: `{
  "version": 8,
  "name": "My Custom Map Style",
  "sources": {
    "osm": {
      "type": "raster",
      "tiles": [
        "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
        "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
        "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ],
      "tileSize": 256,
      "attribution": "&copy; OpenStreetMap contributors"
    }
  },
  "layers": [
    {
      "id": "background",
      "type": "background",
      "paint": { "background-color": "#f8f4f0" }
    },
    {
      "id": "osm",
      "type": "raster",
      "source": "osm",
      "minzoom": 0,
      "maxzoom": 18
    }
  ]
}`,
              },
            ],
          },
        ],
      },
    ],
  },

  // ============================================================
  // Phase 4: Spatial Database
  // ============================================================
  {
    id: 4,
    title: 'Phase 4: 空间数据库',
    titleEn: 'Spatial Database',
    icon: 'database',
    color: 'text-orange-500',
    modules: [
      {
        name: 'PostGIS',
        nameEn: 'PostGIS',
        examples: [
          {
            id: 'postgis-buffer',
            phase: 4,
            phaseTitle: '空间数据库',
            module: 'PostGIS',
            title: 'ST_Buffer 缓冲区分析',
            titleEn: 'ST_Buffer Buffer Analysis',
            description: 'PostGIS ST_Buffer() 函数：在指定几何体周围创建指定距离的缓冲区。多用于设施服务范围分析，如"周边1公里内有哪些医院"。',
            descriptionEn: 'PostGIS ST_Buffer(): Create a buffer zone around a geometry. Used for service area analysis, e.g., "hospitals within 1km".',
            tags: ['PostGIS', 'ST_Buffer', 'Spatial Analysis', 'Buffer Zone'],
            mapType: 'postgis',
            mapCenter: [116.4074, 39.9042],
            mapZoom: 12,
            files: [
              {
                filename: 'buffer_analysis.py',
                language: 'python',
                code: `# PostGIS 缓冲区分析示例
# 使用 psycopg2 连接 PostgreSQL 数据库

import psycopg2
from psycopg2 import sql

conn = psycopg2.connect(
    host='localhost',
    port=5432,
    database='webgis',
    user='postgres',
    password='your_password'
)
cur = conn.cursor()

# ============================================
# 1. 基础 Buffer: 以故宫为中心 2公里缓冲区
# ============================================
query = """
SELECT ST_AsGeoJSON(
    ST_Buffer(
        ST_GeomFromText('POINT(116.3970 39.9165)', 4326)::geography,
        2000  -- 2公里 (米)
    )::geometry,
    6
) AS buffer_geojson;
"""
cur.execute(query)
result = cur.fetchone()
print("2km Buffer GeoJSON:", result[0])
# 输出: {"type":"Polygon","coordinates":[[[116.416,...]]}

# ============================================
# 2. 带 SRID 转换的 Buffer
# ============================================
query2 = """
SELECT ST_AsGeoJSON(
    ST_Buffer(
        ST_Transform(
            ST_GeomFromText('POINT(116.3970 39.9165)', 4326),
            3857  -- Web Mercator 投影
        ),
        2000
    )
) AS buffer_3857;
"""
cur.execute(query2)

# ============================================
# 3. 单边缓冲区 (用于道路拓宽等)
# ============================================
query3 = """
SELECT ST_AsGeoJSON(
    ST_Buffer(
        ST_GeomFromText('LINESTRING(116.38 39.90, 116.42 39.90)', 4326),
        0.005,  -- 约500米
        'quad_segs=2 join=round'
    )
) AS line_buffer;
"""
cur.execute(query3)

# ============================================
# 4. 设施服务范围分析: 故宫周边3公里内有哪些医院
# ============================================
query4 = """
WITH buffer AS (
    SELECT ST_Buffer(
        ST_GeomFromText('POINT(116.3970 39.9165)', 4326)::geography,
        3000  -- 3公里
    )::geometry AS geom
)
SELECT
    h.name,
    h.address,
    ST_Distance(
        h.geom::geography,
        ST_GeomFromText('POINT(116.3970 39.9165)', 4326)::geography
    ) AS distance_m
FROM hospitals h, buffer b
WHERE ST_Intersects(h.geom, b.geom)
ORDER BY distance_m;
"""
cur.execute(query4)
hospitals = cur.fetchall()

for name, address, dist in hospitals:
    print(f"{name}: {address}, 距离 {dist:.0f}米")

conn.close()`,
              },
            ],
          },
          {
            id: 'postgis-spatial-query',
            phase: 4,
            phaseTitle: '空间数据库',
            module: 'PostGIS',
            title: 'ST_Intersects 空间查询',
            titleEn: 'ST_Intersects Spatial Query',
            description: '使用 ST_Intersects、ST_Contains、ST_DWithin 等空间谓词执行高效空间查询。这些是 GIS 空间分析的核心函数。',
            descriptionEn: 'Execute efficient spatial queries with ST_Intersects, ST_Contains, and ST_DWithin. Core functions for GIS spatial analysis.',
            tags: ['PostGIS', 'ST_Intersects', 'ST_Contains', 'ST_DWithin', 'Spatial Query'],
            mapType: 'postgis',
            mapCenter: [116.4074, 39.9042],
            mapZoom: 10,
            files: [
              {
                filename: 'spatial_query.py',
                language: 'python',
                code: `# PostGIS 空间查询示例
import psycopg2

conn = psycopg2.connect(host='localhost', port=5432, database='webgis', user='postgres')
cur = conn.cursor()

# ============================================
# 1. ST_Intersects: 两多边形是否相交
# ============================================
query_intersects = """
-- 查找与指定区域相交的所有地块
SELECT parcel_id, address, ST_AsGeoJSON(geom) AS geojson
FROM parcels
WHERE ST_Intersects(
    geom,
    ST_GeomFromText('POLYGON((116.38 39.88, 116.42 39.88, 116.42 39.94, 116.38 39.94, 116.38 39.88))', 4326)
);
"""

# ============================================
# 2. ST_Contains: 点是否在多边形内 (包含关系)
# ============================================
query_contains = """
-- 查找北京市二环内所有学校
SELECT s.name, s.type, ST_AsGeoJSON(s.geom) AS geojson
FROM schools s, beijing_districts d
WHERE d.name = '二环内'
  AND ST_Contains(d.geom, s.geom);
"""

# ============================================
# 3. ST_DWithin: 在某距离范围内的要素
# ============================================
query_dwithin = """
-- 查找地铁站"前门站"周边500米内所有POI
SELECT
    p.name,
    p.category,
    ST_Distance(p.geom::geography, s.geom::geography) AS distance_m
FROM pois p, subways s
WHERE s.name = '前门'
  AND ST_DWithin(p.geom::geography, s.geom::geography, 500)
ORDER BY distance_m;
"""

# ============================================
# 4. 最近邻查询 (使用空间索引)
# ============================================
query_nearest = """
-- 查找距离某位置最近的5个餐厅
WITH target AS (
    SELECT ST_GeomFromText('POINT(116.4074 39.9042)', 4326)::geography AS geom
)
SELECT
    r.name,
    r.address,
    ST_Distance(r.geom, t.geom) AS dist_m
FROM restaurants r, target t
ORDER BY r.geom <-> t.geom  -- KNN 距离排序操作符
LIMIT 5;
-- <-> 是 PostgreSQL 的最近邻操作符，配合 GiST 索引效率极高
"""

# ============================================
# 5. 创建空间索引 (关键!)
# ============================================
create_index = """
-- GiST 索引：空间数据必备
CREATE INDEX IF NOT EXISTS parcels_geom_idx ON parcels USING GIST (geom);
CREATE INDEX IF NOT EXISTS schools_geom_idx ON schools USING GIST (geom);
CREATE INDEX IF NOT EXISTS restaurants_geom_idx ON restaurants USING GIST (geom);

-- 空间索引会显著提升空间查询性能
-- 查看查询计划验证是否使用了索引:
EXPLAIN ANALYZE SELECT * FROM parcels
WHERE ST_Intersects(geom, ST_GeomFromText('POINT(116.4 39.9)', 4326));
"""

print("PostGIS 空间查询示例 - 请在 PostgreSQL 中执行")
conn.close()`,
              },
            ],
          },
        ],
      },
    ],
  },

  // ============================================================
  // Phase 5: Server-side API
  // ============================================================
  {
    id: 5,
    title: 'Phase 5: 服务端 API',
    titleEn: 'Server-side API',
    icon: 'server',
    color: 'text-teal-500',
    modules: [
      {
        name: 'NestJS Spatial API',
        nameEn: 'NestJS Spatial API',
        examples: [
          {
            id: 'nestjs-spatial-crud',
            phase: 5,
            phaseTitle: '服务端 API',
            module: 'NestJS Spatial API',
            title: 'NestJS 空间数据 CRUD API',
            titleEn: 'NestJS Spatial Data CRUD API',
            description: '使用 NestJS 构建完整的空间数据 RESTful API。使用 class-validator DTO 进行 GeoJSON 数据验证，TypeORM 操作 PostGIS。',
            descriptionEn: 'Build a complete spatial data RESTful API with NestJS. Use class-validator for GeoJSON validation, TypeORM for PostGIS operations.',
            tags: ['NestJS', 'REST API', 'GeoJSON', 'class-validator', 'TypeORM'],
            mapType: 'nestjs',
            mapCenter: [116.4074, 39.9042],
            mapZoom: 10,
            backendEndpoint: '/api/v1/features',
            files: [
              {
                filename: 'main.ts',
                language: 'ts',
                code: `import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // CORS
  app.enableCors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
  })

  // Global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )

  // Swagger docs
  const config = new DocumentBuilder()
    .setTitle('WebGIS Spatial API')
    .setDescription('Spatial data CRUD + analysis API')
    .setVersion('1.0.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)

  await app.listen(8000)
  console.log(\`🚀 WebGIS API running on http://localhost:8000\`)
}
bootstrap()`,
              },
              {
                filename: 'app.module.ts',
                language: 'ts',
                code: `import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FeaturesModule } from './features/features.module'
import { AnalysisModule } from './analysis/analysis.module'
import { Feature } from './entities/feature.entity'
import { Parcel } from './entities/parcel.entity'
import { Road } from './entities/road.entity'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'your_secure_password',
      database: process.env.DB_NAME || 'webgis',
      entities: [Feature, Parcel, Road],
      synchronize: false, // 生产环境设为 false
      logging: false,
    }),
    FeaturesModule,
    AnalysisModule,
  ],
})
export class AppModule {}`,
              },
              {
                filename: 'features.dto.ts',
                language: 'ts',
                code: `import { IsString, IsOptional, IsObject, MinLength, MaxLength } from 'class-validator'

export class CreateFeatureDto {
  @IsString()
  @MinLength(1) @MaxLength(200)
  name: string

  @IsOptional() @IsString()
  category?: string

  @IsObject()
  geometry: { type: string; coordinates: number[] }

  @IsOptional() @IsObject()
  properties?: Record<string, any>
}

export class UpdateFeatureDto {
  @IsOptional() @IsString()
  name?: string

  @IsOptional() @IsString()
  category?: string

  @IsOptional() @IsObject()
  geometry?: { type: string; coordinates: number[] }

  @IsOptional() @IsObject()
  properties?: Record<string, any>
}`,
              },
              {
                filename: 'features.controller.ts',
                language: 'ts',
                code: `import {
  Controller, Get, Post, Put, Delete,
  Body, Param, Query, ParseIntPipe,
} from '@nestjs/common'
import { FeaturesService } from './features.service'
import { CreateFeatureDto, UpdateFeatureDto } from './features.dto'

@Controller('api/v1/features')
export class FeaturesController {
  constructor(private readonly service: FeaturesService) {}

  @Get()
  findAll(
    @Query('category') category?: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    return this.service.findAll(
      category,
      limit ? parseInt(limit) : 100,
      offset ? parseInt(offset) : 0,
    )
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id)
  }

  @Post()
  create(@Body() dto: CreateFeatureDto) {
    return this.service.create(dto)
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateFeatureDto) {
    return this.service.update(id, dto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id)
  }
}`,
              },
            ],
          },
        ],
      },
      {
        name: 'pgRouting',
        nameEn: 'pgRouting',
        examples: [
          {
            id: 'pgrouting-shortest-path',
            phase: 5,
            phaseTitle: '服务端 API',
            module: 'pgRouting',
            title: 'pgRouting 最短路径',
            titleEn: 'pgRouting Shortest Path',
            description: '使用 pgRouting 在道路网络中计算最短路径。Dijkstra 算法是 pgRouting 的核心，用于路径规划和导航应用。',
            descriptionEn: 'Calculate shortest paths in road networks using pgRouting. Dijkstra algorithm for routing and navigation apps.',
            tags: ['pgRouting', 'Dijkstra', 'Shortest Path', 'Network Analysis', 'Routing'],
            mapType: 'pgrouting',
            mapCenter: [116.4074, 39.9042],
            mapZoom: 12,
            files: [
              {
                filename: 'shortest_path.sql',
                language: 'sql',
                code: `-- ============================================================
-- pgRouting 最短路径查询
-- ============================================================

-- Step 1: 确保安装了 pgRouting 扩展
CREATE EXTENSION IF NOT EXISTS pgrouting;

-- Step 2: 准备道路网络数据
-- 通常从 OSM 数据导入 (使用 osm2pgrouting 工具)
-- 这里手动创建一个简单示例网络
CREATE TABLE roads (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    source INT,
    target INT,
    cost FLOAT,
    reverse_cost FLOAT,
    geom GEOMETRY(LineString, 4326)
);

INSERT INTO roads (name, source, target, cost, reverse_cost, geom) VALUES
('道路A', 1, 2, 0.01, 0.01,
 ST_GeomFromText('LINESTRING(116.38 39.90, 116.40 39.90)', 4326)),
('道路B', 2, 3, 0.015, 0.015,
 ST_GeomFromText('LINESTRING(116.40 39.90, 116.42 39.90)', 4326)),
('道路C', 2, 4, 0.01, 0.01,
 ST_GeomFromText('LINESTRING(116.40 39.90, 116.40 39.92)', 4326)),
('道路D', 4, 5, 0.01, 0.01,
 ST_GeomFromText('LINESTRING(116.40 39.92, 116.40 39.94)', 4326)),
('道路E', 3, 5, 0.01, 0.01,
 ST_GeomFromText('LINESTRING(116.42 39.90, 116.42 39.94)', 4326));

-- Step 3: 创建拓扑 (为边生成 source/target 节点)
SELECT pgr_createTopology('roads', 0.0001, 'geom', 'id');

-- Step 4: Dijkstra 最短路径查询
SELECT
    r.id,
    r.name,
    ST_AsGeoJSON(r.geom) AS geom,
    r.cost
FROM pgr_dijkstra(
    'SELECT id, source, target, cost, reverse_cost FROM roads',
    1,     -- 起点节点 ID
    5,     -- 终点节点 ID
    directed := false  -- 无向图
) AS route
JOIN roads r ON route.edge = r.id
ORDER BY route.path_seq;

-- Step 5: 获取完整路径几何
SELECT ST_AsGeoJSON(ST_LineMerge(
    ST_Union(
        (SELECT geom FROM roads WHERE id IN (
            SELECT edge FROM pgr_dijkstra(
                'SELECT id, source, target, cost, reverse_cost FROM roads',
                1, 5, directed := false
            )
        ))
    )
)) AS route_geometry;

-- ============================================================
-- 结果解释
-- ============================================================
-- pgr_dijkstra 返回路径序列，包含:
-- seq: 步骤序号
-- edge: 边的 ID
-- cost: 累计成本
-- agg_cost: 总成本
-- ============================================================`,
              },
            ],
          },
        ],
      },
    ],
  },

  // ============================================================
  // Phase 6: Spatial Analysis
  // ============================================================
  {
    id: 6,
    title: 'Phase 6: 空间分析',
    titleEn: 'Spatial Analysis',
    icon: 'chart',
    color: 'text-pink-500',
    modules: [
      {
        name: 'Turf.js',
        nameEn: 'Turf.js',
        examples: [
          {
            id: 'turf-buffer-analysis',
            phase: 6,
            phaseTitle: '空间分析',
            module: 'Turf.js',
            title: 'Turf.js 缓冲区分析',
            titleEn: 'Turf.js Buffer Analysis',
            description: 'Turf.js 是客户端空间分析库，不需要服务器即可进行缓冲区、叠加分析等操作。本例演示在浏览器中使用 turf.buffer()。',
            descriptionEn: 'Turf.js is a client-side spatial analysis library. Do buffer, overlay analysis without a server. This example demonstrates turf.buffer().',
            tags: ['Turf.js', 'Buffer', 'Client-side Analysis', 'Spatial Analysis'],
            mapType: 'turf',
            mapCenter: [116.3970, 39.9165],
            mapZoom: 13,
            files: [
              {
                filename: 'TurfBuffer.vue',
                language: 'vue',
                code: `<script setup lang="ts">
import { ref, onMounted } from 'vue'
import L from 'leaflet'
import * as turf from '@turf/turf'
import 'leaflet/dist/leaflet.css'

const mapContainer = ref<HTMLDivElement>()
const bufferResult = ref({ area: 0, perimeter: 0 })
let map: L.Map
let layers: L.LayerGroup

onMounted(() => {
  map = L.map(mapContainer.value!).setView([39.9165, 116.3970], 13)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)
  layers = new L.LayerGroup().addTo(map)

  // 故宫中心点
  const point = turf.point([116.3970, 39.9165])

  // 创建 1km 缓冲区
  const buffered = turf.buffer(point, 1, { units: 'kilometers' })

  // 显示结果
  displayBuffer(point, buffered)
  calcStats(buffered)
})

function displayBuffer(point: turf.Feature<turf.Point>, buffer: turf.Feature<turf.Polygon | turf.MultiPolygon>) {
  layers.clearLayers()

  // 中心点
  L.geoJSON(turf.featureCollection([point]) as any, {
    pointToLayer: () => L.circleMarker([0, 0], {
      radius: 8, fillColor: '#ef4444', color: '#fff', weight: 2,
    }).setLatLng((point.geometry as any).coordinates.reverse()),
  }).addTo(layers)

  // 缓冲区多边形
  L.geoJSON(turf.featureCollection([buffer]) as any, {
    style: { color: '#3b82f6', weight: 2, fillOpacity: 0.2, dashArray: '5,5' },
  }).addTo(layers)
}

function calcStats(buffer: turf.Feature<turf.Polygon | turf.MultiPolygon>) {
  const area = turf.area(buffer)
  const perimeter = turf.length(turf.polygonToLine(buffer) as any, { units: 'kilometers' })
  bufferResult.value = {
    area: Math.round(area / 1_000_000 * 100) / 100, // km²
    perimeter: Math.round(perimeter * 100) / 100,
  }
}
</script>

<template>
  <div class="relative h-full">
    <div ref="mapContainer" class="w-full h-full" />
    <div class="stats-panel">
      <h4>缓冲区分析结果</h4>
      <p>面积: <b>{{ bufferResult.area }} km²</b></p>
      <p>周长: <b>{{ bufferResult.perimeter }} km</b></p>
      <p class="tip">中心: 故宫 (116.3970, 39.9165)<br>半径: 1km</p>
    </div>
  </div>
</template>

<style scoped>
.stats-panel {
  position: absolute; top: 10px; right: 10px;
  z-index: 1000; background: rgba(255,255,255,0.95);
  padding: 12px; border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
  font-size: 12px; min-width: 160px;
}
.tip { font-size: 10px; color: #9ca3af; margin-top: 6px; }
</style>`,
              },
            ],
          },
          {
            id: 'turf-spatial-relation',
            phase: 6,
            phaseTitle: '空间分析',
            module: 'Turf.js',
            title: 'Turf.js 空间关系判断',
            titleEn: 'Turf.js Spatial Relations',
            description: 'Turf.js 提供丰富的空间谓词：turf.booleanPointInPolygon (点是否在多边形内)、turf.booleanIntersects (两几何是否相交)。纯前端实现，无需服务器。',
            descriptionEn: 'Turf.js spatial predicates: booleanPointInPolygon, booleanIntersects. Pure client-side, no server needed.',
            tags: ['Turf.js', 'booleanIntersects', 'booleanPointInPolygon', 'Spatial Predicate'],
            mapType: 'turf',
            mapCenter: [116.3970, 39.9165],
            mapZoom: 12,
            files: [
              {
                filename: 'SpatialRelation.vue',
                language: 'vue',
                code: `<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import L from 'leaflet'
import * as turf from '@turf/turf'
import 'leaflet/dist/leaflet.css'

const mapContainer = ref<HTMLDivElement>()
const clickPoint = ref<turf.Feature<turf.Point> | null>(null)
const relationResults = ref<Record<string, boolean>>({})
let map: L.Map

onMounted(() => {
  map = L.map(mapContainer.value!).setView([39.9165, 116.3970], 12)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

  // 定义北京市二环区域 (简化多边形)
  const ringCoords = [
    [116.38, 39.88], [116.45, 39.88],
    [116.45, 39.94], [116.38, 39.94], [116.38, 39.88],
  ]
  const ring = turf.lineString(ringCoords)
  const innerRing = turf.lineString([
    [116.40, 39.90], [116.42, 39.90],
    [116.42, 39.92], [116.40, 39.92], [116.40, 39.90],
  ])

  // 外环
  L.geoJSON(turf.featureCollection([turf.polygon([ringCoords])]) as any, {
    style: { color: '#3b82f6', weight: 2, fillOpacity: 0.1 },
    onEachFeature: (_, layer) => layer.bindPopup('北京市二环区域'),
  }).addTo(map)

  // 内环 (多边形中的空洞)
  L.geoJSON(turf.featureCollection([turf.polygon([innerRing.geometry.coordinates as any])]) as any, {
    style: { color: '#10b981', weight: 2, fillOpacity: 0.15, dashArray: '5,5' },
    onEachFeature: (_, layer) => layer.bindPopup('中心区域'),
  }).addTo(map)

  // 地图点击 → 执行空间分析
  map.on('click', (e) => {
    const point = turf.point([e.latlng.lng, e.latlng.lat])
    const polygon = turf.polygon([ringCoords])
    const innerPolygon = turf.polygon([innerRing.geometry.coordinates as any])

    // === 空间谓词判断 ===
    const results = {
      // 点是否在外环内
      'inOuterRing': turf.booleanPointInPolygon(point, polygon),
      // 点是否在内环内
      'inInnerRing': turf.booleanPointInPolygon(point, innerPolygon),
      // 点与外环是否相交
      'intersectsOuter': turf.booleanIntersects(point, polygon),
    }

    clickPoint.value = point
    relationResults.value = results
    renderPoint(point, results)
  })
})

function renderPoint(point: turf.Feature<turf.Point>, results: Record<string, boolean>) {
  // 清除旧图层
  map.eachLayer((l) => {
    if ((l as any)._isClickPoint) map.removeLayer(l)
  })

  const color = results.inOuterRing ? '#10b981' : '#ef4444'
  L.circleMarker(
    (point.geometry.coordinates as any).reverse() as [number, number],
    { radius: 10, fillColor: color, color: '#fff', weight: 2 }
  )
    .bindPopup(\`
      <b>位置:</b> \${(point.geometry.coordinates as any).join(', ')}<br>
      <b>在二环内:</b> \${results.inOuterRing ? '是' : '否'}<br>
      <b>在中心区:</b> \${results.inInnerRing ? '是' : '否'}
    \`)
    .addTo(map)
}
</script>

<template>
  <div class="relative h-full">
    <div ref="mapContainer" class="w-full h-full" />
    <div class="relation-panel">
      <h4>空间关系判断</h4>
      <div v-for="(val, key) in relationResults" :key="key" class="result-item">
        <span class="dot" :class="val ? 'yes' : 'no'" />
        {{ key }}: {{ val ? '是' : '否' }}
      </div>
      <p class="tip">点击地图测试点与多边形的空间关系</p>
    </div>
  </div>
</template>

<style scoped>
.relation-panel {
  position: absolute; bottom: 24px; right: 10px;
  z-index: 1000; background: rgba(255,255,255,0.95);
  padding: 12px; border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
  font-size: 12px; min-width: 200px;
}
.result-item {
  display: flex; align-items: center; gap: 6px;
  margin: 4px 0; font-size: 12px;
}
.dot { width: 10px; height: 10px; border-radius: 50%; }
.dot.yes { background: #10b981; }
.dot.no { background: #ef4444; }
.tip { font-size: 10px; color: #9ca3af; margin-top: 6px; }
</style>`,
              },
            ],
          },
        ],
      },
    ],
  },

  // ============================================================
  // Phase 7: Real-world Projects
  // ============================================================
  {
    id: 7,
    title: 'Phase 7: 实战项目',
    titleEn: 'Real-world Projects',
    icon: 'project',
    color: 'text-cyan-500',
    modules: [
      {
        name: 'Project: City Guide',
        nameEn: 'Project: City Guide',
        examples: [
          {
            id: 'project-city-guide',
            phase: 7,
            phaseTitle: '实战项目',
            module: 'Project: City Guide',
            title: '城市景点导览系统',
            titleEn: 'City Landmarks Guide System',
            description: '综合项目：使用 Leaflet 构建北京市景点导览系统。包含景点分类标注、路线规划、距离量算和详情展示功能。',
            descriptionEn: 'Capstone project: Beijing landmarks guide with Leaflet. Category markers, routing, distance measurement, and detail popups.',
            tags: ['Leaflet', 'Routing', 'Landmarks', 'Capstone', 'Full Feature'],
            mapType: 'leaflet',
            mapCenter: [39.9042, 116.4074],
            mapZoom: 12,
            files: [
              {
                filename: 'CityGuide.vue',
                language: 'vue',
                code: `<script setup lang="ts">
import { ref, onMounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-routing-machine'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'

const mapContainer = ref<HTMLDivElement>()
let map: L.Map
let routingControl: any = null

const landmarks = [
  { id: 1, name: '故宫', lat: 39.9165, lng: 116.3970, type: 'landmark', rating: 5, desc: '明清两代皇宫' },
  { id: 2, name: '天安门广场', lat: 39.9043, lng: 116.3975, type: 'landmark', rating: 5, desc: '世界上最大的城市广场' },
  { id: 3, name: '天坛', lat: 39.8828, lng: 116.4106, type: 'park', rating: 4, desc: '明清皇帝祭天场所' },
  { id: 4, name: '长城', lat: 40.4319, lng: 116.5704, type: 'landmark', rating: 5, desc: '世界七大奇迹之一' },
  { id: 5, name: '圆明园', lat: 39.9395, lng: 116.3148, type: 'park', rating: 4, desc: '万园之园遗址' },
  { id: 6, name: '鸟巢', lat: 39.9928, lng: 116.4056, type: 'landmark', rating: 4, desc: '2008北京奥运会主体育场' },
  { id: 7, name: '颐和园', lat: 39.9993, lng: 116.2765, type: 'park', rating: 5, desc: '中国现存最大的皇家园林' },
]

const selectedLandmark = ref<typeof landmarks[0] | null>(null)

const typeColors: Record<string, string> = { landmark: '#ef4444', park: '#10b981' }

onMounted(() => {
  map = L.map(mapContainer.value!).setView([39.9042, 116.4074], 11)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap',
  }).addTo(map)

  // 绘制所有景点
  landmarks.forEach((lm) => {
    const marker = L.circleMarker([lm.lat, lm.lng], {
      radius: 12, fillColor: typeColors[lm.type], color: '#fff',
      weight: 2, fillOpacity: 0.9,
    }).addTo(map)

    marker.bindPopup(\`
      <b>\${lm.name}</b><br>
      \${lm.desc}<br>
      <span style="color:\${typeColors[lm.type]}">\${'★'.repeat(lm.rating)}</span><br>
      <button onclick="window.showRoute(\${lm.lat}, \${lm.lng})">从这里出发</button>
    \`)

    marker.on('click', () => { selectedLandmark.value = lm })
  })

  // 图例
  L.control.layers({}, {
    '景点': L.layerGroup(landmarks.map((lm) =>
      L.circleMarker([lm.lat, lm.lng], { radius: 1, fillOpacity: 0 })
    )),
  }, { collapsed: false, position: 'bottomright' }).addTo(map)

  // 测量工具
  L.control.scale({ position: 'bottomleft', imperial: false }).addTo(map)
})

function startRoute(lat: number, lng: number) {
  if (routingControl) map.removeControl(routingControl)
  routingControl = L.Routing.control({
    waypoints: [L.latLng(39.9042, 116.4074), L.latLng(lat, lng)],
    router: L.Routing.osrmv1({ serviceUrl: 'https://router.project-osrm.org/route/v1' }),
    show: true, collapsible: true, position: 'bottomright',
  }).addTo(map)
}
</script>

<template>
  <div class="relative h-full">
    <div ref="mapContainer" class="w-full h-full" />

    <!-- 侧边栏: 景点列表 -->
    <div class="sidebar-panel">
      <h3>北京景点导览</h3>
      <div class="landmark-list">
        <div
          v-for="lm in landmarks"
          :key="lm.id"
          class="landmark-item"
          :class="{ active: selectedLandmark?.id === lm.id }"
          @click="selectedLandmark = lm; map.setView([lm.lat, lm.lng], 14)"
        >
          <span class="badge" :style="{ background: typeColors[lm.type] }" />
          <div>
            <div class="lm-name">{{ lm.name }}</div>
            <div class="lm-desc">{{ lm.desc }}</div>
          </div>
          <button class="route-btn" @click.stop="startRoute(lm.lat, lm.lng)">路线</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar-panel {
  position: absolute; top: 10px; left: 10px;
  z-index: 1000; width: 240px;
  background: rgba(255,255,255,0.97);
  border-radius: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  padding: 12px; max-height: calc(100% - 20px);
  overflow-y: auto;
}
.sidebar-panel h3 { font-size: 14px; margin-bottom: 8px; color: #1f2937; }
.landmark-item {
  display: flex; align-items: center; gap: 8px;
  padding: 8px; border-radius: 8px; cursor: pointer;
  transition: background 0.2s; font-size: 12px;
}
.landmark-item:hover, .landmark-item.active { background: #f3f4f6; }
.badge { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
.lm-name { font-weight: 600; }
.lm-desc { font-size: 10px; color: #9ca3af; }
.route-btn {
  margin-left: auto; padding: 2px 8px;
  background: #3b82f6; color: white;
  border: none; border-radius: 4px; font-size: 10px; cursor: pointer;
}
</style>`,
              },
            ],
          },
          {
            id: 'project-choropleth',
            phase: 7,
            phaseTitle: '实战项目',
            module: 'Project: City Guide',
            title: '数据可视化统计地图',
            titleEn: 'Choropleth Map Visualization',
            description: '使用 GeoJSON 数据制作分级色彩图（Choropleth Map）。根据各区域数值填充不同颜色，是 GIS 数据可视化最常用的方法。',
            descriptionEn: 'Create a choropleth map from GeoJSON data. Color regions by values. The most common GIS data visualization method.',
            tags: ['Choropleth', 'Data Visualization', 'GeoJSON', 'Leaflet', 'Statistics'],
            mapType: 'leaflet',
            mapCenter: [35.6762, 139.6503],
            mapZoom: 8,
            files: [
              {
                filename: 'ChoroplethMap.vue',
                language: 'vue',
                code: `<script setup lang="ts">
import { ref, onMounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const mapContainer = ref<HTMLDivElement>()

// 模拟人口数据 (实际中从 API 获取)
const populationData: Record<string, number> = {
  '东京都': 13960000, '神奈川县': 9230000, '埼玉县': 7350000,
  '千叶县': 6280000, '爱知县': 7550000, '大阪府': 8830000,
  '北海道': 5220000, '福冈县': 5140000,
}

// 颜色比例尺函数 (将数值映射到颜色)
function getColor(value: number, min: number, max: number): string {
  const ratio = (value - min) / (max - min)
  // 蓝-绿-黄-红 渐变色阶
  if (ratio < 0.25) return '#2166ac'
  if (ratio < 0.5) return '#67a9cf'
  if (ratio < 0.75) return '#fddbc7'
  return '#b2182b'
}

onMounted(async () => {
  const map = L.map(mapContainer.value!).setView([35.6762, 139.6503], 8)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

  // 简化 GeoJSON (各都府县边界)
  const regionsGeoJson = {
    type: 'FeatureCollection',
    features: [
      { type: 'Feature', geometry: { type: 'Polygon', coordinates: [[[139.3,35.5],[139.8,35.5],[139.8,36.0],[139.3,36.0],[139.3,35.5]]] }, properties: { name: '东京都', pop: 13960000 } },
      { type: 'Feature', geometry: { type: 'Polygon', coordinates: [[[139.0,35.3],[139.5,35.3],[139.5,35.8],[139.0,35.8],[139.0,35.3]]] }, properties: { name: '神奈川县', pop: 9230000 } },
      { type: 'Feature', geometry: { type: 'Polygon', coordinates: [[[139.1,35.7],[139.5,35.7],[139.5,36.1],[139.1,36.1],[139.1,35.7]]] }, properties: { name: '埼玉县', pop: 7350000 } },
      { type: 'Feature', geometry: { type: 'Polygon', coordinates: [[[139.9,35.2],[140.3,35.2],[140.3,35.8],[139.9,35.8],[139.9,35.2]]] }, properties: { name: '千叶县', pop: 6280000 } },
    ],
  }

  const minPop = Math.min(...Object.values(populationData))
  const maxPop = Math.max(...Object.values(populationData))

  L.geoJSON(regionsGeoJson as any, {
    style: (feature) => {
      const pop = feature?.properties?.pop || 0
      return {
        fillColor: getColor(pop, minPop, maxPop),
        weight: 1, color: '#fff', fillOpacity: 0.7,
      }
    },
    onEachFeature: (feature, layer) => {
      const p = feature.properties
      layer.bindPopup(\`
        <b>\${p.name}</b><br>
        人口: \${p.pop?.toLocaleString()}<br>
        排名: \${Object.values(populationData).sort((a,b) => b-a).indexOf(p.pop)+1} / \${Object.keys(populationData).length}
      \`)
      layer.on({
        mouseover: (e) => (e.target as any).setStyle({ weight: 3, fillOpacity: 0.9 }),
        mouseout: (e) => (e.target as any).setStyle({ weight: 1, fillOpacity: 0.7 }),
      })
    },
  }).addTo(map)

  // 图例
  const legend = L.control({ position: 'bottomright' })
  legend.onAdd = () => {
    const div = L.DomUtil.create('div', 'info legend')
    const grades = [minPop, (minPop+maxPop)/4, (minPop+maxPop)/2, (minPop+maxPop*3)/4, maxPop]
    div.innerHTML = '<h4 style="margin:0 0 4px">人口 (人)</h4>'
    grades.forEach((g, i) => {
      div.innerHTML += \`<i style="background:\${getColor(g, minPop, maxPop)};opacity:0.7"></i> \${Math.round(g/10000)}万<br>\`
    })
    return div
  }
  legend.addTo(map)
})
</script>

<template>
  <div ref="mapContainer" class="w-full h-full" />
</template>

<style>
.legend { background: white; padding: 10px; line-height: 18px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.15); }
.legend i { width: 18px; height: 14px; display: inline-block; margin-right: 4px; border-radius: 2px; }
</style>`,
              },
            ],
          },
        ],
      },
      {
        name: 'Docker Setup',
        nameEn: 'Docker Setup',
        examples: [
          {
            id: 'docker-postgis',
            phase: 7,
            phaseTitle: '实战项目',
            module: 'Docker Setup',
            title: 'Docker Compose 一键部署 PostGIS',
            titleEn: 'Docker Compose PostGIS Setup',
            description: '使用 Docker Compose 快速部署 PostgreSQL + PostGIS + pgAdmin4 开发环境。一条命令启动完整的空间数据库服务。',
            descriptionEn: 'Deploy PostgreSQL + PostGIS + pgAdmin4 with Docker Compose. One command to spin up a complete spatial database environment.',
            tags: ['Docker', 'PostgreSQL', 'PostGIS', 'pgAdmin', 'Deployment'],
            mapType: 'docker',
            files: [
              {
                filename: 'docker-compose.yml',
                language: 'dockercompose',
                code: `version: '3.8'

services:
  # ============================================
  # PostgreSQL + PostGIS 数据库
  # ============================================
  db:
    image: postgis/postgis:16-3.4
    container_name: webgis-postgres
    restart: unless-stopped
    environment:
      POSTGRES_DB: webgis
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: your_secure_password
      PGDATA: /var/lib/postgresql/data/pgdata
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql:ro
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

  # ============================================
  # pgAdmin4 管理界面
  # ============================================
  pgadmin:
    image: dpage/pgadmin4:latest
    container_name: webgis-pgadmin
    restart: unless-stopped
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@webgis.local
      PGADMIN_DEFAULT_PASSWORD: admin123
    ports:
      - "5050:80"
    volumes:
      - pgadmin_data:/var/lib/pgadmin
    depends_on:
      - db

  # ============================================
  # GeoServer 地图服务器 (可选)
  # ============================================
  geoserver:
    image: kartoza/geoserver:2.25.0
    container_name: webgis-geoserver
    restart: unless-stopped
    environment:
      GEOSERVER_ADMIN_USER: admin
      GEOSERVER_ADMIN_PASSWORD: geoserver
    ports:
      - "8080:8080"
    volumes:
      - geoserver_data:/opt/geoserver_data
    depends_on:
      - db

volumes:
  postgres_data:
  pgadmin_data:
  geoserver_data:`,
              },
              {
                filename: 'init.sql',
                language: 'sql',
                code: `-- Docker PostGIS 初始化脚本
-- 容器首次启动时自动执行

-- 启用 PostGIS 扩展
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS postgis_topology;
CREATE EXTENSION IF NOT EXISTS pgrouting;

-- 创建示例表
CREATE TABLE IF NOT EXISTS features (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    category VARCHAR(100),
    geom GEOMETRY(Point, 4326) NOT NULL,
    properties JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS parcels (
    id SERIAL PRIMARY KEY,
    address VARCHAR(300),
    area_sqm FLOAT,
    geom GEOMETRY(Polygon, 4326) NOT NULL
);

-- 创建空间索引 (重要!)
CREATE INDEX IF NOT EXISTS features_geom_idx ON features USING GIST (geom);
CREATE INDEX IF NOT EXISTS parcels_geom_idx ON parcels USING GIST (geom);

-- 插入示例数据: 北京著名地点
INSERT INTO features (name, category, geom) VALUES
    ('故宫', 'landmark', ST_GeomFromText('POINT(116.3970 39.9165)', 4326)),
    ('天安门广场', 'landmark', ST_GeomFromText('POINT(116.3975 39.9043)', 4326)),
    ('天坛', 'park', ST_GeomFromText('POINT(116.4106 39.8828)', 4326)),
    ('长城', 'landmark', ST_GeomFromText('POINT(116.5704 40.4319)', 4326)),
    ('鸟巢', 'landmark', ST_GeomFromText('POINT(116.4056 39.9928)', 4326)),
    ('颐和园', 'park', ST_GeomFromText('POINT(116.2765 39.9993)', 4326));

-- 创建道路网络表 (用于 pgRouting)
CREATE TABLE IF NOT EXISTS roads (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    source INT,
    target INT,
    cost FLOAT DEFAULT 1,
    reverse_cost FLOAT DEFAULT 1,
    geom GEOMETRY(LineString, 4326) NOT NULL
);

CREATE INDEX IF NOT EXISTS roads_geom_idx ON roads USING GIST (geom);

-- 输出成功信息
DO $$
BEGIN
    RAISE NOTICE 'WebGIS PostGIS database initialized successfully!';
    RAISE NOTICE 'PostGIS version: %', PostGIS_Version();
END $$;`,
              },
            ],
          },
        ],
      },
    ],
  },
]
