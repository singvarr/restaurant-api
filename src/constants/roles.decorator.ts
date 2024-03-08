import { SetMetadata } from '@nestjs/common';
import { Roles as RolesOptions } from 'auth/constants/roles.enum';

export const ROLE_KEY = 'role';
export const Role = (role: RolesOptions) => SetMetadata(ROLE_KEY, role);
