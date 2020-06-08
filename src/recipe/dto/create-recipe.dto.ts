import { IsNotEmpty } from 'class-validator';

export class CreateRecipeDTO {

  @IsNotEmpty()
  title: string;

  description: string;
  
  @IsNotEmpty()
  category: string;
  
  ingredients: Array<string>;
  
  instructions: string;
}