import { registerEnumType } from '@nestjs/graphql';

export enum Roles {
  SUPERADMIN = 'SUPERADMIN',
}

registerEnumType(Roles, { name: 'Roles' });
