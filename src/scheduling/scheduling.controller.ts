import { Body, Controller, Get, Post } from '@nestjs/common'
import { SchedulingService } from './scheduling.service'
import { DynamicSchedulingService } from './dynamic-scheduling.service'

@Controller('scheduling')
export class SchedulingController {
    constructor(
        private readonly schedulingService: SchedulingService,
        private readonly dynamicSchdulingService: DynamicSchedulingService,
    ) {}

    // остановить выполнение задачи
    @Post('stop')
    stopNotifications() {
        this.dynamicSchdulingService.stopNotification()
    }

    // возобновить выполнение остановленной задачи
    @Post('start')
    startNotifications() {
        this.dynamicSchdulingService.startNotifications()
    }

    // получить время последнего выполнения задачи
    @Get('last')
    getLastDate() {
        return this.dynamicSchdulingService.getLastNotificationDate()
    }

    // получить даты следующих выполнений задачи
    @Get('next')
    getNextDates(@Body() { count }: { count: number }) {
        return this.dynamicSchdulingService.getNextNotificationsDates(count)
    }

    // создать новую задачу, которая будет выполняться на каждой 30 секунде
    @Post('add')
    addCronJob() {
        this.dynamicSchdulingService.addCronJob('newJob', 30)
    }

    // удалить задачуу по имени
    @Post('delete')
    deleteCronJob() {
        this.dynamicSchdulingService.deleteCronJob('newJob')
    }
}
