import { Body, Controller, Get, HttpException, HttpStatus, Post, Put, Redirect, Req, UseFilters } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Request } from 'express';
import { CreateCatDto } from './dto/create-cat.dto';
import { ICat } from './interfaces/cat.interface';
import { ForbiddenException } from 'src/exceptions/forbiddend.exception';
import { ForbiddenExceptionFilter } from 'src/middleware/filters/forbidden-exception.filter';

@Controller('cats')
export class CatsController {
    constructor(private readonly catsService: CatsService) {}

    @Get()
    public async findAll(@Req() request: Request): Promise<ICat[]> {
        return this.catsService.findAll()
    }

    @Post()
    public async create(@Body() createCatDto: CreateCatDto) {
        this.catsService.create(createCatDto)
    }

    @Get('redirect')
    @Redirect('https://nestjs.com', 301)
    public redirect(): void {}

    @Put()
    @UseFilters(ForbiddenExceptionFilter)
    public exception() {
        throw new ForbiddenException('It is forbidden for you')
    }
}
