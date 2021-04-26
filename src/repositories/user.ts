import {User, UserDTO} from "../entities/user";
import {AbstractRepository} from "./abstract";
import {IDBClient} from "../db/client";
import {getProcessedError} from "./utils";

export interface IUserRepository {
  getUser(username: string): Promise<User>
}

export class UserRepository extends AbstractRepository {
  constructor(dbClient: IDBClient) {
    super(dbClient);
  }

  async getUser(username: string): Promise<User> {
    let userDTO: UserDTO;

    try {
      userDTO = await this.getEntityManager().findOne(UserDTO, {username});
    } catch (error) {
      throw getProcessedError(error);
    }

    if (userDTO == null) {
      return null;
    }
    return userDTO.toEntity();

  }
}
