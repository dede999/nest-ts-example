import { AuthService } from "./auth.service";
import {
  Body,
  Controller,
  Post,
  HttpException,
  UseGuards,
  HttpCode,
} from "@nestjs/common";
import { AuthGuard } from "./auth.guard";

interface AuthInterface {
  email: string;
  password: string;
}

@Controller("auth")
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post("/sign_in")
  async createUser(@Body("authCred") authCred: AuthInterface) {
    const { email, password } = authCred;
    const user = await this.auth.createUser(email, password).catch(err => {
      throw new HttpException(`${err}`, 422);
    });
    return user;
  }

  @HttpCode(200)
  @Post("/login")
  @UseGuards(AuthGuard)
  async login(@Body("authCred") authCred: AuthInterface) {
    console.log(`Got to the request`);

    // const { email, password } = authCred;
    // const user = await this.auth.validateUser(email, password);

    return authCred;
  }
}

// Test data -- Don't be dumb to use your birthday as a real password
// email: andre@luiz.com
// password: 17061992
// email: andre2@luiz.com
// password: 19920617
// email: andre3@luiz.com
// password: Jun17,1992
