import { Ability, Cost, Npc } from "./npc.interface";

export interface LogEntry{
    date: Date;
    text: string;
    action: string;
}

export interface Event{
    title: string;
    id: string;
    keywords: string[];
    npc: Npc[];
    image: string;
    timeout?: number;
    actions: Ability[];
}