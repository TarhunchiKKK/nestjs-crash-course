import { Injectable } from '@nestjs/common';
import { ICat } from './interfaces/cat.interface';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatsService {
    private readonly cats: Cat[] = [];

    findAll() : Cat[] {
        return this.cats
    }

    findOne(id: number): Cat {
        return this.cats[id]
    }

    create(cat: ICat) {
        this.cats.push({ ...cat, id: this.cats.length  });
    }
}
