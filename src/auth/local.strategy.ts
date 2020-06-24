import UserInterface from "src/users/user.interface";
import { AuthService } from "./auth.service";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private auth: AuthService) {
    super();
  }

  validate(user: UserInterface, password: string): boolean {
    return this.auth.validateUser(user, password);
  }
}
