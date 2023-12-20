import { Injectable } from '@nestjs/common'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
    // список зарегистрированных пользователей
    private users: User[] = [
        {
            id: 1,
            username: 'Kostet',
            password: '123456'
        },
        {
            id: 2,
            username: 'Makson',
            password: '123456'
        },
        {
            id: 3,
            username: 'Masya',
            password: '123456'
        },
        {
            id: 4,
            username: 'Petya',
            password: '123456'
        },
        {
            id: 5, 
            username: 'Vlados',
            password: '123456'
        }
    ]

    // поиск пользователя по имени
    async findByUsername(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username)
    }
}
