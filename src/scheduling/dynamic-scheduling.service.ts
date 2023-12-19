import { Injectable, Logger } from '@nestjs/common'
import { Cron, SchedulerRegistry } from '@nestjs/schedule'
// import { CronJob } from "cron";

// отсюда импортируется CronJob !!!!!!!
import { CronJob } from '@nestjs/schedule/node_modules/cron/dist/job'

@Injectable()
export class DynamicSchedulingService {
    private logger = new Logger(DynamicSchedulingService.name)

    constructor(private schedulerRegistry: SchedulerRegistry) {}

    // на каждой 5 секунде бедт вывод в консоль
    @Cron('5 * * * * *', {
        name: 'notification',
    })
    handleNotification() {
        this.logger.debug('Notification')
    }

    // остановить выполнение задачи
    stopNotification() {
        const job = this.schedulerRegistry.getCronJob('notification')
        job.stop()
        this.logger.debug('Stop notifications')
    }

    // возобновить выполнение остановленной задачи
    startNotifications() {
        const job = this.schedulerRegistry.getCronJob('notification')
        job.start()
        this.logger.debug('Start notifications')
    }

    // получить время последнего выполнения задачи
    getLastNotificationDate(): Date {
        const job = this.schedulerRegistry.getCronJob('notification')
        return job.lastDate()
    }

    // получить даты следующих выполнений задачи
    getNextNotificationsDates(count: number) {
        const job = this.schedulerRegistry.getCronJob('notification')
        return job.nextDates(count)
    }

    // создать новую задачу, которая будет выполняться на каждой 30 секунде
    addCronJob(name: string, seconds: number) {
        const job = new CronJob(`${seconds} * * * * *`, () => {
            this.logger.warn(`time (${seconds}) for job ${name} to run!`)
        })

        this.schedulerRegistry.addCronJob(name, job)
        job.start()
    }

    // удалить задачу по имени
    deleteCronJob(name: string) {
        this.schedulerRegistry.deleteCronJob(name)
    }
}
