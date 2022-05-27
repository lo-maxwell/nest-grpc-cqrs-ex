import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { GrpcClient, RpcClient, Service } from '@nestcloud/grpc';
import { HeroService } from './interfaces/hero-service.interface';
import { join } from 'path';
import { ListHeroResponse , Hero, helloWorld } from './interfaces/hero.interface';
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


    // @Post('/message=:heroId')
    // async message(@Param('heroId') heroId: number): Promise<any> {
    //     const data = await this.heroService.get({ id: heroId }).toPromise();
    //     console.log(data);
    //     this.heroService.push({ id: heroId });
    //     return data;
    // }

    @Post('/POST*')
    create(): string {
      return 'hello World';
    }

    @Get('/helloWorld')
    async helloWorld(): Promise<helloWorld> {
      const data = await this.heroService.helloWorld({}).toPromise();
      console.log(data);
      return data;
    }

    @Post('/test*')
    async postman(): Promise<ListHeroResponse> {
      const data = await this.heroService.list({}).toPromise();
      console.log("back to client controller after running post");
      console.log(data);
      console.log(typeof data)
      return data;
    }

    @Get('/id=:heroId')
    async get(@Param('heroId') heroId: number): Promise<any> {
        const data = await this.heroService.get({ id: heroId }).toPromise();
        console.log("back to client controller");
        console.log(data);
        return data;
    }

    // @Get('/')
    // async list(): Promise<ListHeroResponse> {
    //     const data = await this.heroService.list({}).toPromise();
    //     console.log(data);
    //     return data;
    // }

    @Get('/garlic')
    async ciabatta(@Param('heroId') heroId: number): Promise<any> {
      console.log("initializing get request using CQRS")
      const data = await this.heroService.creamCheese({ id: heroId }).toPromise();
      console.log("back to client controller");
      console.log(data);
      return data;
    }


    // @Get()
    // async findAll(): Promise<Hero[]> {
    //   // console.log("Hello World!!")
    //   return this.queryBus.execute(new GetHeroesQuery());
    // }

    //Need: commandbus/cqrs install, impl/handler per function, function in client controller, function in server controller
    //commandbus - run this thing
    //@GrpcMethod('HeroService') - blackbox method to link function from server to client


}
