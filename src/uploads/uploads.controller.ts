import { UploadsService } from './uploads.service';
import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('uploads')
export class UploadsController {
  constructor(private uploadService: UploadsService) {}

  @Get('/all')
  async allUploads() {
    return await this.uploadService.uploads.findMany()
  }

  @Post('/new')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() upFile) {
    return await this.uploadService.uploads.create({
      data: {
        path: upFile.filename,
        title: upFile.originalname
      }
    })
  }

  @Get('/:file')
  showFile(@Param('file') file, @Res() resp) {
    // console.log(__dirname);
    resp.sendFile(file, { root: "./files" })
  }
}
