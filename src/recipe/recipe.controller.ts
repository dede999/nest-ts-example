import { FilterRecipeDTO } from './dto/filter-recipe.dto';
import { Controller, Post, Body, Get, Param, NotFoundException, Put, Delete, Query } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDTO } from './dto/create-recipe.dto';


@Controller('recipe')
export class RecipeController {
  constructor(private recipeService: RecipeService) {}

  @Post('/new')
  async addRecipe(@Body() createRecipeDTO: CreateRecipeDTO) {
    const recipe = await this.recipeService.addRecipe(createRecipeDTO);
    return recipe;
  }

  @Get('/all')
  async allRecipes(@Query() filters: FilterRecipeDTO) {
    if(Object.keys(filters).length) {
      const filteredRecipes = this.recipeService.fiterRecipes(filters)
      return filteredRecipes;
    } else {
      const recipes = await this.recipeService.allRecipes();
      return recipes;
    }
  }

  @Get('/:recipeID')
  async someRecipe(@Param('recipeID') recipeID: string) {
    const recipe = await this.recipeService.aRecipe(recipeID)
    if(!recipe) throw new NotFoundException("Recipe does not exist")
    return recipe
  }

  @Put('/:recipeID/update')
  async updateRecipe(@Param('recipeID') recipeID, @Body() createRecipeDTO: CreateRecipeDTO) {
    const recipe = await this.recipeService.updateRecipe(recipeID, createRecipeDTO);
    if (!recipe) throw new NotFoundException('Recipe does not exist!');
    return recipe;
  }

  @Delete('/:recipeID/update')
  async deleteRecipe(@Param('recipeID') recipeID) {
    const recipe = await this.recipeService.deleteRecipe(recipeID);
    if (!recipe) throw new NotFoundException('Recipe does not exist!');
    return recipe;
  }
}
