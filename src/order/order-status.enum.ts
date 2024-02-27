import { registerEnumType } from '@nestjs/graphql';

export enum OrderStatus {
  NEW = 'NEW',
  APPROVED = 'APPROVED',
  DECLINED = 'DECLINED',
}

registerEnumType(OrderStatus, { name: 'OrderStatus' });
