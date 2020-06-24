import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import UserInterface from "src/users/user.interface";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  validateUser(user: UserInterface, password: string): boolean {
    if (!user) throw new Error(`No given user`);
    return bcrypt.compareSync(password, user.password);
  }
}
