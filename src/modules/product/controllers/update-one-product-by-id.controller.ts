import {
  Controller,
  Body,
  Patch,
  Param,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { UpdateOneProductInputDto } from '@modules/product/dtos/update-one-product-input.dto';
import { UpdateOneProductOutputDto } from '@modules/product/dtos/update-one-product-output.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppController } from '@src/app.controller';
import { Request } from 'express';
import { Role } from '@modules/user/constants/role.enum';
import { Roles } from '@decorators/roles.decorator';
import { Throttle } from '@nestjs/throttler';
import { UpdateOneProductByIdService } from '@modules/product/services/update-one-product-by-id.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('product')
@Roles(Role.Admin, Role.Employee)
@ApiTags('Product')
export class UpdateOneProductByIdController extends AppController {
  constructor(
    private readonly updateOneProductByIdService: UpdateOneProductByIdService,
  ) {
    super();
  }

  @Patch('update-one/id/:id')
  @Throttle({ default: { ttl: 60000, limit: 10 } })
  @UseInterceptors(FilesInterceptor('productFileList'))
  @ApiOperation({
    summary: 'Updates one single product by ID.',
  })
  public async handler(
    @Req() request: Request,
    @Param('id') id: string,
    @Body() body: UpdateOneProductInputDto,
  ): Promise<UpdateOneProductOutputDto> {
    return this.updateOneProductByIdService.execute(
      id,
      body,
      request['sessionUser'],
    );
  }
}
