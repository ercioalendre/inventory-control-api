import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ProductPrismaRepository } from '@modules/product/repositories/product.prisma.repository';
import { CreateOneProductInputDto } from '@modules/product/dtos/create-one-product-input.dto';
import { CreateOneProductOutputDto } from '@modules/product/dtos/create-one-product-output.dto';
import { UserBaseOutputDto } from '@modules/user/dtos/user-base-output.dto';

@Injectable()
export class CreateOneProductService {
  constructor(
    private readonly productPrismaRepository: ProductPrismaRepository,
  ) {}

  public async execute(
    createOneProductInputDto: CreateOneProductInputDto,
    sessionUser: UserBaseOutputDto,
  ): Promise<CreateOneProductOutputDto> {
    const newProductModel = {
      id: randomUUID(),
      ...createOneProductInputDto,
      isActive: true,
      createdAt: new Date(),
      createdBy: sessionUser?.id,
    };

    return await this.productPrismaRepository.createOne(newProductModel);
  }
}
