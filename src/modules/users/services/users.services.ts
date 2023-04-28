/* eslint-disable no-useless-catch */
import { type Users } from '../entities/users.entity';
import { UsersRepository } from '../repositories/users.repository';

export class UserServices {
  private readonly usersRepository: UsersRepository;
  constructor() {
    this.usersRepository = new UsersRepository();
  }

  async createUser(code: string): Promise<Users> {
    try {
      return await this.usersRepository.create({ code });
    } catch (error) {
      throw error;
    }
  }
}
