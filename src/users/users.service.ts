import UserInterface from "./user.interface";
import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class UsersService extends PrismaClient {
  constructor() {
    super();
  }

  async findUser(email: string): Promise<UserInterface> {
    return await this.users.findOne({
      where: {
        email: email,
      },
    });
  }
}
