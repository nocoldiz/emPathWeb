import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { Npc} from '../../app/interfaces/npc.interface'


export interface State {
  game?:{
    player?: Npc,
    money?: number;
    researchPoints?: number;
    party?: Npc[],
    location?: string,
    poi?: string;
    coordinates?:[number,number],
    seed?: string,

  }

  stats?:{
    placeVisited: number;
    kills: number;
    deaths: number;
    notoriety: number;

  }

  scene?:{
    music: string;
    centerImg?: string;
    leftImg?: string;
    rightImg?: string;
    backgroundImg?: string;
  }

  options?:{
    music: number;
    sfx: number;
    novelAiAPIkey: string;
    dreamstudioAPIkey: string;
    chaosMode?: boolean

  }

  unlock?:{
    travelMap?: boolean;
    crafting?: boolean;
    camper?: boolean;
    cooking?: boolean;
    hunting?: boolean;
    inventory?: boolean;
    library?: boolean;
    meditation?: boolean;
    creativity?: boolean;
    demonology?: boolean;
    magic?: boolean;

  }

  witchingHour?: number,

  //theme:string
}

export const reducers: ActionReducerMap<State> = {

};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
