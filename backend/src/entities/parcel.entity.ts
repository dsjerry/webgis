import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Geometry,
} from 'typeorm'

@Entity('parcels')
export class Parcel {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 300, nullable: true })
  address: string

  @Column({ type: 'float', nullable: true, name: 'area_sqm' })
  areaSqm: number

  @Column({
    type: 'geometry',
    spatialFeatureType: 'Polygon',
    srid: 4326,
  })
  geom: Geometry
}
