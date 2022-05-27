import { Observable } from 'rxjs';
import { GetHeroRequest, GetHeroResponse, ListHeroResponse, helloWorld } from './hero.interface';

export interface HeroService {
    get(data: GetHeroRequest): Observable<GetHeroResponse>;

    list(data: any): Observable<ListHeroResponse>;

    creamCheese(data: GetHeroRequest): Observable<GetHeroResponse>;

    helloWorld(data: any): Observable<helloWorld>;
  }
}
