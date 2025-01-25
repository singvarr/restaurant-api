import { registerEnumType } from '@nestjs/graphql';

export enum ReservationStatus {
  NEW = 'NEW',
  APPROVED = 'APPROVED',
  DECLINED = 'DECLINED',
}

registerEnumType(ReservationStatus, { name: 'ReservationStatus' });
