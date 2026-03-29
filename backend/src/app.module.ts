import { Module } from '@nestjs/common'
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
      synchronize: false,
      logging: false,
    }),
    FeaturesModule,
    AnalysisModule,
  ],
})
export class AppModule {}
