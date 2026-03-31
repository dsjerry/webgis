export interface ExampleFile {
  filename: string
  language: string
  code: string
}

export interface Example {
  id: string
  phase: number
  phaseTitle: string
  module: string
  title: string
  titleEn: string
  description: string
  descriptionEn: string
  tags: string[]
  mapType: 'leaflet' | 'openlayers' | 'maplibre' | 'none' | 'turf' | 'postgis' | 'nestjs' | 'pgrouting' | 'docker'
  files: ExampleFile[]
  mapCenter?: [number, number]
  mapZoom?: number
  backendEndpoint?: string
  height?: string
}

export interface Phase {
  id: number
  title: string
  titleEn: string
  icon: string
  color: string
  /** Optional Tailwind background classes for sidebar phase icon */
  bgColor?: string
  modules: Module[]
}

export interface Module {
  name: string
  nameEn: string
  examples: Example[]
}
