import {  LogEntry } from "./events.interface";
import { Inventory } from "./inventory.interface";
import { Ability, Npc } from "./npc.interface";
import { Place } from "./places.interface";

export interface Upgrades{
    name: string;
    requiredItems: {}
    requiredWatts: number;
    action: string
    

}

export interface Camper {
    name: string;
    description?: string[];
    inventory: Inventory;
    topSpeed: number;
    temperature: number;
    watt: number;
    upgrades: Upgrades[]
    pointsOfInterests?: Place[];
    log: LogEntry[]
    actions: Ability[];
}