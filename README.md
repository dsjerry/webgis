# WebGIS 从0到1 - Learning Platform

## Tech Stack

- **Frontend**: Vue 3.5 (Composition API + `<script setup>`) + TypeScript + Vite + Tailwind CSS v4
- **Package Manager**: Bun
- **Map Libraries**: Leaflet, OpenLayers, MapLibre GL JS
- **Spatial Analysis**: Turf.js
- **Backend**: NestJS + TypeORM + TypeORM Spatial + pg
- **Database**: PostgreSQL 16 + PostGIS 3.4 (via Docker)
- **Code Highlight**: Custom syntax highlighting

## Quick Start

### Frontend

```bash
cd frontend
bun install
bun run dev
# Open http://localhost:5173
```

### Backend (NestJS)

```bash
cd backend
cp .env.example .env  # Edit DB_* environment variables
npm install          # or: yarn / pnpm
docker compose up -d # Start PostgreSQL + PostGIS + pgAdmin + GeoServer
npm run start:dev    # Run NestJS on http://localhost:8000
# API docs: http://localhost:8000/docs (Swagger)
```

## Learning Phases

1. **Phase 1**: Web Development Basics (HTML/CSS, JavaScript Async, JSON)
2. **Phase 2**: GIS Fundamentals (Coordinates, Vector Data)
3. **Phase 3**: Frontend Map Development (Leaflet, OpenLayers, MapLibre)
4. **Phase 4**: Spatial Database (PostGIS)
5. **Phase 5**: Server-side API (NestJS, pgRouting)
6. **Phase 6**: Spatial Analysis (Turf.js)
7. **Phase 7**: Real-world Projects (City Guide, Choropleth Maps)

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/features` | List all spatial features |
| GET | `/api/v1/features/{id}` | Get single feature |
| POST | `/api/v1/features` | Create feature |
| PUT | `/api/v1/features/{id}` | Update feature |
| DELETE | `/api/v1/features/{id}` | Delete feature |
| POST | `/api/v1/analysis/buffer` | Buffer analysis |
| POST | `/api/v1/analysis/spatial-query` | Spatial query (intersects/contains/dwithin) |
| POST | `/api/v1/analysis/distance` | Distance between two points |
| POST | `/api/v1/analysis/route/shortest-path` | Shortest path via pgRouting |
