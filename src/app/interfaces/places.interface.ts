import { LogEntry } from './events.interface';
import { Inventory } from './inventory.interface';
import { Ability, Npc } from './npc.interface';
import { Vegetation } from './vegetation.interface';

export interface Place {
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
  places?: Place[];
  description?: string;
  keywords?: string[];
  isDungeon?: boolean;
  npc?: Npc[];
  image?: string | string[];
  floors?: number;
  height?: number;
  foundingDate?: Date | string;
  population?: number;
  builder?: Npc | string;
  owner?: Npc | string;
  hasUnderworld?: boolean;
  exploredPercentage?: number;
  vegetation?: Vegetation[];
  temperature?: number;
  hiddenTraps?: number;
  hiddenLoot?: number;
  log?: LogEntry[];
  actions?: Ability[];
  weather?: string;
  specialWeather?: string;
  specialWeatherOdds?: number;
}
