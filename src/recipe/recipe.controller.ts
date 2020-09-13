import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { CreateRecipeDTO } from "./dto/create-recipe.dto";
import { FilterRecipeDTO } from "./dto/filter-recipe.dto";
import { RecipeService } from "./recipe.service";

@Controller("recipe")
export class RecipeController {
  constructor(private recipeService: RecipeService) {}

  @Post("/new")
  @UsePipes(ValidationPipe)
  async addRecipe(@Body() createRecipeDTO: CreateRecipeDTO) {
    return await this.recipeService.addRecipe(createRecipeDTO);
  }

  @Get("/all")
  async allRecipes(@Query() filters: FilterRecipeDTO = {}) {
    return this.recipeService.filterRecipes(filters);
  }

  @Get("/:recipeID")
  async someRecipe(@Param("recipeID") recipeID: string) {
    return await this.recipeService.aRecipe(recipeID);
  }

  @Put("/:recipeID/update")
  async updateRecipe(
    @Param("recipeID") recipeID,
    @Body() createRecipeDTO: CreateRecipeDTO,
  ) {
    return await this.recipeService.updateRecipe(recipeID, createRecipeDTO);
  }

  @Delete("/:recipeID/delete")
  async deleteRecipe(@Param("recipeID") recipeID) {
    return await this.recipeService.deleteRecipe(recipeID);
  }
}
