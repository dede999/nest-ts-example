import { Module } from "@nestjs/common";
import { UploadsService } from "./uploads.service";
import { UploadsController } from "./uploads.controller";
import { MulterModule } from "@nestjs/platform-express";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [
    MulterModule.register({
      dest: "./files",
    }),
    AuthModule,
  ],
  providers: [UploadsService],
  controllers: [UploadsController],
})
export class UploadsModule {}

// To install
// multer-s3 and aws-sdk
