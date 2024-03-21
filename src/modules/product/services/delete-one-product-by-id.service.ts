import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductPrismaRepository } from '@modules/product/repositories/product.prisma.repository';
import { StaticErrors } from '@static/static-errors';
import { DeleteOneProductOutputDto } from '@modules/product/dtos/delete-one-product-output.dto';
import { UserBaseOutputDto } from '@modules/user/dtos/user-base-output.dto';
import { Role } from '@modules/user/constants/role.enum';

@Injectable()
export class DeleteOneProductByIdService {
  constructor(
    private readonly productPrismaRepository: ProductPrismaRepository,
  ) {}

  public async execute(
    id: string,
    sessionUser: UserBaseOutputDto,
  ): Promise<DeleteOneProductOutputDto> {
    const product = await this.productPrismaRepository.getOneUnique({ id });

    if (!product) {
      throw new NotFoundException(
        StaticErrors.THE_PRODUCT_YOU_ARE_TRYING_TO_DELETE_RELATED_TO_THE_GIVEN_ID_DOES_NOT_EXIST,
      );
    }

    if (
      sessionUser.role !== Role.Admin &&
      product.createdBy !== sessionUser.id
    ) {
      console.log('lalala');
    }

    return this.productPrismaRepository.deleteOneById(id);
  }
}
