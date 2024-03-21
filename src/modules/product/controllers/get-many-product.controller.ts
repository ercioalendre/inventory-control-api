import { Controller, Get, Query, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppController } from '@src/app.controller';
import { Role } from '@modules/user/constants/role.enum';
import { Roles } from '@decorators/roles.decorator';
import { GetManyProductInputDto } from '@modules/product/dtos/get-many-product-input.dto';
import { GetManyProductService } from '@modules/product/services/get-many-product.service';
import { Response } from 'express';
import { ProductBaseOutputDto } from '@modules/product/dtos/product-base-output.dto';

@Controller('product')
@Roles(Role.Admin, Role.Employee)
@ApiTags('Product')
export class GetManyProductController extends AppController {
  constructor(private readonly getManyProductService: GetManyProductService) {
    super();
  }

  @Get('get-many')
  @ApiOperation({
    summary: 'Gets many products.',
  })
  public async handler(
    @Res({ passthrough: true }) response: Response,
    @Query() searchParams?: GetManyProductInputDto | null,
  ): Promise<ProductBaseOutputDto[]> {
    const productListWithPaginationMetadata =
      await this.getManyProductService.execute(searchParams);

    const { data, ...metadata } = productListWithPaginationMetadata;

    response.header('currentPage', String(metadata.currentPage));

    response.header('lastPage', String(metadata.lastPage));

    response.header('perPage', String(metadata.perPage));

    response.header('totalRecords', String(metadata.totalRecords));

    return data;
  }
}
