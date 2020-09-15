import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Recipe } from "./interfaces/recipe.interface";
import { CreateRecipeDTO } from "./dto/create-recipe.dto";
import { FilterRecipeDTO } from "./dto/filter-recipe.dto";

@Injectable()
export class RecipeService {
  constructor(
    @InjectModel("Recipe") private readonly recipeModel: Model<Recipe>,
  ) {}

  async filterRecipes(filter: FilterRecipeDTO = {}): Promise<Recipe[]> {
    let recipes = await this.allRecipes();
    const { category, search } = filter;

    if (search) {
      recipes = recipes.filter(
        recipe =>
          recipe.title.includes(search) || recipe.description.includes(search),
      );
    }

    if (category) {
      recipes = recipes.filter(recipe => recipe.category === category);
    }
    return recipes;
  }

  async addRecipe(createRecipeDTO: CreateRecipeDTO): Promise<Recipe> {
    return await this.recipeModel.create(createRecipeDTO);
  }

  async allRecipes(): Promise<Recipe[]> {
    return await this.recipeModel.find().exec();
  }

  async aRecipe(recipeID: string): Promise<Recipe> {
    return await this.recipeModel.findById(recipeID).exec();
  }

  async updateRecipe(
    recipeID: string,
    createRecipeDTO: CreateRecipeDTO,
  ): Promise<Recipe> {
    return await this.recipeModel.findByIdAndUpdate(recipeID, createRecipeDTO, {
      new: true,
    });
  }

  async deleteRecipe(
    recipeID: string,
  ): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.recipeModel.remove({ recipeID });
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }
}
