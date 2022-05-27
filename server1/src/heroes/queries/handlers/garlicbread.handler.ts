import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import * as clc from 'cli-color';
// import { HeroRepository } from '../../repository/hero.repository';
import { GarlicBreadQuery } from '../impl';
import { GetHeroRequest, GetHeroResponse, Hero, ListHeroResponse } from '../../../../interfaces/hero.interface';


@QueryHandler(GarlicBreadQuery)
export class GarlicBreadHandler implements IQueryHandler<GarlicBreadQuery> {
  // constructor(private readonly repository: HeroRepository) {}
  private readonly heros: Hero[] = [{ name: 'School 123', id: 1, ranking: 1 }, { name: 'School 234', id: 2, ranking: -1000 }];

  async execute(query: GarlicBreadQuery) {
    console.log(clc.yellowBright('Async GarlicBreadQuery...!'));
    let data = this.heros;
    return data;
  }
}
