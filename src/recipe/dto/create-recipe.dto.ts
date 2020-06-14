import { IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRecipeDTO {

  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    required: false
  })
  description: string;
  
  @ApiProperty()
  @IsNotEmpty()
  category: string;
  
  @ApiProperty({ type: [String] })
  ingredients: Array<string>;
  
  @ApiPropertyOptional()  
  instructions: string;
}