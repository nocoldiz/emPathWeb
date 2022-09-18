import { ICost, INpc } from './npc.interface';

export interface ILogEntry {
  id?: string;
  text?: string;
  img?: string;
  npcImg?: string;
  name?: string;
  class?: string;
  action?: string;
}
export interface IAction {
  name: string;
  id: string;
  type:
    | 'magic'
    | 'physical'
    | 'item'
    | 'PSY'
    | 'survival'
    | 'speech'
    | 'intellectual'
    | 'ranged'
    | 'curse'
    | 'tecnical';
  stat?: 'STR' | 'INT' | 'SAG' | 'DEX' | 'COS' | 'AGI' | 'LCK';
  timeout?: number;
  image?: string;
  icon?: string;
  keywords?: string[];
  cost?: ICost[];
  school?: string;
  expiration?: Date;
  event?: string;
  selectLog?: string[];
  successLog?: string[];
  failureLog?: string[];
  successEvent?: string;
  selectEvent?: string;
  failureEvent?: string;
  locked?: boolean;
  target?: string;
  uses?: number;
  failure?: number;
  battleOnly?: boolean;
}

export interface IEvent {
  title: string;
  id: string;
  keywords: string[];
  npc: INpc[];
  image: string;
  timeout?: number;
  actions: IAction[];
}
export interface IDialogueTree {
  text: string;
  id: string;
  options: IDialogueTree[];
  callEvent?: string;
  callAction?: string;
  requirement?: ICost;
  cost?: ICost;
  image?: string;
  icon?: string;
}
