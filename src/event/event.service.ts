import { Injectable } from '@nestjs/common'
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter'

// полезная нагрузка для события order.created
class OrderCreatedEvent {
    info: string
    emitDate: number
    constructor(info: string, emitDate: number) {
        this.info = info
        this.emitDate = emitDate
    }
}

@Injectable()
export class EventService {
    constructor(private eventEmitter: EventEmitter2) {}

    // генерация события
    emitEvent() {
        this.eventEmitter.emit(
            'order.created',
            new OrderCreatedEvent('order.created', Date.now()),
        )
    }

    // обработчик события (в декораторе передается имя события)
    @OnEvent('order.created')
    handleEvent(payload: OrderCreatedEvent) {
        console.log(`Event ${payload.info} was emitted at ${payload.emitDate}`)
    }
}
