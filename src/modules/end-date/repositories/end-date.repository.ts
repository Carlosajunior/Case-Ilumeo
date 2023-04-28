import { type Repository } from 'typeorm';

import { AppDataSource } from '../../../config/typeorm';
import { type CreateEndDateDTO } from '../dtos/create-end-date.dto';
import { type GetEndDateDTO } from '../dtos/get-end-date.dto';
import { EndDate } from '../entities/end-date.entity';

export class EndDateRepository {
  end_date_repository: Repository<EndDate>;
  constructor() {
    this.end_date_repository = AppDataSource.getRepository(EndDate);
  }

  async create(data: CreateEndDateDTO): Promise<EndDate> {
    const end_date = this.end_date_repository.create(data);
    return await this.end_date_repository.save(end_date);
  }

  async getDate(data: GetEndDateDTO): Promise<EndDate | null> {
    return await this.end_date_repository.findOne({
      where: {
        user_id: data.code,
      },
    });
  }
}
