import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { RecipeModule } from './recipe/recipe.module';
import { CronTaskService } from './cron-task/cron-task.service';


@Module({
  imports: [
    RecipeModule, ScheduleModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost/recipe-app',
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }),
  ],
  controllers: [AppController],
  providers: [AppService, CronTaskService],
})
export class AppModule {}
