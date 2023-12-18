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

@Module({
    imports: [
        CatsModule,
        CacheModule.register(),
        ConfigModule.forRoot({
            isGlobal: true, // сделать модуль глобальным
        }),
        CachingModule,
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
