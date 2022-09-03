import { Ability, Cost, Npc } from './npc.interface';

export interface LogEntry {
  id: string;
  text: string;
  img?: string;
  npcImg?: string;
  name?: string;
  class?: string;
  date?: Date;
  action?: string;
}

export interface Event {
  title: string;
  id: string;
  keywords: string[];
  npc: Npc[];
  image: string;
  timeout?: number;
  actions: Ability[];
}
