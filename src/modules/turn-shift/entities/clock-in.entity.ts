import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { DefaultEntity } from '../../common/shared/entities/default.entity';
import { Users } from '../../users/entities/users.entity';
import { type ClockInModel } from '../models/clock-in.model';

@Entity({ name: 'Clock_In' })
export class ClockIn extends DefaultEntity implements ClockInModel {
  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  user_id: string;

  @ManyToOne(() => Users, (Users) => Users.id)
  @JoinColumn({ name: 'user_id' })
  user: Users;
}
