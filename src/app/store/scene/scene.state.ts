import { LogEntry } from '../../interfaces/events.interface';

export interface SceneState {
  music: string;
  centerImg: string;
  leftImg: string;
  rightImg: string;
  backgroundImg: string;
  log: LogEntry[];
}
export const initialState: SceneState = {
  log: [
    {
      action: 'You open your eyes',
      date: new Date(),
      text: 'You are sitting in your camper',
      id: '0',
    },
    {
      action: 'You see a lonely gas station',
      date: new Date(),
      text: 'You are sitting in your camper',
      id: '1',
    },
    {
      action: 'You look at the Guardian',
      date: new Date(),
      text: 'Ehi you!',
      id: '1',
      name: 'Guardian',
      class: 'Keeper',
    },
  ],
  music: '',
  centerImg: '',
  leftImg: '',
  rightImg: '',
  backgroundImg: '',
};
