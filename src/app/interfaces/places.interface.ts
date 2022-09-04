import { ILogEntry } from './events.interface';
import { IInventory } from './inventory.interface';
import { IAbility, INpc } from './npc.interface';
import { Vegetation } from './vegetation.interface';

export interface IPlace {
  name: string;
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
  places?: IPlace[];
  description?: string;
  keywords?: string[];
  isDungeon?: boolean;
  npc?: INpc[];
  image?: string | string[];
  floors?: number;
  height?: number;
  foundingDate?: Date | string;
  population?: number;
  builder?: INpc | string;
  owner?: INpc | string;
  hasUnderworld?: boolean;
  exploredPercentage?: number;
  vegetation?: Vegetation[];
  temperature?: number;
  hiddenTraps?: number;
  hiddenLoot?: number;
  log?: ILogEntry[];
  actions?: IAbility[];
  weather?: string;
  specialWeather?: string;
  specialWeatherOdds?: number;
}
