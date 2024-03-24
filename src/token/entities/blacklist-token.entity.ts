import {
  BaseEntity,
  Column,
  CreateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'user/user.entity';

export abstract class BlacklistToken extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  value: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;
}
