import { Module } from '@nestjs/common'
import { SchedulingService } from './scheduling.service'
import { SchedulingController } from './scheduling.controller'
import { ScheduleModule } from '@nestjs/schedule'
import { DynamicSchedulingService } from './dynamic-scheduling.service'

@Module({
    imports: [ScheduleModule.forRoot()],
    controllers: [SchedulingController],
    providers: [SchedulingService, DynamicSchedulingService],
})
export class SchedulingModule {}
