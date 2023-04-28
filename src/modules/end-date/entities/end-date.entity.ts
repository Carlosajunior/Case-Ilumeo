import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { DefaultEntity } from '../../common/shared/entities/default.entity';
import { Users } from '../../users/entities/users.entity';
import { type EndDateModel } from '../models/end-date.model';

@Entity({ name: 'End_Date' })
export class EndDate extends DefaultEntity implements EndDateModel {
  @Column()
  date: Date;

  @Column({ nullable: false })
  user_id: string;

  @ManyToOne(() => Users, (User) => User.id)
  @JoinColumn({ name: 'user_id' })
  user: Users;
}
