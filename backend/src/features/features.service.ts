import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, DataSource } from 'typeorm'
import { Feature } from '../entities/feature.entity'
import {
  CreateFeatureDto,
  UpdateFeatureDto,
  FeatureResponseDto,
} from './features.dto'

@Injectable()
export class FeaturesService {
  constructor(
    @InjectRepository(Feature)
    private readonly repo: Repository<Feature>,
    private readonly dataSource: DataSource,
  ) {}

  async findAll(category?: string, limit = 100, offset = 0) {
    const where = category ? `WHERE category = '${category}'` : ''
    const sql = `
      SELECT id, name, category,
             ST_AsGeoJSON(geom) as geom,
             properties, created_at
      FROM features ${where}
      ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}
    `
    const rows = await this.dataSource.query(sql)
    return {
      type: 'FeatureCollection',
      features: rows.map((r: any) => ({
        type: 'Feature',
        id: r.id,
        geometry: JSON.parse(r.geom),
        properties: {
          id: r.id,
          name: r.name,
          category: r.category,
          properties: r.properties || {},
          created_at: r.created_at,
        },
      })),
    }
  }

  async findOne(id: number) {
    const sql = `SELECT id, name, category, ST_AsGeoJSON(geom) as geom, properties
                 FROM features WHERE id = $1`
    const rows = await this.dataSource.query(sql, [id])
    if (!rows[0]) throw new NotFoundException(`Feature #${id} not found`)

    const r = rows[0]
    return {
      type: 'Feature',
      id: r.id,
      geometry: JSON.parse(r.geom),
      properties: {
        id: r.id,
        name: r.name,
        category: r.category,
        properties: r.properties || {},
      },
    }
  }

  async create(dto: CreateFeatureDto) {
    const sql = `
      INSERT INTO features (name, category, geom, properties)
      VALUES ($1, $2, ST_GeomFromGeoJSON($3), $4::jsonb)
      RETURNING id
    `
    const result = await this.dataSource.query(sql, [
      dto.name,
      dto.category,
      JSON.stringify(dto.geometry),
      JSON.stringify(dto.properties || {}),
    ])
    return { id: result[0].id, message: 'Feature created' }
  }

  async update(id: number, dto: UpdateFeatureDto) {
    const sets: string[] = []
    const params: any[] = []
    let idx = 1

    if (dto.name !== undefined) { sets.push(`name = $${idx++}`); params.push(dto.name) }
    if (dto.category !== undefined) { sets.push(`category = $${idx++}`); params.push(dto.category) }
    if (dto.geometry !== undefined) {
      sets.push(`geom = ST_GeomFromGeoJSON($${idx++})`)
      params.push(JSON.stringify(dto.geometry))
    }
    if (dto.properties !== undefined) {
      sets.push(`properties = $${idx++}::jsonb`)
      params.push(JSON.stringify(dto.properties))
    }

    if (sets.length === 0) throw new NotFoundException('No fields to update')
    params.push(id)

    const sql = `UPDATE features SET ${sets.join(', ')} WHERE id = $${idx} RETURNING id`
    const result = await this.dataSource.query(sql, params)
    if (!result[0]) throw new NotFoundException(`Feature #${id} not found`)

    return { message: 'Feature updated', id }
  }

  async remove(id: number) {
    const result = await this.dataSource.query(
      'DELETE FROM features WHERE id = $1 RETURNING id',
      [id],
    )
    if (!result[0]) throw new NotFoundException(`Feature #${id} not found`)
    return { message: 'Feature deleted', id }
  }
}
