import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export abstract class ProductBaseInputDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Product name.',
    example: 'Macbook Pro',
  })
  public name: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Product amount.',
    example: 100,
  })
  public amount: number;

  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @IsNotEmpty()
  @ApiProperty({
    description: 'Product value.',
    example: 1359.98,
  })
  public value: number;
}
