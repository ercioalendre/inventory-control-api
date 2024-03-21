import { Injectable } from '@nestjs/common';
import { PrismaService } from '@modules/database/prisma/prisma.service';
import { CreateOneProductModelInputDto } from '@modules/product/dtos/create-one-product-model-input.dto';
import { UpdateOneProductModelInputDto } from '@modules/product/dtos/update-one-product-model-input.dto';
import { DeleteOneProductOutputDto } from '@modules/product/dtos/delete-one-product-output.dto';
import { GetOneProductOutputDto } from '@modules/product/dtos/get-one-product-output.dto';
import { Prisma } from '@prisma/client';
import { CreateOneProductModelOutputDto } from '@modules/product/dtos/create-one-product-model-output.dto';
import { GetManyProductOutputDto } from '@modules/product/dtos/get-many-product-output.dto';
import { UpdateOneProductModelOutputDto } from '@modules/product/dtos/update-one-product-model-output.dto';
import { SearchParams } from '@src/types/search-params.type';
import { ProductSortableFieldList } from '@modules/product/constants/product-sortable-field-list';

@Injectable()
export class ProductPrismaRepository {
  private readonly selectMainData = {
    id: true,
    name: true,
    amount: true,
    value: true,
  };

  private readonly selectDataStats = {
    isActive: true,
    createdAt: true,
    createdBy: true,
    updatedAt: true,
    updatedBy: true,
    isActiveChangedAt: true,
    isActiveChangedBy: true,
  };

  constructor(private readonly prismaService: PrismaService) {}

  public async createOne(
    createProductModelDto: CreateOneProductModelInputDto,
  ): Promise<CreateOneProductModelOutputDto> {
    return this.prismaService.product.create({
      data: createProductModelDto,
      select: {
        ...this.selectMainData,
        ...this.selectDataStats,
      },
    });
  }

  public async getMany(
    searchParams: SearchParams | null = {},
  ): Promise<GetManyProductOutputDto> {
    const {
      page = 1,
      perPage = 10,
      filterBy = undefined,
      filterValue = undefined,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = searchParams;

    const skip = (page - 1) * perPage;

    const orderBy = {};

    const isSortableField = ProductSortableFieldList.find(
      (sortableField) => sortableField === sortBy,
    );

    const parsedSortBy = isSortableField || 'createdAt';

    orderBy[parsedSortBy] = sortOrder;

    const filters = {
      [filterBy]: filterValue,
    };

    const productFoundCount = await this.prismaService.product.count({
      where: filters,
    });

    const productFoundList = await this.prismaService.product.findMany({
      where: filters,
      orderBy,
      skip,
      take: Number(perPage),
      select: {
        ...this.selectMainData,
        ...this.selectDataStats,
      },
    });

    return {
      data: productFoundList,
      currentPage: page,
      perPage,
      lastPage: Math.ceil(productFoundCount / perPage) || 1,
      totalRecords: productFoundCount,
    };
  }

  public async getOne(
    getOneProductInputDto: Prisma.ProductWhereInput,
  ): Promise<GetOneProductOutputDto> {
    return this.prismaService.product.findFirst({
      where: getOneProductInputDto,
      select: {
        ...this.selectMainData,
        ...this.selectDataStats,
      },
    });
  }

  public async getOneUnique(
    getOneProductInputDto: Prisma.ProductWhereUniqueInput,
  ): Promise<GetOneProductOutputDto> {
    return this.prismaService.product.findUnique({
      where: getOneProductInputDto,
      select: {
        ...this.selectMainData,
        ...this.selectDataStats,
      },
    });
  }

  public async updateOneById(
    id: string,
    updateProductModelDto: UpdateOneProductModelInputDto,
  ): Promise<UpdateOneProductModelOutputDto> {
    return await this.prismaService.product.update({
      where: {
        id,
      },
      data: updateProductModelDto,
      select: {
        ...this.selectMainData,
        ...this.selectDataStats,
      },
    });
  }

  public async deleteOneById(id: string): Promise<DeleteOneProductOutputDto> {
    return await this.prismaService.product.delete({
      where: {
        id,
      },
      select: {
        ...this.selectMainData,
        ...this.selectDataStats,
      },
    });
  }
}
