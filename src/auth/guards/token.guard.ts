import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { AuthService } from "../auth.service";

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private auth: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    if (!authorization) {
      throw new HttpException("No given token", HttpStatus.FORBIDDEN);
    } else {
      const [title, token] = authorization.split(" ");
      if (title === "Bearer") {
        this.auth.validateToken(token);
        return true;
      }
      throw new HttpException("Invalid Token", HttpStatus.BAD_REQUEST);
    }
  }
}
