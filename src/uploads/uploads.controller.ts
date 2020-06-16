import { UploadsService } from "./uploads.service";
import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
  Body,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";

@Controller("uploads")
export class UploadsController {
  constructor(private uploadService: UploadsService) {}

  @Get("/all")
  async allUploads() {
    return await this.uploadService.uploads.findMany();
  }

  @Post("/new")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./files",
        filename: (_, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() upFile, @Body("title") title: string) {
    return await this.uploadService.uploads.create({
      data: {
        path: upFile.originalname,
        title: title || upFile.originalname,
      },
    });
  }

  @Get("/:file")
  showFile(@Param("file") file, @Res() resp) {
    // console.log(__dirname);
    resp.sendFile(file, { root: "./files" });
  }
}
