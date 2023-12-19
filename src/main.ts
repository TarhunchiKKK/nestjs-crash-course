import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { LoggerMiddleware } from './middleware/logger.middleware'
import { ForbiddenException } from './exceptions/forbiddend.exception'
import { ForbiddenExceptionFilter } from './middleware/filters/forbidden-exception.filter'
import { RolesGuard } from './middleware/guards/roles.guard'
import { LoggingInterceptor } from './middleware/interceptors/logging.interceptor'
import { ValidationPipe } from '@nestjs/common'
import * as compression from 'compression'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    // сделать промежуточное ПО глобальным
    // app.use(LoggerMiddleware)

    // сделать фильтр исключений глобальным
    // app.useGlobalFilters(new ForbiddenExceptionFilter())

    // сделать канал глобальным
    // app.useGlobalPipes(new ValidationPipe())

    // сделать защитник глобальным
    // app.useGlobalGuards(new RolesGuard())

    // сделать перехватчик глобальным
    // app.useGlobalInterceptors(new    LoggingInterceptor())

    app.useGlobalPipes(new ValidationPipe())

    // использовать сжатие gzip для тела ответа
    app.use(compression())

    await app.listen(3000)
}
bootstrap()
