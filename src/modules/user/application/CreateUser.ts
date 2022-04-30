// Interface
import { Application } from '../../../shared/domain/Application';
import { ContainerRegistry } from '../../../shared/domain/Container';

// Domain
import { UserAttributes } from '../domain/User';

interface CreateUserOptions {
  name?: string;
  email?: string;
  password?: string;
}

class CreateUser implements Application {
  protected userRepository;

  constructor(container: ContainerRegistry) {
    this.userRepository = container.userRepository;
  }

  public start(user: CreateUserOptions): Promise<UserAttributes> {
    return this.userRepository.create(user);
  }
}

export type { CreateUserOptions };
export default CreateUser;
