import { ProductModelBaseOutputDto } from './product-model-base-output.dto';

export class GetOneProductWithPasswordOutputDto extends ProductModelBaseOutputDto {
  public password: string;
}
