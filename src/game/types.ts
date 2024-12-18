export type PlantStage = 'seed' | 'growing' | 'ready' | 'harvested';
export type SeedType = 'regular' | 'premium' | 'exotic' | 'cannaSapiens';

export interface Plant {
  id: string;
  stage: PlantStage;
  quality: number;
  growthRate: number;
  progress: number;
  seedType: SeedType;
}

export interface SeedInfo {
  type: SeedType;
  name: string;
  description: string;
  price: number;
  baseQuality: number;
  growthMultiplier: number;
  image: string;
}

export interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  effect: {
    type: 'growth_speed' | 'water_retention' | 'quality';
    value: number;
  };
}
