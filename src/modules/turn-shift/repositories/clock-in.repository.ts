import { type UpdateResult, type Repository } from 'typeorm';

import { AppDataSource } from '../../../config/typeorm';
import { ClockIn } from '../entities/clock-in.entity';

export class ClockInRepository {
  clock_in_repository: Repository<ClockIn>;
  constructor() {
    this.clock_in_repository = AppDataSource.getRepository(ClockIn);
  }

  async createClockIn(code: string): Promise<ClockIn | UpdateResult> {
    const start_clock_in = await this.clock_in_repository
      .createQueryBuilder('Clock_In')
      .where(`DATE_TRUNC('day', "start_date") = :date`, { date: new Date() })
      .andWhere('end_date IS NULL')
      .getOne();
    if (start_clock_in != null) {
      return await this.clock_in_repository.update({ id: start_clock_in.id }, { end_date: new Date() });
    }
    const clock_in = this.clock_in_repository.create({
      user_id: code,
      start_date: new Date(),
    });
    return await this.clock_in_repository.save(clock_in);
  }

  async getNewestClockIns(code: string): Promise<ClockIn[] | null> {
    return await this.clock_in_repository
      .createQueryBuilder('Clock_In')
      .where(`DATE_TRUNC('day', "start_date") < :date`, { date: new Date() })
      .andWhere(`user_id =: id`, { id: code })
      .take(10)
      .getMany();
  }

  async getTodayClockIn(code: string): Promise<ClockIn | null> {
    return await this.clock_in_repository
      .createQueryBuilder('Clock_In')
      .where(`DATE_TRUNC('day', "start_date") = :date`, { date: new Date() })
      .getOne();
  }
}
