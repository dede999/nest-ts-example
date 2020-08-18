import { AuthService } from "../auth.service";
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

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
