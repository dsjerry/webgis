import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm'
import { Geometry } from 'geojson'

@Entity('features')
export class Feature {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 200 })
  name: string

  @Column({ length: 100, nullable: true })
  category: string

  @Column({
    type: 'geometry',
    spatialFeatureType: 'Point',
    srid: 4326,
  })
  geom: Geometry

  @Column({ type: 'jsonb', nullable: true })
  properties: Record<string, any>

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date
}
