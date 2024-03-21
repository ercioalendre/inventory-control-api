import { Type } from '@nestjs/common';
import { ProductModelBaseInputDto } from './product-model-base-input.dto';
import { PartialType } from '@nestjs/mapped-types';

export abstract class UpdateOneProductModelInputDto extends PartialType(
  ProductModelBaseInputDto as Type<ProductModelBaseInputDto>,
) {
  public unhashedPassword?: string | null;

  public token?: string | null;

  public updatedAt: Date;

  public updatedBy?: string | null;
}
