import { Roles } from './roles.enum';

export interface TokenPayload {
  id: number;
  email: string;
  role: Roles | null;
}
