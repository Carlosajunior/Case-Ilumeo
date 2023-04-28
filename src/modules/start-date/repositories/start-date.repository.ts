import { type Repository } from 'typeorm';

import { AppDataSource } from '../../../config/typeorm';
import { type CreateStartDateDTO } from '../dtos/create-start-date.dto';
import { type GetStartDateDTO } from '../dtos/get-start-date.dto';
import { StartDate } from '../entities/start-date.entity';

export class StartDateRepository {
  end_date_repository: Repository<StartDate>;
  constructor() {
    this.end_date_repository = AppDataSource.getRepository(StartDate);
  }

  async create(data: CreateStartDateDTO): Promise<StartDate> {
    const end_date = this.end_date_repository.create(data);
    return await this.end_date_repository.save(end_date);
  }

  async getDate(data: GetStartDateDTO): Promise<StartDate | null> {
    return await this.end_date_repository.findOne({
      where: {
        user_id: data.code,
      },
    });
  }
}
