import { type Repository } from 'typeorm';

import { AppDataSource } from '../../../config/typeorm';
import { type CreateUserDTO } from '../dtos/create-user.dto';
import { Users } from '../entities/users.entity';

export class UsersRepository {
  users_repository: Repository<Users>;
  constructor() {
    this.users_repository = AppDataSource.getRepository(Users);
  }

  async create(data: CreateUserDTO): Promise<Users> {
    const user = this.users_repository.create(data);
    return await this.users_repository.save(user);
  }

  async find(code: string): Promise<Users | null> {
    return await this.users_repository.findOne({ where: { code } });
  }
}
