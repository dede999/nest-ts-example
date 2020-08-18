import { UsersService } from "./users.service";
import { Test } from "@nestjs/testing";
import { internet } from "faker/locale/pt_BR";
import { userFactory } from "./user.interface";

describe("UserService", () => {
  let userService: UsersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    userService = moduleRef.get<UsersService>(UsersService);
  });

  describe("findUserByEmail", () => {

    describe("when the user exists",() => {
      const user = userFactory()

      beforeEach(() => {
        userService.users.findMany = jest.fn().mockResolvedValue([user])
      })

      it("is expected to find the user", async () => {
        expect(await userService.findUserByEmail(user.email)).toBe(user)
      })
    })

    describe("when the user does not exist", () => {
      beforeEach(() => {
        userService.users.findMany = jest.fn().mockResolvedValue([])
      })

      it("is expected not to find any user", async () => {
        expect(await userService.findUserByEmail(internet.email())).toBeUndefined()
      })
    })
  })
})
