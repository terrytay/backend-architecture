import {User} from "../entities/user";
import {IUserRepository} from "../repositories/user";

export interface IUserService {
  getUser(username: string): Promise<User>;
}

export class UserService implements IUserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async getUser(username: string): Promise<User> {
    return await this.userRepository.getUser(username);
  }
}
