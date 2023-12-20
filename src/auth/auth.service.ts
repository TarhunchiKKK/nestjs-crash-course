import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    // логин (получение токена)
    async signIn(username: string, password: string): Promise<any> {
        // ищем пользователя с таким именем
        const user = await this.usersService.findByUsername(username)
        // если пароль найденного пользователя и переданный пароль различны - ошибка
        if (user?.password !== password) {
            throw new UnauthorizedException()
        }
        // формаирование jwt-токена
        const payload = { id: user.id, username: user.username, roles: user.roles } 
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}
