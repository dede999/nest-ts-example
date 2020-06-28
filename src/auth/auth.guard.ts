import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { email, password } = request.body.authCred;
    try {
      const resp = await this.auth.logInUser(email, password);
      return resp;
    } catch (error) {
      console.log(error);
    }
  }
}
