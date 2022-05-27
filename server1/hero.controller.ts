// import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { GetHeroRequest, GetHeroResponse, Hero, ListHeroResponse } from './interfaces/hero.interface';

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { KillDragonCommand } from './src/heroes/commands/impl/kill-dragon.command';
import { KillDragonDto } from './src/heroes/interfaces/kill-dragon-dto.interface';
import { HeroModel } from './src/heroes/models/hero.model';
import { GetHeroesQuery , GarlicBreadQuery} from './src/heroes/queries/impl';

@Controller()
export class HeroController {
    private readonly heros: Hero[] = [{ name: 'School 1', id: 1, ranking: 1 }, { name: 'School 2', id: 2, ranking: -1000 }];
    constructor(
      private readonly commandBus: CommandBus,
      private readonly queryBus: QueryBus,
    ) {}

    //Default method
    // @GrpcMethod('HeroService')
    // get(data: GetHeroRequest): GetHeroResponse {
    //     console.log('server1 get invoked');
    //     return {
    //         hero: this.heros.find(({ id }) => id === data.id),
    //     };
    // }

    //Default method
    // @GrpcMethod('HeroService')
    // list(): ListHeroResponse {
    //     console.log('server1 list invoked');
    //     return { heros: this.heros };
    // }

    //Tells nestjs that this method is implemented
    @GrpcMethod('HeroService')
    async list(): Promise<ListHeroResponse> {
      console.log("Running CQRS POST for command LIST()");
      //Using modified existing command from src/heroes/commands
      let data = await this.commandBus.execute(new KillDragonCommand('abcd', 'efgh'));
      console.log("Finished CQRS POST");
      console.log(data);
      return data;
    }

    @GrpcMethod('HeroService')
    async get(id: number): Promise<Hero[]> {
      console.log("Running CQRS GET for query GET");
      //Using modified existing query from src/heroes/commands
      let data = await this.queryBus.execute(new GetHeroesQuery());
      console.log("Finished CQRS GET");
      console.log(data);
      return data;
    }

    @GrpcMethod('HeroService')
    async creamCheese(id: number): Promise<any> {
        console.log('Running cream cheese, got id ' + String(id));
        let data = await this.queryBus.execute(new GarlicBreadQuery());
        console.log(data);
        return 'Garlic Bread';
    }
}
