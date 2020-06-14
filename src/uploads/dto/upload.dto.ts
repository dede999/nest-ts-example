import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUploadDTO {

  @ApiProperty()
  @IsNotEmpty()
  title: string
}