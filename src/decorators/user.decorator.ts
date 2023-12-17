import { ExecutionContext, createParamDecorator } from "@nestjs/common";

// данный декоратор извлекает user из request
export const User = createParamDecorator((data: unknown, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest()
        return request.user
    }
)