import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule'

@Injectable()
export class SchedulingService {
    private readonly logger = new Logger(SchedulingService.name)

    // метод срабатывает на каждой 45 секунде
    // время срабатывания в формате "second minute hour day_of_month month day_of_week"
    @Cron('45 * * * * *')
    handleCron() {
        this.logger.debug('Called when the current second is 45')
    }

    @Cron(CronExpression.EVERY_30_SECONDS)
    handleCron2() {
        this.logger.debug('Called every 30 seconds')
    }

    // вывод в консоль каждые 1000 миллисекунд
    @Interval(1000)
    handleInterval() {
        this.logger.debug('Interval 1000')
    }

    // выполнить действие спустя 5000 миллисекунд после старта сервера
    @Timeout(5000)
    handleTimeout() {
        this.logger.debug('Application starts 5000 ms ago')
    }
}
