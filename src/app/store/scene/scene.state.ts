import { INpc } from './../../interfaces/npc.interface';
import { IAction, ILogEntry } from '../../interfaces/events.interface';
import { IPlace } from '../../interfaces/places.interface';
export interface SceneState {
  place: IPlace;
  previousPlace: IPlace;
  player: INpc;
  reachablePlaces: IPlace[];
  music: string;
  centerOverlay: string;
  leftOverlay: string;
  rightOverlay: string;
  backgroundImg: string;
  text: string;
  log: ILogEntry[];
  activeAction: string;
  actions: IAction[];
}
export const initialState: SceneState = {
  place: {
    id: '0',
    name: '',
    description: '',
    actions: [],
    places: [],
  },
  player: {
    id: 'player',
    name: 'Varlenia',
    hp: 100,
    mp: 300,
    atp: 100,
    class: 'cyborg',
    stats: {
      STR: 10,
      INT: 10,
      SAG: 10,
      DEX: 10,
      COS: 10,
      AGI: 10,
      LCK: 10,
    },
    bodyType: {
      head: {
        name: 'Android Head',
        hp: 10,
        organs: [
          {
            name: 'Eyes of truth',
            hp: 100,
            actions: ['see', 'blink'],
          },
          {
            name: 'Mouth',
            hp: 100,
            actions: ['lick', 'eat', 'bite', 'spit'],
          },
        ],
      },
    },
  },
  reachablePlaces: [],
  previousPlace: {
    id: '',
    name: '',
    description: '',
    actions: [],
    places: [],
  },
  text: '',
  log: [],
  music: '',
  centerOverlay: '',
  leftOverlay: '',
  rightOverlay: '',
  backgroundImg: 'station-moonlit-night-1',
  activeAction: '',
  actions: [
    {
      id: 'lit-fire',
      name: 'Lit fire',
      type: 'physical',
      cost: [{ itemId: 'wood', quantity: 1 }],
      timeout: 1000,
    },
    {
      id: 'enter-camper',
      name: 'Enter camper',
      type: 'physical',
    },
    {
      id: 'open',
      name: 'Open',
      type: 'physical',
    },
  ],
};
