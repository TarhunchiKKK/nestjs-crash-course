import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { ForbiddenException } from './exceptions/forbiddend.exception';
import { ForbiddenExceptionFilter } from './middleware/filters/forbidden-exception.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    
    // сделать промежуточное ПО глобальным
    // app.use(LoggerMiddleware)                            

    // сделать фильтр исключений глобальным
    // app.useGlobalFilters(new ForbiddenExceptionFilter()) 
    await app.listen(3000);
}
bootstrap();
