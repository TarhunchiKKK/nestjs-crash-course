import {
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod,
} from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CatsModule } from './cats/cats.module'
import { LoggerMiddleware } from './middleware/logger.middleware'
import { CatsController } from './cats/cats.controller'
import { ConfigModule } from '@nestjs/config'
import { CacheModule } from '@nestjs/cache-manager'
import { CachingModule } from './caching/caching.module'
import { SerializationModule } from './serialization/serialization.module'
import { SchedulingModule } from './scheduling/scheduling.module'
import { EventModule } from './event/event.module'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { FileModule } from './file/file.module'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'

@Module({
    imports: [
        CatsModule,
        CacheModule.register(), // подключение пакета cache
        ConfigModule.forRoot({
            isGlobal: true, // сделать модуль глобальным
        }),
        CachingModule,
        SerializationModule,
        SchedulingModule,
        EventModule,
        EventEmitterModule.forRoot({
            // подключение модуля для работы с событиями
            wildcard: false,
            delimiter: '.',
        }),
        FileModule,
        AuthModule,
        UsersModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .exclude({ path: 'cats', method: RequestMethod.POST })
            .forRoutes(CatsController)
    }
}
