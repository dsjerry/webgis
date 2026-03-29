import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Geometry,
} from 'typeorm'

@Entity('roads')
export class Road {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 100, nullable: true })
  name: string

  @Column({ type: 'int', nullable: true })
  source: number

  @Column({ type: 'int', nullable: true })
  target: number

  @Column({ type: 'float', default: 1 })
  cost: number

  @Column({ type: 'float', default: 1, name: 'reverse_cost' })
  reverseCost: number

  @Column({
    type: 'geometry',
    spatialFeatureType: 'LineString',
    srid: 4326,
  })
  geom: Geometry
}
