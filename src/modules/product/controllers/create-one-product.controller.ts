import { Controller, Post, Body, Req } from '@nestjs/common';
import { CreateOneProductInputDto } from '@modules/product/dtos/create-one-product-input.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppController } from '@src/app.controller';
import { Throttle } from '@nestjs/throttler';
import { CreateOneProductService } from '@modules/product/services/create-one-product.service';
import { Roles } from '@decorators/roles.decorator';
import { Role } from '@modules/user/constants/role.enum';

@Controller('product')
@Roles(Role.Admin, Role.Employee)
@ApiTags('Product')
export class CreateOneProductController extends AppController {
  constructor(
    private readonly createOneProductService: CreateOneProductService,
  ) {
    super();
  }

  @Post('create-one')
  @Throttle({ default: { ttl: 60000, limit: 10 } })
  @ApiOperation({
    summary: 'Creates one single product.',
  })
  public async handler(
    @Req() request: Request,
    @Body()
    createProductInputDto: CreateOneProductInputDto,
  ) {
    return await this.createOneProductService.execute(
      createProductInputDto,
      request['sessionUser'],
    );
  }
}
