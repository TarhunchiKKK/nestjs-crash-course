import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
    WsResponse,
    WebSocketServer,
    WsException,
} from '@nestjs/websockets'
import { CreateWebSocketDto } from './dto/create-web-socket.dto'
import { UpdateWebSocketDto } from './dto/update-web-socket.dto'
import { Socket } from 'dgram'
import { Observable, from, map } from 'rxjs'
import { Server } from 'socket.io'
import { UseFilters } from '@nestjs/common'
import { MyExceptionFilter } from './middleware/my-exception.filter'

@WebSocketGateway({ namespace: 'messanger' })
export class WebSocketsGateway {
    @WebSocketServer()
    server: Server

    @SubscribeMessage('first')
    first(
        @MessageBody('message') message: string,
        @ConnectedSocket() client: Socket,
    ): string {
        console.log(message)
        client.emit('first', { name: 'First' })
        return message
    }

    @SubscribeMessage('second')
    second(@MessageBody() message: string): WsResponse<string> {
        return { event: 'second', data: message }
    }

    // в этом случае придет 5 ответов
    @SubscribeMessage('observable')
    handleObservable(): Observable<WsResponse<number>> {
        const numbers: number[] = [1, 2, 3, 4, 5]
        return from(numbers).pipe(
            map((n) => ({ event: 'observable', data: n })),
        )
    }

    // асинхронная обработка
    @SubscribeMessage('async')
    async handleAsync(): Promise<WsResponse<number>> {
        return await new Promise<WsResponse<number>>((resolve, reject) => {
            resolve({
                event: 'async',
                data: 52,
            })
        })
    }

    @UseFilters(MyExceptionFilter)
    @SubscribeMessage('exception')
    generateException() {
      throw new WsException('Some exception')
    }
}
