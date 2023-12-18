import { HttpException, HttpStatus } from '@nestjs/common'

export class ForbiddenException extends HttpException {
    constructor(message: string = 'Forbidden resourse') {
        super(message, HttpStatus.FORBIDDEN)
    }
}
