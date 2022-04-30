import { ModelClass } from 'objection';

// Base Repository
import { BaseRepository } from '../../../shared/infrastructure/BaseRepository';

// Container
import { ContainerRegistry } from '../../../shared/domain/Container';

// Attributes
import { UserAttributes } from '../domain/User';

// Model
import User from './UserModel';

class UserRepository extends BaseRepository<User, UserAttributes> {
  constructor(container: ContainerRegistry) {
    super(container?.userModel as ModelClass<User>);
  }
}

export default UserRepository;
