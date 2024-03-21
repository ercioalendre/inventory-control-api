import { Controller, Param, Delete, Req } from '@nestjs/common';
import { DeleteOneProductOutputDto } from '@modules/product/dtos/delete-one-product-output.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppController } from '@src/app.controller';
import { Role } from '@modules/user/constants/role.enum';
import { Roles } from '@decorators/roles.decorator';
import { DeleteOneProductByIdService } from '@modules/product/services/delete-one-product-by-id.service';

@Controller('product')
@Roles(Role.Admin, Role.Employee)
@ApiTags('Product')
export class DeleteOneProductByIdController extends AppController {
  constructor(
    private readonly deleteOneProductByIdService: DeleteOneProductByIdService,
  ) {
    super();
  }

  @Delete('delete-one/id/:id')
  @ApiOperation({
    summary: 'Deletes one single product by ID.',
  })
  public async handler(
    @Req() request: Request,
    @Param('id') id: string,
  ): Promise<DeleteOneProductOutputDto> {
    return await this.deleteOneProductByIdService.execute(
      id,
      request['sessionUser'],
    );
  }
}
