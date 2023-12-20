import {
    Controller,
    Get,
    Post,
    Res,
    StreamableFile,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common'
import { FileService } from './file.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { createReadStream } from 'fs'
import { join } from 'path'
// тип Response нужно импортировать из express
import { Response } from 'express'

@Controller('file')
export class FileController {
    constructor(private readonly fileService: FileService) {}

    // оправка файла на клиент
    @Get()
    getFile(@Res() res: Response) {
        const file = createReadStream(join(process.cwd(), 'package.json'))
        file.pipe(res)
    }

    // другой способ отправки файлов (через объект StreamableFile)
    @Get('stream')
    getStreamableFile(): StreamableFile {
        const file = createReadStream(join(process.cwd(), 'package.json'))
        return new StreamableFile(file)
    }

    @Post('upload')
    // в этом перехватчике должно быть указано имя поля из HTML-формы, содержащей файл (поэтому этот код не рабочий)
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        console.log(file)
    }
}
