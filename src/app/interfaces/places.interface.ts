import { IAction, ILogEntry } from './events.interface';
import { IInventory } from './inventory.interface';
import { INpc } from './npc.interface';
import { IVegetation } from './vegetation.interface';

export interface IPlace {
  name: string;
  description: string;
  id: string;
  type?:
    | 'dungeon'
    | 'apartments'
    | 'remote house'
    | 'cave'
    | 'castle'
    | 'slums'
    | 'village'
    | 'tunnel'
    | 'prison'
    | 'drug laboratory'
    | 'laboratory'
    | 'desert'
    | 'eyeball forest'
    | 'forest'
    | 'infected lands'
    | 'sprawling slums'
    | 'city'
    | 'megalopolis'
    | 'road'
    | 'service station'
    | 'farmland'
    | 'countryside'
    | 'volcanic lands'
    | 'chasm'
    | 'abyss';
  style?:
    | 'futuristic'
    | 'rustic'
    | 'alien'
    | 'extra-dimensional'
    | 'steampunk'
    | 'solarpunk'
    | 'medieval'
    | 'barbaric'
    | 'victorian'
    | 'bones'
    | 'primitive';
  layout?: 'square' | 'tower' | 'sparse';
  services?: string[];
  places?: string[];
  items?: string[];
  map?: string;
  keywords?: string[];
  size?: number;
  isDungeon?: boolean;
  npc?: string[];
  img?: string | string[];
  floors?: number;
  height?: number;
  foundingDate?: Date | string;
  population?: number;
  builder?: INpc | string;
  owner?: INpc | string;
  hasUnderworld?: boolean;
  exploredPercentage?: number;
  vegetation?: IVegetation[];
  temperature?: number;
  hiddenTraps?: number;
  hiddenLoot?: number;
  log?: ILogEntry[];
  actions?: string[];
  getActionsFromParent?: boolean;
  weather?: string;
  specialWeather?: string;
  specialWeatherOdds?: number;
}
