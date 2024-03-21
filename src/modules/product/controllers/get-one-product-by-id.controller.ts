import { Controller, Get, Param } from '@nestjs/common';
import { GetOneProductOutputDto } from '@modules/product/dtos/get-one-product-output.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppController } from '@src/app.controller';
import { Role } from '@modules/user/constants/role.enum';
import { Roles } from '@decorators/roles.decorator';
import { GetOneProductByIdService } from '@modules/product/services/get-one-product-by-id.service';

@Controller('product')
@Roles(Role.Admin, Role.Employee)
@ApiTags('Product')
export class GetOneProductByIdController extends AppController {
  constructor(
    private readonly getOneProductByIdService: GetOneProductByIdService,
  ) {
    super();
  }

  @Get('get-one/id/:id')
  @ApiOperation({
    summary: 'Gets one single product by ID.',
  })
  public async handler(
    @Param('id') id: string,
  ): Promise<GetOneProductOutputDto | null> {
    return await this.getOneProductByIdService.execute(id);
  }
}
