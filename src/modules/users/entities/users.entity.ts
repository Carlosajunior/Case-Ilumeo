import { Column, Entity } from 'typeorm';

import { DefaultEntity } from '../../common/shared/entities/default.entity';
import { type UserModel } from '../models/users.model';

@Entity({ name: 'Users' })
export class Users extends DefaultEntity implements UserModel {
  @Column()
  code: string;
}
