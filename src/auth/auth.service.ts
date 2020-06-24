import * as bcrypt from "bcrypt";
import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async validateUser(email: string, password: string): Promise<any> {
    await this.userService
      .findUser(email)
      .then(user => {
        if (bcrypt.compareSync(password, user.password)) {
          return user;
        } else {
          throw new Error("Wrong Password");
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
}
