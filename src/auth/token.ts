import * as jwt from "jsonwebtoken";
import { PrismaClient, token } from "@prisma/client";

export class Token {
  private static repo = new PrismaClient().token;
  private static query = new PrismaClient();

  static async create(uuid: string, nickName: string): Promise<token> {
    return await Token.repo.create({
      data: {
        usertoken: jwt.sign({ uuid, nickName }, process.env.SECRET),
      },
    });
  }

  static async check(token: string): Promise<any> {
    const [result] = await Token.query.queryRaw(
      `SELECT * FROM is_token_valid('${token}');`,
    );
    if (result.is_token_valid) {
      try {
        return jwt.verify(token, process.env.SECRET);
      } catch (err) {
        console.log(err);
        await Token.repo.update({
          where: { usertoken: token },
          data: { isvalid: false },
        });
        return {};
      }
    }
    return {};
  }
}
