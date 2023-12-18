import { CacheInterceptor } from '@nestjs/cache-manager'
import { ExecutionContext, Injectable } from '@nestjs/common'

// этот перехватчик сохраняет возвращаемое значение в кэщ под ключом 'key'
// для генерации ключа можно использовать также request URL
@Injectable()
export class HttpCacheInterceptor extends CacheInterceptor {
    protected trackBy(context: ExecutionContext): string {
        return 'key'
    }
}
