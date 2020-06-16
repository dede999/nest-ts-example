import { Injectable, Logger } from "@nestjs/common";
import { Cron, SchedulerRegistry, Timeout, Interval } from "@nestjs/schedule";
const minuteMiliseconds = 60000;

@Injectable()
export class CronTaskService {
  constructor(private schedulerRegistry: SchedulerRegistry) {}
  private readonly logger = new Logger(CronTaskService.name);

  loggingTime(text = "", locale = "en-US") {
    this.logger.verbose(`${text} ${new Date().toLocaleTimeString(locale)}`);
  }

  @Cron("15,45 * * * * *", {
    name: "first",
  })
  logFifteenFortyFive() {
    this.loggingTime("15 or 45 seconds:");
  }

  @Interval(minuteMiliseconds)
  // @Cron(CronExpression.EVERY_MINUTE)  -> equivalent
  logInAMinute() {
    this.loggingTime("Another Minute:");
  }

  @Timeout(2 * minuteMiliseconds)
  turnFirstOff() {
    const job = this.schedulerRegistry.getCronJob("first");
    this.logger.debug("First task stopped");
    job.stop();
  }

  @Timeout(3 * minuteMiliseconds)
  turnFirstOn() {
    const job = this.schedulerRegistry.getCronJob("first");
    this.logger.debug("First task on again");
    job.start();
  }
}
