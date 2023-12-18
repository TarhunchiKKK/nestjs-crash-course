import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Inject,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Redirect,
    Req,
    Res,
    UseFilters,
    UseGuards,
    UseInterceptors,
    UsePipes,
} from '@nestjs/common'
import { CatsService } from './cats.service'
import { Request } from 'express'
import { CreateCatDto } from './dto/create-cat.dto'
import { ICat } from './interfaces/cat.interface'
import { ForbiddenException } from 'src/exceptions/forbiddend.exception'
import { ForbiddenExceptionFilter } from 'src/middleware/filters/forbidden-exception.filter'
import { createCatSchema } from 'src/schemas/create-cat.schema'
import { ZodValidationPipe } from 'src/middleware/pipes/zod-validation.pipe'
import { ValidationPipe } from 'src/middleware/pipes/validation.pipe'
import { RolesGuard } from 'src/middleware/guards/roles.guard'
import { Roles } from 'src/decorators/roles.decorator'
import { LoggingInterceptor } from 'src/middleware/interceptors/logging.interceptor'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'

@Controller('cats')
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor)
export class CatsController {
    constructor(private readonly catsService: CatsService) {}

    @Get()
    public async findAll(@Req() request: Request): Promise<ICat[]> {
        return this.catsService.findAll()
    }

    @Get(':id')
    public async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.catsService.findOne(id)
    }

    @Post()
    //@UsePipes(new ZodValidationPipe(createCatSchema))
    @Roles(['admin'])
    public async create(
        @Body(new ValidationPipe()) createCatDto: CreateCatDto,
    ) {
        this.catsService.create(createCatDto)
    }

    @Get('redirect')
    @Redirect('https://nestjs.com', 301)
    public redirect(): void {}

    @Get('exception')
    @UseFilters(ForbiddenExceptionFilter)
    public exception() {
        throw new ForbiddenException('It is forbidden for you')
    }
}
