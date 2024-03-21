import { Module } from '@nestjs/common';
import { PrismaService } from '@modules/database/prisma/prisma.service';
import { ProductPrismaRepository } from '@modules/product/repositories/product.prisma.repository';
import { AppCrypto } from '@utilities/app-crypto';
import { CreateOneProductController } from '@modules/product/controllers/create-one-product.controller';
import { GetOneProductByIdController } from '@modules/product/controllers/get-one-product-by-id.controller';
import { GetManyProductController } from '@modules/product/controllers/get-many-product.controller';
import { UpdateOneProductByIdController } from '@modules/product/controllers/update-one-product-by-id.controller';
import { DeleteOneProductByIdController } from '@modules/product/controllers/delete-one-product-by-id.controller';
import { CreateOneProductService } from '@modules/product/services/create-one-product.service';
import { GetManyProductService } from '@modules/product/services/get-many-product.service';
import { GetOneProductByIdService } from '@modules/product/services/get-one-product-by-id.service';
import { UpdateOneProductByIdService } from '@modules/product/services/update-one-product-by-id.service';
import { DeleteOneProductByIdService } from '@modules/product/services/delete-one-product-by-id.service';

@Module({
  controllers: [
    CreateOneProductController,
    GetManyProductController,
    GetOneProductByIdController,
    UpdateOneProductByIdController,
    DeleteOneProductByIdController,
  ],
  providers: [
    CreateOneProductService,
    GetManyProductService,
    GetOneProductByIdService,
    UpdateOneProductByIdService,
    DeleteOneProductByIdService,
    ProductPrismaRepository,
    PrismaService,
    AppCrypto,
  ],
  exports: [ProductPrismaRepository],
})
export class ProductModule {}
