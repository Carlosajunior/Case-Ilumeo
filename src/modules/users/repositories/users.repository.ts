import { type Repository } from 'typeorm';

import { AppDataSource } from '../../../config/typeorm';
import { type CreateUserDTO } from '../dtos/create-user.dto';
import { Users } from '../entities/users.entity';

export class UsersRepository {
  end_date_repository: Repository<Users>;
  constructor() {
    this.end_date_repository = AppDataSource.getRepository(Users);
  }

  async create(data: CreateUserDTO): Promise<Users> {
    const end_date = this.end_date_repository.create(data);
    return await this.end_date_repository.save(end_date);
  }
}
