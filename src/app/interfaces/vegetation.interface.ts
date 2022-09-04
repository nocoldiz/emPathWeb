import { IItem } from './inventory.interface';
import { ICost } from './npc.interface';

export interface IVegetation {
  name: string;
  id: string;
  hp: number;
  height: number;
  growthTime: number;
  harvestCost: ICost;
  rarity: 'common' | 'rare' | 'legendary';
  calories: string;
  edibleBy: string[];
  weight: number;
  foragable?: boolean;
  fruits: IItem[];
}
