import { IAction, IDialogueTree } from './events.interface';
import { IItem } from './inventory.interface';

export interface ICost {
  itemId?: string;
  quantity?: number;
  skillId?: string;
  mpCost?: number;
  hpCost?: number;
  euroCost?: number;
  atpCost?: number;
  wattCost?: number;
  researchCost?: number;
}
export interface IOrgan {
  name: string;
  icon?: string;
  hp?: number;
  status?: string[];
  actions?: string[];
  material?: string;
}
export interface IBodyPart {
  name: string;
  icon?: string;
  hp?: number;
  status?: string[];
  actions?: string[];
  organs?: IOrgan[];
  equipment?: IItem;
}

export interface IHumanoidBody {
  head?: IBodyPart;
  upperBody?: IBodyPart;
  lowerBody?: IBodyPart;
  rightArm?: IBodyPart;
  rightLeg?: IBodyPart;
  rightPilon?: IBodyPart;
  leftArm?: IBodyPart;
  leftLeg?: IBodyPart;
  leftPilon?: IBodyPart;
  actions?: string[];
  organs?: IOrgan[];
}

export interface ISpecies {
  name?: string;
  description?: string;
  dailyCalories: number;
  baseStats?: {
    STR: number;
    INT: number;
    SAG: number;
    DEX: number;
    COS: number;
    AGI: number;
    LCK: number;
  };
  scientificName?: string;
  diet?:
    | 'vegetarian'
    | 'omnivore'
    | 'carnivore'
    | 'cannibal'
    | 'watt'
    | 'fungivore'
    | 'metallivore'
    | 'heat';
  offsprings?: number;
  soul?: string[];
  pregnancyMonths?: number;
  genders?: string[];
  habitat: string;
}

export interface IPersonalityTrait {
  name: string;
  description: string;
  expiration: Date;
  id: string;
  bonusStat?: 'STR' | 'INT' | 'SAG' | 'DEX' | 'COS' | 'AGI' | 'LCK';
  malusStat?: 'STR' | 'INT' | 'SAG' | 'DEX' | 'COS' | 'AGI' | 'LCK';
  bonus?: number;
  malus?: number;
}
export interface INpc {
  name: string;
  id: string;
  hp?: number;
  mp?: number;
  atp?: number;
  watt?: number;
  canTrade?: boolean;
  isWild?: boolean;
  isHostile?: boolean;
  stats?: {
    STR: number;
    INT: number;
    SAG: number;
    DEX: number;
    COS: number;
    AGI: number;
    LCK: number;
  };
  species?: ISpecies;
  bodyType?: IHumanoidBody;
  description?: string;
  hunger?: boolean;
  thirst?: boolean;
  traits?: string[];
  fertility?: number;
  dialogueTree?: IDialogueTree;
  image?: string;
  birthday?: Date;
  keywords?: string[];
  inventory?: IItem[];
  abilities?: IAction[];
  politicalOrientation?: [number, number];
  religion?: string;
  gender?: string;
  sexualOrientation?: 'straight' | 'bisexual' | 'gay' | 'lesbian' | 'asexual';
  class?: 'explorer' | 'bard' | 'gunslinger' | 'hydraulic' | 'cyborg';
  ideals?: string[];
}
