import { DatabaseModule } from '@modules/database/database.module';
import { UserPrismaRepository } from '@modules/user/repositories/user.prisma.repository';
import { CreateOneUserService } from '@modules/user/services/create-one-user.service';
import { DeleteOneUserByIdService } from '@modules/user/services/delete-one-user-by-id.service';
import { GetManyUserService } from '@modules/user/services/get-many-user.service';
import { GetOneUserByIdService } from '@modules/user/services/get-one-user-by-id.service';
import { UpdateOneUserByIdService } from '@modules/user/services/update-one-user-by-id.service';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AppCrypto } from '@utilities/app-crypto';

beforeAll(async () => {
  const testingModule: TestingModule = await Test.createTestingModule({
    imports: [DatabaseModule, ConfigModule.forRoot()],
    providers: [
      CreateOneUserService,
      DeleteOneUserByIdService,
      GetOneUserByIdService,
      GetManyUserService,
      UpdateOneUserByIdService,
      UserPrismaRepository,
      AppCrypto,
    ],
  }).compile();

  global.testingModule = testingModule;
});
