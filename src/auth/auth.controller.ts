import * as jwt from "jsonwebtoken";
import { AuthGuard } from "./guards/auth.guard";
import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service";
import {
  Body,
  Controller,
  Post,
  HttpException,
  UseGuards,
} from "@nestjs/common";

interface AuthInterface {
  email: string;
  password: string;
}

@Controller("auth")
export class AuthController {
  constructor(private auth: AuthService, private users: UsersService) {}

  @Post("/sign_in")
  async createUser(@Body("authCred") authCred: AuthInterface) {
    const { email, password } = authCred;
    const user = await this.auth.createUser(email, password).catch(err => {
      throw new HttpException(`${err}`, 422);
    });
    const { uid, nickname } = user;
    const token = await this.users.token.create({
      data: {
        usertoken: jwt.sign({ uid, nickname }, process.env.SECRET),
      },
    });
    return { user, token };
  }

  @Post("/login")
  @UseGuards(AuthGuard)
  async login(@Body("authCred") authCred: AuthInterface) {
    const { email } = authCred;
    const user = await this.users.users.findOne({ where: { email } });
    const { uid, nickname } = user;
    return {
      accessToken: jwt.sign({ uid, nickname }, process.env.SECRET),
      data: { uid, nickname },
    };
  }
}

// Test data -- Don't be dumb to use your birthday as a real password
// email: andre@luiz.com
// password: 17061992
// email: andre2@luiz.com
// password: 19920617
// email: andre3@luiz.com
// password: Jun17,1992
