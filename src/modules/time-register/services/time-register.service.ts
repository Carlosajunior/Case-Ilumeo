/* eslint-disable no-useless-catch */
import { type UpdateResult } from 'typeorm';

import { type ClockIn } from '../../turn-shift/entities/clock-in.entity';
import { ClockInRepository } from '../../turn-shift/repositories/clock-in.repository';
import { UsersRepository } from '../../users/repositories/users.repository';
import { type GetHoursDTO } from '../dtos/get-hours.dto';

export class TimeRegisterService {
  clockInRepository: ClockInRepository;
  userRepository: UsersRepository;

  constructor() {
    this.clockInRepository = new ClockInRepository();
    this.userRepository = new UsersRepository();
  }

  async startShift(code: string): Promise<ClockIn | UpdateResult> {
    try {
      return await this.clockInRepository.createClockIn(code);
    } catch (error) {
      throw error;
    }
  }

  async endShift(code: string): Promise<ClockIn | UpdateResult> {
    try {
      return await this.clockInRepository.createClockIn(code);
    } catch (error) {
      throw error;
    }
  }

  async getHours(code: string): Promise<any[] | null> {
    try {
      const clockIns = await this.clockInRepository.getNewestClockIns(code);
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
      return null;
    } catch (error) {
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
