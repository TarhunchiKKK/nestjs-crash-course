import { Module } from '@nestjs/common'
import { CaslService } from './casl.service'
import { CaslController } from './casl.controller'
import { CaslAbilityFactory } from './casl-ability.factory'

@Module({
    controllers: [CaslController],
    providers: [CaslService, CaslAbilityFactory],
    exports: [CaslAbilityFactory],
})
export class CaslModule {}
