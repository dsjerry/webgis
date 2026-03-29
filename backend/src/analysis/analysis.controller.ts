import { Controller, Post, Body, BadRequestException } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { AnalysisService } from './analysis.service'

@ApiTags('Spatial Analysis')
@Controller('api/v1/analysis')
export class AnalysisController {
  constructor(private readonly service: AnalysisService) {}

  @Post('buffer')
  @ApiOperation({ summary: 'Buffer analysis — create buffer zone around geometry' })
  buffer(
    @Body()
    body: {
      geometry: any
      distance: number
      unit?: string
    },
  ) {
    if (!body.geometry) throw new BadRequestException('geometry is required')
    if (!body.distance || body.distance <= 0)
      throw new BadRequestException('distance must be positive')
    return this.service.buffer(body.geometry, body.distance, body.unit || 'meters')
  }

  @Post('spatial-query')
  @ApiOperation({ summary: 'Spatial query: intersects, contains, within, dwithin' })
  spatialQuery(
    @Body()
    body: {
      geometry: any
      predicate?: string
      distance?: number
    },
  ) {
    if (!body.geometry) throw new BadRequestException('geometry is required')
    const valid = ['intersects', 'contains', 'within', 'dwithin']
    const pred = body.predicate || 'intersects'
    if (!valid.includes(pred))
      throw new BadRequestException(`predicate must be one of: ${valid.join(', ')}`)
    return this.service.spatialQuery(body.geometry, pred as 'intersects' | 'contains' | 'within' | 'dwithin', body.distance)
  }

  @Post('distance')
  @ApiOperation({ summary: 'Calculate distance between two points' })
  distance(
    @Body() body: { start: any; end: any },
  ) {
    if (!body.start || !body.end)
      throw new BadRequestException('start and end points are required')
    return this.service.distance(body.start, body.end)
  }

  @Post('route/shortest-path')
  @ApiOperation({ summary: 'Shortest path via pgRouting (requires roads table)' })
  shortestPath(
    @Body() body: { start: any; end: any },
  ) {
    if (!body.start || !body.end)
      throw new BadRequestException('start and end points are required')
    return this.service.shortestPath(body.start, body.end)
  }
}
