// import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { GetHeroRequest, GetHeroResponse, Hero, ListHeroResponse } from './interfaces/hero.interface';

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { KillDragonCommand } from './src/heroes/commands/impl/kill-dragon.command';
import { KillDragonDto } from './src/heroes/interfaces/kill-dragon-dto.interface';
import { HeroModel } from './src/heroes/models/hero.model';
import { GetHeroesQuery } from './src/heroes/queries/impl';

@Controller()
export class HeroController {
    private readonly heros: Hero[] = [{ name: 'School 1', id: 1, ranking: 1 }, { name: 'School 2', id: 2, ranking: -1000 }];
    constructor(
      private readonly commandBus: CommandBus,
      private readonly queryBus: QueryBus,
    ) {}

    // @GrpcMethod('HeroService')
    // get(data: GetHeroRequest): GetHeroResponse {
    //     console.log('server1 get invoked');
    //     return {
    //         hero: this.heros.find(({ id }) => id === data.id),
    //     };
    // }

    // @GrpcMethod('HeroService')
    // list(): ListHeroResponse {
    //     console.log('server1 list invoked');
    //     return { heros: this.heros };
    // }

    @GrpcMethod('HeroService')
    async list(): Promise<ListHeroResponse> {
      console.log("Running CQRS POST");
      let data = await this.commandBus.execute(new KillDragonCommand('abcd', 'efgh'));
      console.log("Finished CQRS POST");
      console.log(data);
      return data;
    }

    //Tells nestjs that this method is implemented
    @GrpcMethod('HeroService')
    helloWorld(): string {
        console.log('Hello World');
        return 'Hello World';
    }


    @GrpcMethod('HeroService')
    async get(id: number): Promise<Hero[]> {

      console.log("Running CQRS GET with id " + String(id));
      let data = await this.queryBus.execute(new GetHeroesQuery());
      console.log("Finished CQRS GET");
      console.log(data);
      return data;
    }

    @GrpcMethod('HeroService')
    creamCheese(): string {
        console.log('Hello World');
        return 'Hello World';
    }
}
