import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AnalysisController } from './analysis.controller'
import { AnalysisService } from './analysis.service'
import { Feature } from '../entities/feature.entity'
import { Road } from '../entities/road.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Feature, Road])],
  controllers: [AnalysisController],
  providers: [AnalysisService],
})
export class AnalysisModule {}
