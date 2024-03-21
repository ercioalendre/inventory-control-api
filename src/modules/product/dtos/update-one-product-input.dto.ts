import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from '@nestjs/common';
import { ProductBaseInputDto } from './product-base-input.dto';
import { IsJWT, IsOptional, IsString } from 'class-validator';

export class UpdateOneProductInputDto extends PartialType(
  ProductBaseInputDto as Type<ProductBaseInputDto>,
) {
  @IsString()
  @IsOptional()
  @IsJWT()
  @ApiProperty({
    description: 'Token JWT.',
  })
  public readonly token?: string | null;
}
