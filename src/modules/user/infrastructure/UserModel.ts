// Attributes
import { UserAttributes } from '../domain/User';

// Base class
import { BaseModel } from '../../../shared/infrastructure/BaseModel';

class UserModel extends BaseModel implements UserAttributes {
  public name?: string;
  public email?: string;
  public password?: string;
  public images?: Record<string, string>;

  /**
   * Table name of the model.
   */
  static tableName = 'users';

  /**
   * Column name to be used for on constraint inserts/update.
   */
  static onConflictColumn = 'email';

  /**
   * Model relation mappings and setup.
   */
  static relationMappings = {};
}

export default UserModel;
