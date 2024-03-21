import { Injectable, NotFoundException } from '@nestjs/common';
import { AppCrypto } from '@utilities/app-crypto';
import { ProductPrismaRepository } from '@modules/product/repositories/product.prisma.repository';
import { GetOneProductOutputDto } from '@modules/product/dtos/get-one-product-output.dto';
import { StaticErrors } from '@static/static-errors';

@Injectable()
export class GetOneProductByIdService {
  constructor(
    private readonly productPrismaRepository: ProductPrismaRepository,
    private readonly appCrypto: AppCrypto,
  ) {}

  public async execute(id: string): Promise<GetOneProductOutputDto> {
    const product = await this.productPrismaRepository.getOne({
      id,
    });

    if (!product) {
      throw new NotFoundException(
        StaticErrors.THE_PRODUCT_YOU_ARE_LOOKING_FOR_RELATED_TO_THE_GIVEN_ID_DOES_NOT_EXIST,
      );
    }

    return product;
  }
}
