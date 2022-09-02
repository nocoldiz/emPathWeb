import { Item } from "./inventory.interface";
import { Cost } from "./npc.interface";

export interface Vegetation{
    name: string;
    id: string;
    hp: number;
    height: number;
    growthTime: number;
    harvestCost: Cost;
    rarity: 'common'|'rare'|'legendary';
    calories: string;
    edibleBy: string[];
    weight: number;
    foragable?: boolean;
    fruits: Item[];
}