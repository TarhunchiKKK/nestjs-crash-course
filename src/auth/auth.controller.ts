import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignInDto } from './dto/sign-in.dto'
import { AuthGuard } from './guards/auth.guard'
import { CreatePostDto } from './dto/create-post.dto'
import { Roles } from './decorators/roles.decorator'
import { Role } from './enums/role.enum'
import { RolesGuard } from './guards/roles.guard'

@Controller('auth')
export class AuthController {
    private posts = [
        {
            id: 1,
            content: 'a',
        },
        {
            id: 2,
            content: 'b',
        },
        {
            id: 3,
            content: 'c',
        },
        {
            id: 4,
            content: 'd',
        },
    ]

    constructor(private readonly authService: AuthService) {}

    // получаем токен
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: SignInDto) {
        return this.authService.signIn(signInDto.username, signInDto.password)
    }

    @Get('profile')
    // защитник проверяет наличие токена и прикрепляет данные к объекту запроса
    @UseGuards(AuthGuard)
    getProfile(@Req() request) {
        return request.user
    }

    @Post('post')
    @Roles(Role.Admin)
    // AuthGuard пришивает токен и роли к пользователю, потом RoleGuard анализирует пришитые роли
    @UseGuards(AuthGuard, RolesGuard)
    createPost(@Body() createPostDto: CreatePostDto) {
        const post = {
            id: this.posts.length + 1,
            content: createPostDto.content,
        }
        this.posts.push(post)
        return post
    }
}
