import {
    Body,
    Controller,
    Delete,
    Get,
    ParseIntPipe,
    Patch,
    Post,
    Query,
} from '@nestjs/common'
import { CaslService } from './casl.service'
import { Article } from './entities/article.entity'

@Controller('casl')
export class CaslController {
    constructor(private readonly caslService: CaslService) {}

    @Get()
    getAllArticles(@Query('authorId', ParseIntPipe) authorId: number): Article[] {
        return this.caslService.getAllArticles(authorId)
    }

    @Post()
    addArticle(@Query('authorId', ParseIntPipe) authorId: number, @Body() article: Article): void {
        this.caslService.addArticle(authorId, article)
    }

    @Patch()
    updateArticle(@Query('authorId', ParseIntPipe) authorId: number, @Body() article: Article): void {
        this.caslService.updateArticle(authorId, article)
    }

    @Delete()
    deleteArticle(@Query('authorId', ParseIntPipe) authorId: number, @Query('articleId', ParseIntPipe) articleId: number): void {
        this.caslService.deleteArticle(authorId, articleId)
    }
}
