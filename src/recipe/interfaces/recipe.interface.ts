import { Document } from "mongoose";
import FactoryBot from "../../../test/FactoryBot";
import { lorem } from "faker/locale/pt_BR"

export interface Recipe extends Document {
  title: string;
  description: string;
  category: string;
  ingredients: Array<string>;
  instructions: string;
}

const createRecipe = function(): Recipe {
  return {
    title: lorem.word(),
    description: lorem.words(8),
    category: lorem.words(1),
    ingredients: lorem.words(5).split(' '),
    instructions: lorem.paragraphs(2)
  }
}

export const recipeFactory = new FactoryBot(createRecipe);
