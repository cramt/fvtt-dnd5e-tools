export enum ToolType {
  Artisans = "Artisans Tools",
  Instruments = "Instruments",
  PlayingSets = "Playing Sets",
  Vehicles = "Vehicles",
}


export enum ProfType {
  Proficiency = 1,
  HalfProficiency = 0.5,
  Expertise = 2,
}

export interface ToolEntry {
  name: String;
  prof: ProfType;
}

export type ToolData = { [key in ToolType]: ToolEntry[] };
