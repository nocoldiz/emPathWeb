import { ILogEntry } from '../../interfaces/events.interface';
import { IPlace } from '../../interfaces/places.interface';
export interface SceneState {
  place: IPlace;
  music: string;
  centerImg: string;
  leftImg: string;
  rightImg: string;
  backgroundImg: string;
  log: ILogEntry[];
  activeAction: string;
}
export const initialState: SceneState = {
  place: {
    id: '0',
    name: 'Moonlit gas station',
    description: 'Lorem ipsum',
    actions: [{ id: 'lit-fire', name: 'Lit fire', type: 'physical' }],
  },
  log: [
    {
      action: 'You open your eyes',
      text: 'You are sitting in your camper',
      id: '0',
    },
    {
      action: 'You see a lonely gas station',
      text: 'You are sitting in your camper',
      id: '1',
    },
    {
      action: 'You look at the Guardian',
      text: 'Ehi you!',
      id: '2',
      name: 'Guardian',
      class: 'Keeper',
    },
  ],
  music: '',
  centerImg: '',
  leftImg: '',
  rightImg: '',
  backgroundImg: '',
  activeAction: '',
};
