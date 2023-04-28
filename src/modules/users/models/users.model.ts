import { type DefaultModel } from '../../common/shared/models/default.model';

export type UserModel = DefaultModel & {
  code: string;
};
