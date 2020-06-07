import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipeService } from './recipe.service';
import { RecipeSchema } from './schemas/recpie.schema';
import { RecipeController } from './recipe.controller';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Recipe', schema: RecipeSchema }])
  ],
  controllers: [RecipeController],
  providers: [RecipeService]
})
export class RecipeModule {}
