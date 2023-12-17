import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { ForbiddenException } from './exceptions/forbiddend.exception';
import { ForbiddenExceptionFilter } from './middleware/filters/forbidden-exception.filter';
import { ValidationPipe } from './middleware/pipes/validation.pipe';
import { RolesGuard } from './middleware/guards/roles.guard';
import { LoggingInterceptor } from './middleware/interceptors/logging.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    
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
    await app.listen(3000);
}
bootstrap();
