import { ProductModelBaseOutputDto } from './product-model-base-output.dto';

export abstract class UpdateOneProductModelOutputDto extends ProductModelBaseOutputDto {
  public readonly token?: string | null;

  public readonly updatedAt: Date;

  public readonly updatedBy?: string | null;
}
