import { ILogEntry } from './events.interface';
import { IInventory } from './inventory.interface';
import { IAction, INpc } from './npc.interface';
import { IPlace } from './places.interface';

export interface IUpgrades {
  name: string;
  requiredItems: {};
  requiredWatts: number;
  action: string;
}

export interface ICamper {
  name: string;
  description?: string[];
  inventory: IInventory;
  topSpeed: number;
  temperature: number;
  watt: number;
  upgrades: IUpgrades[];
  pointsOfInterests?: IPlace[];
  log: ILogEntry[];
  actions: IAction[];
}
