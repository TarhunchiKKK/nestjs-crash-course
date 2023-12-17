import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";

// промежуточное ПО
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(request: Request, response: Response, next: NextFunction) {
        console.log('Rquest...')
        next()
    }
}


// функциональное промежуточное ПО
// export function LoggerMiddleware(request: Request, response: Response, next: NextFunction) {
//     console.log('Request')
//     next()
// }