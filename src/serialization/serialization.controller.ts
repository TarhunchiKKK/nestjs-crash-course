import {
    ClassSerializerInterceptor,
    Controller,
    Get,
    UseInterceptors,
} from '@nestjs/common'
import { SerializationService } from './serialization.service'
import { SerializationEntity } from './entities/serialization.entity'

@Controller('serialization')
export class SerializationController {
    constructor(private readonly serializationService: SerializationService) {}

    @Get()
    // без этого перехватчика свойство password не будет удаляться
    @UseInterceptors(ClassSerializerInterceptor)
    public findOne(): SerializationEntity {
        // возвращать нужно именно объект класса, иначе требуемая сериализация не произойдет т.к. класс не будет распознан
        return new SerializationEntity({
            id: 1,
            firstName: 'Maksim',
            lastName: 'Dubatovka',
            password: '1234',
            role: {
                title: 'Student',
                age: 19,
            },
        })
    }
}
