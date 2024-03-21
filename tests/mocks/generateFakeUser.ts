import { Role } from '@modules/user/constants/role.enum';
import { UserModelBaseOutputDto } from '@modules/user/dtos/user-model-base-output.dto';
import { generatePassword } from '@utilities/generate-password';
import { randomUUID } from 'node:crypto';

interface UserModelBaseOutputDtoWithPassword extends UserModelBaseOutputDto {
  password: string;
}

export function generateFakeUser(): UserModelBaseOutputDtoWithPassword {
  return {
    id: randomUUID(),
    fullName: 'John Doe',
    email: 'john.doe@system.com',
    phone: '(555) 555-5555',
    role: Role.Employee,
    password: generatePassword(),
    isActive: true,
    createdAt: new Date(),
    createdBy: randomUUID(),
  };
}

export function generateFakeUserWithoutPassword(): UserModelBaseOutputDto {
  return {
    id: randomUUID(),
    fullName: 'John Doe',
    email: 'john.doe@system.com',
    phone: '(555) 555-5555',
    role: Role.Employee,
    isActive: true,
    createdAt: new Date(),
    createdBy: randomUUID(),
  };
}
