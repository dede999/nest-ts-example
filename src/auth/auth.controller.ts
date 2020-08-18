import { AuthGuard } from "./guards/auth.guard";
import { AuthService } from "./auth.service";
import { Token } from "./token";
import { UsersService } from "../users/users.service";
import {
  Body,
  Controller,
  Post,
  HttpException,
  UseGuards,
  Get,
} from "@nestjs/common";

interface AuthInterface {
  email: string;
  password: string;
}

@Controller("auth")
export class AuthController {
  constructor(private auth: AuthService, private users: UsersService) {}

  @Post("/sign_up")
  async createUser(@Body("authCred") authCred: AuthInterface) {
    const { email, password } = authCred;
    const user = await this.auth.createUser(email, password).catch(err => {
      throw new HttpException(`${err}`, 422);
    });
    const { uid, nickname } = user;
    const token = await Token.create(uid, nickname);
    return { user, token };
  }

  @Post("/login")
  @UseGuards(AuthGuard)
  async login(@Body("authCred") authCred: AuthInterface) {
    const { email } = authCred;
    const user = await this.users.users.findOne({ where: { email } });
    const { uid, nickname } = user;
    const token = await Token.create(uid, nickname);
    return {
      token,
      data: { uid, nickname },
    };
  }

  @Get("/token")
  async testToken() {
    const tk =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiZjI1ZGJlN2ItYzk3Yy00MTExLThkODktZTA3YzliZGIwZjRlIiwibmlja05hbWUiOiIiLCJpYXQiOjE1OTM3NjE4Mjh9.RsWVI_8QoORl23855OOw5bmjh_WjrQxRixrueEmfKoU";
    return await this.users.queryRaw(`SELECT * FROM is_token_valid($1);`, tk);
  }
}

// Test data -- Don't be dumb to use your birthday as a real password
// email: andre@luiz.com
// password: 17061992
// email: andre2@luiz.com
// password: 19920617
// email: andre3@luiz.com
// password: Jun17,1992
