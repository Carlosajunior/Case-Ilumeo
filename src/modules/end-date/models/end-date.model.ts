import { type DefaultModel } from '../../common/shared/models/default.model';

export type EndDateModel = DefaultModel & {
  date: Date;
  user_id: string;
};
