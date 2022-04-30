import { ModelClass } from '../../shared/domain/Model';

// Application
import CreateUser from './application/CreateUser';

// Infrastructure
import UserModel from './infrastructure/UserModel';
import UserRepository from './infrastructure/UserRepository';

interface UserRegistry {
  createUser: CreateUser;
  userModel: ModelClass<UserModel>;
  userRepository: UserRepository
}

export type { UserRegistry };
export {
  CreateUser,
  UserModel,
  UserRepository,
};
