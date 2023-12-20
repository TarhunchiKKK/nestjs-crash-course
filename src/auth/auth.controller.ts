import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignInDto } from './dto/sign-in.dto'
import { AuthGuard } from './guards/auth.guard'

@Controller('auth')
export class AuthController {
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
}
