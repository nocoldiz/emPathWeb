import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on,
} from '@ngrx/store';
import { setActiveEvent, updateLog } from './scene/scene.actions';
import { environment } from '../../environments/environment';
import { INpc } from '../../app/interfaces/npc.interface';
import { ILogEntry } from '../../app/interfaces/events.interface';
import { state } from '@angular/animations';
import { from } from 'rxjs';

/*export interface AppState {
  game?: {
    player?: Npc;
    money?: number;
    researchPoints?: number;
    party?: Npc[];
    location?: string;
    activeEvent: string;
    prevEvent: string;
    nextEvent: string;
    poi?: string;
    coordinates?: [number, number];
    seed?: string;
  };

  stats?: {
    placeVisited: number;
    kills: number;
    deaths: number;
    notoriety: number;
  };

  scene: {
    music?: string;
    centerImg?: string;
    leftImg?: string;
    rightImg?: string;
    backgroundImg?: string;
    log?: LogEntry[];
  };

  options?: {
    music: number;
    sfx: number;
    novelAiAPIkey: string;
    dreamstudioAPIkey: string;
    chaosMode?: boolean;
  };

  unlock?: {
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
  };

  witchingHour?: number;

  //theme:string
}
*/
/*
export const initialState: AppState = {
  game: {
    seed: '12292',
    activeEvent: 'test',
    nextEvent: '',
    money: 3000,
    prevEvent: '',
    coordinates: [0, 0],
    poi: '',
    researchPoints: 100,
    location: 'gasStation00',
  },
  scene: {
    log: [
      {
        action: 'You open your eyes',
        date: new Date(),
        text: 'You are sitting in your camper',
      },
    ],
  },
};
*/
