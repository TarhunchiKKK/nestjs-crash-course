import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import { Observable } from 'rxjs'
import { jwtConstants } from '../constants'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest() // получение объекта запроса
        const token = this.extractTokenFromRequest(request) // извлечение токена из запроса
        if (!token) {
            // в запросе нет токена
            throw new UnauthorizedException()
        }
        try {
            const payload = await this.jwtService.verifyAsync(
                // сравниваем токены
                token,
                {
                    secret: jwtConstants.secret,
                },
            )
            request['user'] = payload // запись токена и ролей в объект запроса
            console.log('User in AuthGuard: ')
            console.log(request.user)
        } catch {
            throw new UnauthorizedException()
        }
        return true
    }

    // извлекаем токен из запроса
    private extractTokenFromRequest(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? []
        return type === 'Bearer' ? token : undefined
    }
}
