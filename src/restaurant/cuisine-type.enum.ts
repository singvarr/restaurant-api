import { registerEnumType } from '@nestjs/graphql';

export enum CuisineType {
  INDIAN = 'INDIAN',
  CHINESE = 'CHINESE',
  FRENCH = 'FRENCH',
  ITALIAN = 'ITALIAN',
}

registerEnumType(CuisineType, { name: 'CuisineType' });
