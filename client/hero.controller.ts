import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { GrpcClient, RpcClient, Service } from '@nestcloud/grpc';
import { HeroService } from './interfaces/hero-service.interface';
import { join } from 'path';
import { ListHeroResponse , Hero } from './interfaces/hero.interface';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

@Controller('/heros')
export class HeroController {
    @RpcClient({
        service: 'rpc-server',
        package: 'hero',
        protoPath: join(__dirname, './interfaces/hero-service.proto'),
    })
    private readonly client: GrpcClient;
    @Service('HeroService', {
        service: 'rpc-server',
        package: 'hero',
        protoPath: join(__dirname, './interfaces/hero-service.proto'),
    })
    private heroService: HeroService;

    //Default function
    // @Get('/:heroId')
    // async get(@Param('heroId') heroId: number): Promise<any> {
    //     const data = await this.heroService.get({ id: heroId }).toPromise();
    //     console.log(data);
    //     return data;
    // }

    //Default function
    @Get('/')
    async list(): Promise<ListHeroResponse> {
        const data = await this.heroService.list({}).toPromise();
        console.log(data);
        return data;
    }

    @Post('/POST*')
    create(): string {
      return 'hello World';
    }

    @Post('/test*')
    async postman(): Promise<ListHeroResponse> {
      const data = await this.heroService.list({}).toPromise();
      console.log("back to client controller after running post");
      console.log(data);
      console.log(typeof data);
      return data;
    }

    @Get('/id=:heroId')
    async get(@Param('heroId') heroId: number): Promise<any> {
        const data = await this.heroService.get({ id: heroId }).toPromise();
        console.log("back to client controller");
        console.log(data);
        return data;
    }

    //This function is a WIP and currently doesn't return anything.
    //It has the wrong return format.
    @Get('/garlic')
    async ciabatta(@Param('heroId') heroId: number): Promise<any> {
      console.log("initializing garlic request using CQRS")
      const data = {WIP: await this.heroService.creamCheese({ id: 123456 }).toPromise()};
      console.log("back to client controller");
      console.log(data);
      return data;
    }
}
