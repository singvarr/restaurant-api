import { registerEnumType } from '@nestjs/graphql';

export enum PaginationDirection {
  FORWARD = 'FORWARD',
  BACKWARD = 'BACKWARD',
}

registerEnumType(PaginationDirection, { name: 'PaginationDirection' });
