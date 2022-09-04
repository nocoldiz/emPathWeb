import { IAction, IDialogueTree } from './events.interface';
import { IItem } from './inventory.interface';

export interface ICost {
  item?: IItem;
  quantity?: number;
  skillName?: string;
  mpCost?: number;
  hpCost?: number;
  euroCost?: number;
  atpCost?: number;
  wattCost?: number;
  researchCost?: number;
}

export interface IPersonalityTrait {
  name: string;
  description: string;
  expiration: Date;
  id: string;
  bonusStat?: 'STR' | 'INT' | 'SAG' | 'DEX' | 'COS' | 'AGI' | 'LCL';
  malusStat?: 'STR' | 'INT' | 'SAG' | 'DEX' | 'COS' | 'AGI' | 'LCL';
  bonus?: number;
  malus?: number;
}
export interface INpc {
  name: string;
  id: string;
  hp: number;
  mp: number;
  atp: number;
  description?: string;
  hunger?: boolean;
  thirst?: boolean;
  traits: string[];
  fertility?: number;
  dialogueTree?: IDialogueTree;
  image?: string;
  birthday?: Date;
  keywords?: string[];
  stats: {
    STR: number;
    INT: number;
    SAG: number;
    DEX: number;
    COS: number;
    AGI: number;
    LCK: number;
  };
  inventory: IItem[];
  abilities: IAction[];
  politicalOrientation?: [number, number];
  religion?: string;
  race?: string;
  gender?: string;
  sexualOrientation: 'straight' | 'bisexual' | 'gay' | 'lesbian' | 'asexual';
  class: 'explorer' | 'bard' | 'gunslinger' | 'hydraulic';
  ideals?: string[];
}
