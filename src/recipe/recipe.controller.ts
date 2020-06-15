import { Body, Controller, Delete, Get, NotFoundException,
  Param, Post, Put, Query, UsePipes,ValidationPipe
} from '@nestjs/common';
import { CreateRecipeDTO } from './dto/create-recipe.dto';
import { FilterRecipeDTO } from './dto/filter-recipe.dto';
import { RecipeService } from './recipe.service';


@Controller('recipe')
export class RecipeController {
  constructor(private recipeService: RecipeService) {}

  @Post('/new')
  @UsePipes(ValidationPipe)
  async addRecipe(@Body() createRecipeDTO: CreateRecipeDTO) {
    return await this.recipeService.addRecipe(createRecipeDTO);
  }

  @Get('/all')
  async allRecipes(@Query() filters: FilterRecipeDTO) {
    if(Object.keys(filters).length) {
      return this.recipeService.filterRecipes(filters)
    } else {
      return await this.recipeService.allRecipes();
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

  @Delete('/:recipeID/delete')
  async deleteRecipe(@Param('recipeID') recipeID) {
    const recipe = await this.recipeService.deleteRecipe(recipeID);
    if (!recipe) throw new NotFoundException('Recipe does not exist!');
    return recipe;
  }
}
