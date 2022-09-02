import {  LogEntry } from "./events.interface";
import { Inventory } from "./inventory.interface";
import { Ability, Npc } from "./npc.interface";
import { Vegetation } from "./vegetation.interface";


export interface Place {
    name: string;
    id: string;
    type: 'dungeon' |'apartments' |'remote house'|'cave'|'castle'|'slums'|'village'|'tunnel'| 'prison' |'drug laboratory'|'laboratory'
    style: 'futuristic'|'rustic'|'alien'|'extra-dimensional'|'steampunk'|'solarpunk'|'medieval'|'barbaric'|'victorian'|'bones'|'primitive'
    layout?: 'square'|'tower'|'sparse';
    services: string[];
    description: string;
    keywords: string[];
    isDungeon?: boolean;
    npc: Npc[];
    image?: string;
    floors?: number;
    height?: number;
    foundingDate?: Date | string;
    population: number;
    builder?: Npc | string;
    owner?: Npc | string;
}


export interface Biome {
    name: string;
    type: 'desert'|'eyeball forest'|'forest'|'infected lands'|'sprawling slums'|'city'|'megalopolis'|'road'|'service station'|'farmland'|'countryside'|'volcanic lands'|'chasm'|'abyss'
    keywords: string[];
    image?: string;
    services?: string[];
    description?: string[];
    hasUnderworld?: boolean;
    pointsOfInterests?: Place[];
    exploredPercentage: number;
    npc?: Npc[];
    vegetation: Vegetation[];
    temperature?:number;
    population: number;
    log: LogEntry[]
    actions: Ability[];
    weather?: string;
    specialWeather?: string;
    specialWeatherOdds: number;

}

