import { Injectable } from '@nestjs/common';
import { HeroModel } from '../models/hero.model';
import { userHero } from './fixtures/user';

@Injectable()
export class HeroRepository {
  async findOneById(id: number): Promise<HeroModel> {
    return userHero;
  }

  async findAll(): Promise<HeroModel[]> {
    console.log("Running findAll in cqrs");
    console.log(userHero);
    return [userHero];
  }
}
