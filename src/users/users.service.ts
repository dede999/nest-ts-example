import UserInterface from "./user.interface";
import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class UsersService extends PrismaClient {
  constructor() {
    super();
  }

  async findUserByEmail(email: string): Promise<UserInterface> {
    const allUsers = await this.findAll();
    return allUsers.find(user => user.email === email)
  }

  private async findAll(): Promise<UserInterface[]> {
    return await this.users.findMany();
  }
}
