import { Injectable } from '@nestjs/common'
import { User } from './entities/user.entity'
import { Role } from 'src/auth/enums/role.enum'

@Injectable()
export class UsersService {
    // список зарегистрированных пользователей
    private users: User[] = [
        {
            id: 1,
            username: 'Kostet',
            password: '123456',
            roles: [Role.Admin, Role.User],
        },
        {
            id: 2,
            username: 'Makson',
            password: '123456',
            roles: [Role.Admin, Role.User],
        },
        {
            id: 3,
            username: 'Masya',
            password: '123456',
            roles: [Role.User],
        },
        {
            id: 4,
            username: 'Petya',
            password: '123456',
            roles: [Role.User],
        },
        {
            id: 5,
            username: 'Vlados',
            password: '123456',
            roles: [Role.User],
        },
    ]

    // поиск пользователя по имени
    async findByUsername(username: string): Promise<User | undefined> {
        return this.users.find((user) => user.username === username)
    }
}
