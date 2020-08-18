import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Token } from "../token";

@Injectable()
export class TokenGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    if (!authorization) {
      throw new HttpException("No given token", HttpStatus.FORBIDDEN);
    } else {
      const [title, token] = authorization.split(" ");
      if (title === "Bearer") {
        const decodedTokenObject = await Token.check(token);
        if (decodedTokenObject.uuid) return true;
        throw new HttpException("", HttpStatus.UNAUTHORIZED);
      }
      throw new HttpException("Invalid Header", HttpStatus.BAD_REQUEST);
    }
  }
}
