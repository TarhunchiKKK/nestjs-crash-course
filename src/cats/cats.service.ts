import { Injectable } from '@nestjs/common';
import { ICat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
    private readonly cats: ICat[] = [];

    findAll() : ICat[] {
        return this.cats
    }

    create(cat: ICat) {
        this.cats.push(cat)
    }
}
