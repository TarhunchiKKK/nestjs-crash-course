import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata) {
        if (!metadata.metatype || !this.toValidate(metadata.metatype)) {
            return value
        }

        // преобразование аргумента в типизированный объект
        const object = plainToInstance(metadata.metatype, value)

        // валидация
        const errors = await validate(object)

        if (errors.length > 0) {
            throw new BadRequestException('Validation failed')
        }

        return value
    }

    private toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object]
        return !types.includes(metatype)
    }
} 