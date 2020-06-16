import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Recipe } from "./interfaces/recipe.interface";
import { CreateRecipeDTO } from "./dto/create-recipe.dto";
import { FilterRecipeDTO } from "./dto/filter-recipe.dto";

@Injectable()
export class RecipeService {
  constructor(@InjectModel("Recipe") private readonly recipeModel: Model<Recipe>) {}

  async filterRecipes(filter: FilterRecipeDTO): Promise<Recipe[]> {
    let recipes = await this.allRecipes();
    const { category, search } = filter;

    if (search) {
      recipes = recipes.filter(
        recipe => recipe.title.includes(search) || recipe.description.includes(search),
      );
    }

    if (category) {
      recipes = recipes.filter(recipe => recipe.category === category);
    }

    return recipes;
  }

  async addRecipe(createRecipeDTO: CreateRecipeDTO): Promise<Recipe> {
    const newRecipe = await this.recipeModel(createRecipeDTO);
    return newRecipe.save();
  }

  async allRecipes(): Promise<Recipe[]> {
    const recipes = await this.recipeModel.find().exec();
    return recipes;
  }

  async aRecipe(recipeID: string): Promise<Recipe> {
    const recipe = await this.recipeModel.findById(recipeID).exec();
    return recipe;
  }

  async updateRecipe(recipeID: string, createRecipeDTO: CreateRecipeDTO): Promise<Recipe> {
    const updatedRecipe = await this.recipeModel.findByIdAndUpdate(recipeID, createRecipeDTO, {
      new: true,
    });
    return updatedRecipe;
  }

  async deleteRecipe(recipeID: string): Promise<any> {
    const deletedRecipe = await this.recipeModel.findByIdAndRemove(recipeID);
    return deletedRecipe;
  }
}
