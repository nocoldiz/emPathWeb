import { INpc } from './npc.interface';

export interface IItem {
  name: string;
  type:
    | 'item'
    | 'weapon'
    | 'artifact'
    | 'resource'
    | 'drug'
    | 'body part'
    | 'food'
    | 'book';
  hp: number;
  expiration: Date;
  opened?: boolean;
  quantity: number;
  description?: string;
  duration?: boolean;
  price?: number;
  weight?: number;
  calories?: number;
  capacity?: number;
  attackType: 'ranged' | 'close';
  inventory: IItem[];
  pages?: number;
  material?: string[];
  meltingPoint: number;
  genre?: string;
  maker?: string;
  craftable?: boolean;
  keyItem?: boolean;
  smeltable?: boolean;
  size?: number;
  requiredStats?: {
    STR: number;
    INT: number;
    SAG: number;
    DEX: number;
    COS: number;
    AGI: number;
    LCK: number;
  };
  equip:
    | 'none'
    | 'head'
    | 'upper body'
    | 'lower body'
    | 'arms'
    | 'legs'
    | 'feet'
    | 'neck';
  keywords: string[];
  uses?: number;
  actions?: string[];
  failure?: number;
  quality?: 'normal' | 'refined' | 'legendary';
  pastOwners?: string[];
}

export interface IInventory {
  totalWeight: number;
  totalPrice: number;
  items: IItem[];
  equipment?: {
    head?: IItem;
    upperBody?: IItem;
    lowerBody?: IItem;
    arms?: IItem;
    legs?: IItem;
    feet?: IItem;
    neck?: IItem;
  };
}
