import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'

@Injectable()
export class AnalysisService {
  constructor(private readonly dataSource: DataSource) {}

  async buffer(geometry: any, distance: number, unit = 'meters') {
    const sql = `
      SELECT
        ST_AsGeoJSON(
          ST_Buffer(
            ST_GeomFromGeoJSON($1)::geography,
            $2,
            $3
          )::geometry,
          6
        ) AS buffered_geom,
        ST_Area(
          ST_Buffer(
            ST_GeomFromGeoJSON($1)::geography,
            $2,
            $3
          )
        ) AS area_m2,
        ST_Perimeter(
          ST_Buffer(
            ST_GeomFromGeoJSON($1)::geography,
            $2,
            $3
          )
        ) AS perimeter_m
    `
    const rows = await this.dataSource.query(sql, [
      JSON.stringify(geometry),
      distance,
      unit,
    ])
    const r = rows[0]
    return {
      type: 'Feature',
      geometry: JSON.parse(r.buffered_geom),
      properties: {
        distance,
        unit,
        area_m2: parseFloat(r.area_m2) || 0,
        perimeter_m: parseFloat(r.perimeter_m) || 0,
      },
    }
  }

  async spatialQuery(
    geometry: any,
    predicate: 'intersects' | 'contains' | 'within' | 'dwithin',
    distance?: number,
  ) {
    const predMap: Record<string, string> = {
      intersects: 'ST_Intersects',
      contains: 'ST_Contains',
      within: 'ST_Within',
      dwithin: 'ST_DWithin',
    }
    const fn = predMap[predicate] || 'ST_Intersects'
    const extra = predicate === 'dwithin' && distance ? `, ${distance}` : ''

    const sql = `
      SELECT id, name, category,
             ST_AsGeoJSON(geom) as geom, properties
      FROM features
      WHERE ${fn}(
        geom,
        ST_GeomFromGeoJSON($1)::geography${extra}
      )
      LIMIT 100
    `
    const rows = await this.dataSource.query(sql, [JSON.stringify(geometry)])
    return {
      type: 'FeatureCollection',
      features: rows.map((r: any) => ({
        type: 'Feature',
        id: r.id,
        geometry: JSON.parse(r.geom),
        properties: { id: r.id, name: r.name, category: r.category },
      })),
    }
  }

  async distance(start: any, end: any) {
    const sql = `
      SELECT ST_Distance(
        ST_GeomFromGeoJSON($1)::geography,
        ST_GeomFromGeoJSON($2)::geography
      ) AS distance_m
    `
    const rows = await this.dataSource.query(sql, [
      JSON.stringify(start),
      JSON.stringify(end),
    ])
    return {
      start,
      end,
      distance_m: parseFloat(rows[0]?.distance_m) || 0,
      unit: 'meters',
    }
  }

  async shortestPath(start: any, end: any) {
    const sql = `
      SELECT
        ST_AsGeoJSON(
          ST_LineMerge(
            (SELECT ST_Union(geom) FROM roads WHERE id IN (
              SELECT edge FROM pgr_dijkstra(
                'SELECT id, source, target, cost, reverse_cost FROM roads',
                (SELECT id FROM roads_vertices_pgr
                 ORDER BY ST_Distance(geom, ST_GeomFromGeoJSON($1)) LIMIT 1),
                (SELECT id FROM roads_vertices_pgr
                 ORDER BY ST_Distance(geom, ST_GeomFromGeoJSON($2)) LIMIT 1),
                directed := false
              )
            ))
          )
        ) AS route_geom
    `
    try {
      const rows = await this.dataSource.query(sql, [
        JSON.stringify(start),
        JSON.stringify(end),
      ])
      if (rows[0]?.route_geom) {
        return {
          type: 'Feature',
          geometry: JSON.parse(rows[0].route_geom),
          properties: { note: 'Shortest path found via pgRouting' },
        }
      }
    } catch (err) {
      // roads table may not have topology
    }

    return {
      type: 'Feature',
      geometry: { type: 'LineString', coordinates: [] },
      properties: {
        note: 'No route found — ensure roads table has pgrouting topology',
      },
    }
  }
}
