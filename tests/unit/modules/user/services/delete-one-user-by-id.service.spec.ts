import { UserPrismaRepository } from '@modules/user/repositories/user.prisma.repository';
import { DeleteOneUserByIdService } from '@modules/user/services/delete-one-user-by-id.service';
import { generateFakeUser } from '@tests/mocks/generateFakeUser';

describe('DeleteOneUserByIdService test suite', () => {
  let service: DeleteOneUserByIdService;

  beforeAll(async () => {
    service = global.testingModule.get(
      DeleteOneUserByIdService,
    ) as DeleteOneUserByIdService;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should delete one user by id', async () => {
    const userPrismaRepository = global.testingModule.get(
      UserPrismaRepository,
    ) as UserPrismaRepository;

    const userToDelete = generateFakeUser();

    jest
      .spyOn(userPrismaRepository, 'getOneUnique')
      .mockResolvedValue(userToDelete);

    jest.spyOn(userPrismaRepository, 'getOne').mockResolvedValue(null);

    jest
      .spyOn(userPrismaRepository, 'deleteOneById')
      .mockResolvedValue(userToDelete);

    const result = await service.execute(userToDelete.id);

    expect(userPrismaRepository.deleteOneById).toHaveBeenCalled();

    expect(result).toEqual(userToDelete);
  });
});
