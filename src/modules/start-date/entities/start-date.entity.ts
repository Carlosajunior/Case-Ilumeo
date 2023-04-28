import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { DefaultEntity } from '../../common/shared/entities/default.entity';
import { Users } from '../../users/entities/users.entity';
import { type StartDateModel } from '../models/start-date.model';

@Entity({ name: 'Start_Date' })
export class StartDate extends DefaultEntity implements StartDateModel {
  @Column()
  date: Date;

  @Column({ nullable: false })
  user_id: string;

  @ManyToOne(() => Users, (User) => User.id)
  @JoinColumn({ name: 'user_id' })
  user: Users;
}
