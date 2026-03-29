import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger'
import { FeaturesService } from './features.service'
import { CreateFeatureDto, UpdateFeatureDto } from './features.dto'

@ApiTags('Features')
@Controller('api/v1/features')
export class FeaturesController {
  constructor(private readonly service: FeaturesService) {}

  @Get()
  @ApiOperation({ summary: 'List all features (GeoJSON FeatureCollection)' })
  @ApiQuery({ name: 'category', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'offset', required: false })
  findAll(
    @Query('category') category?: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    return this.service.findAll(
      category,
      limit ? parseInt(limit) : 100,
      offset ? parseInt(offset) : 0,
    )
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single feature by ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id)
  }

  @Post()
  @ApiOperation({ summary: 'Create a new spatial feature' })
  create(@Body() dto: CreateFeatureDto) {
    return this.service.create(dto)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing feature' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateFeatureDto,
  ) {
    return this.service.update(id, dto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a feature' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id)
  }
}
