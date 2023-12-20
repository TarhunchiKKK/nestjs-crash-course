import { Role } from "src/auth/enums/role.enum"

export class User {
    id: number
    username: string
    password: string
    roles: Role[]
}