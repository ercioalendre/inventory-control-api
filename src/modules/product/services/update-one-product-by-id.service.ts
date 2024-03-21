import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductPrismaRepository } from '@modules/product/repositories/product.prisma.repository';
import { StaticErrors } from '@static/static-errors';
import { UpdateOneProductInputDto } from '@modules/product/dtos/update-one-product-input.dto';
import { UpdateOneProductOutputDto } from '@modules/product/dtos/update-one-product-output.dto';
import { UserBaseOutputDto } from '@modules/user/dtos/user-base-output.dto';

@Injectable()
export class UpdateOneProductByIdService {
  constructor(
    private readonly productPrismaRepository: ProductPrismaRepository,
  ) {}

  public async execute(
    id: string,
    updateOneProductInputDto: UpdateOneProductInputDto,
    sessionUser: UserBaseOutputDto,
  ): Promise<UpdateOneProductOutputDto> {
    const productExists = await this.productPrismaRepository.getOneUnique({
      id,
    });

    if (!productExists) {
      throw new NotFoundException(
        StaticErrors.THE_PRODUCT_YOU_ARE_TRYING_TO_UPDATE_RELATED_TO_THE_GIVEN_ID_DOES_NOT_EXIST,
      );
    }

    const updatedProductModel = {
      ...updateOneProductInputDto,
      updatedAt: new Date(),
      updatedBy: sessionUser.id,
    };

    return await this.productPrismaRepository.updateOneById(
      id,
      updatedProductModel,
    );
  }
}
