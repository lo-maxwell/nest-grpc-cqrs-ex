import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { HeroRepository } from '../../repository/hero.repository';
import { KillDragonCommand } from '../impl/kill-dragon.command';
import { GetHeroRequest, GetHeroResponse, Hero, ListHeroResponse } from '../../../../interfaces/hero.interface';


@CommandHandler(KillDragonCommand)
export class KillDragonHandler implements ICommandHandler<KillDragonCommand> {
  constructor(
    private readonly repository: HeroRepository,
    private readonly publisher: EventPublisher,
  ) {}

  private heros: Hero[] = [{ name: 'School 1234', id: 1, ranking: 1 }, { name: 'School 2345', id: 2, ranking: -1000 }];

  async execute(command: KillDragonCommand) {
    console.log(clc.greenBright('KillDragonCommand...'));

    const { heroId, dragonId } = command;
    // const hero = this.publisher.mergeObjectContext(
    //   await this.repository.findOneById(+heroId),
    // );
    // hero.killEnemy(dragonId);
    // hero.commit();

    this.heros[0].name = heroId;
    this.heros[1].name = dragonId;
    let data = { heros: this.heros }
    return data;
  }
}
