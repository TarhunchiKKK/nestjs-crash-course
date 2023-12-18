import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'
import { Request, Response } from 'express'
import { ForbiddenException } from 'src/exceptions/forbiddend.exception'

@Catch(ForbiddenException)
export class ForbiddenExceptionFilter implements ExceptionFilter {
    catch(exception: ForbiddenException, host: ArgumentsHost) {
        const context = host.switchToHttp()
        const request = context.getRequest<Request>()
        const response = context.getResponse<Response>()
        const status = exception.getStatus()

        response.status(status).json({
            message: exception.message,
            status: status,
            timestamp: new Date().toISOString(),
            path: request.url,
        })
    }
}
