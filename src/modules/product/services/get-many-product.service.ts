import { Injectable } from '@nestjs/common';
import { ProductPrismaRepository } from '@modules/product/repositories/product.prisma.repository';
import { GetManyProductOutputDto } from '@modules/product/dtos/get-many-product-output.dto';
import { SearchParams } from '@src/types/search-params.type';

@Injectable()
export class GetManyProductService {
  constructor(
    private readonly productPrismaRepository: ProductPrismaRepository,
  ) {}

  public async execute(
    searchParams?: SearchParams | null,
  ): Promise<GetManyProductOutputDto> {
    return await this.productPrismaRepository.getMany(searchParams);
  }
}
