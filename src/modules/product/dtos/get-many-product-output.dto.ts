import { ProductBaseOutputDto } from './product-base-output.dto';

export class GetManyProductOutputDto {
  public readonly data: ProductBaseOutputDto[];
  public readonly currentPage: number;
  public readonly perPage: number;
  public readonly lastPage: number;
  public readonly totalRecords: number;
}
