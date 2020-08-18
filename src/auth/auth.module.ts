import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { Module } from "@nestjs/common";
import { UsersModule } from "./../users/users.module";

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.SECRET || "Not_so_secret_key",
      signOptions: { expiresIn: "1h" },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
