import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RecipeModule } from "./recipe/recipe.module";
import { ScheduleModule } from "@nestjs/schedule";
import { UploadsModule } from "./uploads/uploads.module";
import { UsersModule } from "./users/users.module";
// import { CronTaskService } from './cron-task/cron-task.service';

@Module({
  imports: [
    RecipeModule,
    ScheduleModule.forRoot(),
    MongooseModule.forRoot("mongodb://localhost/recipe-app", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }),
    UploadsModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
