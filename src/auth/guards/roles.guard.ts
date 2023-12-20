import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Role } from '../enums/role.enum'
import { ROLES_KEY } from '../decorators/roles.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        // получение ролей, указанных для метода-обработчика
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
            ROLES_KEY,
            [
                context.getHandler(), // обработчик запроса
                context.getClass(), // класс контроллера
            ],
        )
        if (!requiredRoles) {
            // никаких ролей на методе нету
            return true
        }
        const { user } = context.switchToHttp().getRequest() // извлекаем пользователя из запроса

        console.log(`User in RolesGuard:`)
        console.log(user)

        // ищем пересечение множества ролей пользователя и ролей метода
        return requiredRoles.some((role) => user.roles?.includes(role))
    }
}
