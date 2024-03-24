import { Entity } from 'typeorm';
import { BlacklistToken } from './blacklist-token.entity';

@Entity()
export class BlacklistRefreshToken extends BlacklistToken {}
