import { type DefaultModel } from '../../common/shared/models/default.model';

export type StartDateModel = DefaultModel & {
  date: Date;
  user_id: string;
};
