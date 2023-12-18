import { Module } from '@nestjs/common'
import { SerializationService } from './serialization.service'
import { SerializationController } from './serialization.controller'

@Module({
    controllers: [SerializationController],
    providers: [SerializationService],
})
export class SerializationModule {}
