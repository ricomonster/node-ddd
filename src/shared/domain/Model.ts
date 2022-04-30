import { Model, ModelClass as ObjectionModelClass } from 'objection';

// Models
import { UserModel } from '../../modules/user';

export interface ModelClass<M extends Model> extends ObjectionModelClass<M> {
  onConflictColumn?: string | string[]
}

export interface Models {
  userModel?: ModelClass<UserModel>
}
