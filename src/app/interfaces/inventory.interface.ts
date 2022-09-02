import { Npc } from "./npc.interface";

export interface Item {
    name: string;
    type: 'item'|'weapon'|'artifact'|'resource'|'drug'|'body part'|'food'|'book';
    hp: number;
    expiration: Date;
    opened?: boolean;
    description?: string;
    duration?: boolean;
    price?: number;
    weight?: number;
    calories?: number;
    capacity?: number;
    attackType: 'ranged'| 'close';
    inventory: Item[];
    pages?: number;
    material?: string[];
    meltingPoint: number;
    genre?:string;
    maker?: string;
    craftable?: boolean;
    keyItem?: boolean;
    smeltable?:boolean;
    size?: number;
    requiredStats?: {'STR': number,'INT': number, 'SAG': number,'DEX': number,'COS': number,'AGI': number,'LCK': number}
    equip: 'none' | 'head' | 'upper body' | 'lower body' | 'arms' |'legs'|'feet'| 'neck'
    keywords: string[];
    uses?: number;
    action?: string;
    failure?: number;
    quality?: 'normal' | 'refined' | 'legendary';
    pastOwners?: Npc[];
}

export interface Inventory{
    totalWeight: number;
    totalPrice: number;
    items: Item[];
    equipment?: {
        head?: Item;
        upperBody?: Item;
        lowerBody?: Item;
        arms?: Item;
        legs?: Item;
        feet?: Item;
        neck?: Item;
    }
}