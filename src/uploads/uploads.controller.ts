import { UploadsService } from './uploads.service';
import { Controller, Get } from '@nestjs/common';

@Controller('uploads')
export class UploadsController {
  constructor(private uploadService: UploadsService) {}

  @Get('/all')
  async allUploads() {
    return await this.uploadService.uploads.findMany()
  }
}
