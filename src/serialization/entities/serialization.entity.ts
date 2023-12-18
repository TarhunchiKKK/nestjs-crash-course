import { Exclude, Expose, Transform } from 'class-transformer'

class RoleEntity {
    title: string
    age: number
}

export class SerializationEntity {
    id: number
    firstName: string
    lastName: string

    // сокрытие свойства при отправке ответа на клиент
    @Exclude()
    password: string

    // запись других данных в свойство объекта, отправляемого на сервер
    @Transform(({ value }) => value.title)
    role: RoleEntity

    constructor(partial: Partial<SerializationEntity>) {
        Object.assign(this, partial)
    }

    // добавление нового свойства  в объект, отправляемый на клиент
    @Expose()
    get fullName(): string {
        return `${this.firstName} ${this.lastName}`
    }
}
