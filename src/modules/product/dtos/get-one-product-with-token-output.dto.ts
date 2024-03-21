import { ProductModelBaseOutputDto } from './product-model-base-output.dto';

export class GetOneProductWithTokenOutputDto extends ProductModelBaseOutputDto {
  public token: string;
}
