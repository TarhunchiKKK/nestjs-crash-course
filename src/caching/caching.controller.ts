import {
    Body,
    Controller,
    Delete,
    Get,
    Inject,
    Patch,
    Post,
    UseInterceptors,
} from '@nestjs/common'
import { CachingService } from './caching.service'
import {
    CACHE_MANAGER,
    CacheInterceptor,
    CacheKey,
    CacheTTL,
} from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'
import { HttpCacheInterceptor } from './http-cache.interceptor'

@Controller('caching')
export class CachingController {
    constructor(@Inject(CACHE_MANAGER) private cache: Cache) {}

    @Get('auto')
    @UseInterceptors(HttpCacheInterceptor)
    // @CacheKey('auto')
    @CacheTTL(20000)
    public autocache(@Body() data: any) {
        return data
    }

    @Get('all')
    public async getAllCahche() {
        return await this.cache.store
    }

    // получить значение ключа из кэша
    @Get()
    public async getCahce(@Body() { data }: { data: string }) {
        return await this.cache.get(data)
    }

    // добавить значение в кэш
    @Post()
    public async setCache(@Body() { data }: { data: string }) {
        await this.cache.set('data', data, 0)
    }

    // удалить значение ключа из кэша
    @Delete()
    public async deleteKey(@Body() { data }: { data: string }) {
        await this.cache.del(data)
    }

    // очистить кэш
    @Patch()
    public async resetCache() {
        await this.cache.reset()
    }
}
