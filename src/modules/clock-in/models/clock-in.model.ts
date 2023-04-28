import { type DefaultModel } from '../../common/shared/models/default.model';

export type ClockInModel = DefaultModel & {
  start_date: Date;
  end_date: Date;
  user_id: string;
};
