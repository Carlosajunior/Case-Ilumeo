/* eslint-disable no-useless-catch */
import { type UpdateResult } from 'typeorm';

import { UsersRepository } from '../../users/repositories/users.repository';
import { type ClockIn } from '../entities/clock-in.entity';
import { ClockInRepository } from '../repositories/clock-in.repository';

export class ClockInService {
  private readonly clockInRepository: ClockInRepository;
  private readonly userRepository: UsersRepository;

  constructor() {
    this.clockInRepository = new ClockInRepository();
    this.userRepository = new UsersRepository();
  }

  async makeClockIn(code: string): Promise<ClockIn | UpdateResult | null> {
    try {
      const id = (await this.userRepository.find(code))?.id;
      if (id != null) return await this.clockInRepository.createClockIn(id);
      return null;
    } catch (error) {
      throw error;
    }
  }

  async getHours(code: string): Promise<any[] | null> {
    try {
      const id = (await this.userRepository.find(code))?.id;
      if (id != null) {
        const clockIns = await this.clockInRepository.getNewestClockIns(id);
        console.log(clockIns);
        if (clockIns != null) {
          const arrayClockInTimes = [];
          for await (const clockIn of clockIns) {
            const workTimeAndDate = {
              workTime: this.hourDiff(clockIn),
              date: clockIn.start_date.toLocaleDateString('pt-BR'),
            };
            arrayClockInTimes.push(workTimeAndDate);
          }
          return arrayClockInTimes;
        }
      }
      return null;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  hourDiff(clockIn: ClockIn): string {
    let minutes = (clockIn.end_date.getTime() - clockIn.start_date.getTime()) / 1000 / 60;
    const hours = minutes / 60;
    const rhours = Math.floor(hours);
    minutes = (hours - rhours) * 60;
    const rminutes = Math.round(minutes);
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return '' + rhours + 'h' + rminutes + 'm';
  }
}
