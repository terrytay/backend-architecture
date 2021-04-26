import {Column, Entity, PrimaryColumn} from "typeorm";

export class User {
  username: string
  passwordHash: string

  constructor(username: string, passwordHash: string) {
    this.username = username;
    this.passwordHash = passwordHash;
  }

  public toDTO(): UserDTO {
    return new UserDTO(this.username, this.passwordHash);
  }
}

@Entity("user")
export class UserDTO {
  @PrimaryColumn({type: "character varying", name: "username"})
  username: string;

  @Column({type: "character varying", name: "password"})
  passwordHash: string;

  constructor(username: string, passwordHash: string) {
    this.username = username;
    this.passwordHash = passwordHash;
  }

  public toEntity(): User {
    return new User(this.username, this.passwordHash);
  }
}
