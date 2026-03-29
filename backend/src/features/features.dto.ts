import { IsString, IsOptional, IsObject, MinLength, MaxLength } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

class GeometryDto {
  @ApiProperty({ example: 'Point' })
  @IsString()
  type: string

  @ApiProperty({ example: [116.397, 39.916] })
  @IsObject()
  coordinates: number[]
}

export class CreateFeatureDto {
  @ApiProperty({ example: 'Forbidden City' })
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  name: string

  @ApiPropertyOptional({ example: 'landmark' })
  @IsOptional()
  @IsString()
  category?: string

  @ApiProperty({ type: GeometryDto })
  @IsObject()
  geometry: GeometryDto

  @ApiPropertyOptional({ example: {} })
  @IsOptional()
  @IsObject()
  properties?: Record<string, any>
}

export class UpdateFeatureDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  category?: string

  @ApiPropertyOptional({ type: GeometryDto })
  @IsOptional()
  @IsObject()
  geometry?: GeometryDto

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  properties?: Record<string, any>
}

export class FeatureResponseDto {
  type: 'Feature'
  id: number
  geometry: GeometryDto
  properties: Record<string, any>
}
