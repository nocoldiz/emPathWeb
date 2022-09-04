import { IAbility, ICost, INpc } from './npc.interface';

export interface ILogEntry {
  id: string;
  text: string;
  img?: string;
  npcImg?: string;
  name?: string;
  class?: string;
  date?: Date;
  action?: string;
}

export interface IEvent {
  title: string;
  id: string;
  keywords: string[];
  npc: INpc[];
  image: string;
  timeout?: number;
  actions: IAbility[];
}
