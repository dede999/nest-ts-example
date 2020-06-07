export class CreateRecipeDTO {
  title: string;
  description: string;
  category: string;
  ingredients: Array<string>;
  instructions: string;
}