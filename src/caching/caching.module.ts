import { Module } from '@nestjs/common'
import { CachingService } from './caching.service'
import { CachingController } from './caching.controller'
import { CacheModule } from '@nestjs/cache-manager'

@Module({
    imports: [
        CacheModule.register({
            ttl: 60, // срок действия закэшированного объекта
            max: 10, // максимальный размер кэша
        }),
    ],
    controllers: [CachingController],
    providers: [CachingService],
})
export class CachingModule {}
