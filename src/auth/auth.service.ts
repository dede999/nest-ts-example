import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JwtService } from "@nestjs/jwt";
import { users } from "@prisma/client";
import { UsersService } from "src/users/users.service";
import { v4 as uuid4 } from "uuid";
import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from "@nestjs/common";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Method to validate an user -- to be deprecated
   * @param email
   * @param password
   * @returns The correspondent user
   * @exception 401 if the given password is wrong
   * @exception 404 if problems happen when fetching user
   */
  async validateUser(email: string, password: string) {
    console.log(email, password);
    await this.userService
      .findUser(email)
      .then(user => {
        if (bcrypt.compareSync(password, user.password)) {
          delete user.password;
          return user;
        } else {
          throw new UnauthorizedException("Wrong password");
        }
      })
      .catch(error => {
        throw new NotFoundException(`Error when fetching user\n${error}`);
      });
  }

  /**
   * Method to validate an user
   * @param email
   * @param password
   * @returns if the credentials are valid
   * @exception 404 if problems happen when fetching user
   */
  async logInUser(email: string, password: string): Promise<boolean> {
    try {
      const user = await this.userService.findUser(email);
      return bcrypt.compareSync(password, user.password);
    } catch {
      throw NotFoundException;
    }
  }

  /**
   * Method to Create a new User
   * @param email
   * @param password
   * @returns The created user
   */
  async createUser(email: string, password: string): Promise<Partial<users>> {
    const hashedPassword = bcrypt.hashSync(password, 12);
    return await this.userService.users.create({
      data: {
        uid: uuid4(),
        email: email,
        password: hashedPassword,
      },
      select: {
        uid: true,
        email: true,
        nickname: true,
      },
    });
  }

  validateToken(auth: string): object | string {
    try {
      const decoded = jwt.verify(auth, process.env.SECRET);
      return decoded;
    } catch (err) {
      console.error(err);
    }
  }
}
