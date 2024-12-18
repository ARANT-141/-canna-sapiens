import { Plant, SeedType } from './types';
import { SEEDS } from './marketData';

const STAGE_DURATIONS: Record<SeedType, { seed: number; growing: number }> = {
  regular: {
    seed: 3000,    // 3 seconds
    growing: 6000, // 6 seconds
  },
  premium: {
    seed: 3000,
    growing: 6000,
  },
  exotic: {
    seed: 3000,
    growing: 6000,
  },
  cannaSapiens: {
    seed: 20000,    // 20 seconds
    growing: 35000, // 35 seconds
  }
};

export function createPlant(seedType: SeedType = 'regular'): Plant {
  const seedInfo = SEEDS[seedType];
  return {
    id: Math.random().toString(),
    stage: 'seed',
    quality: Math.random() * 25 + seedInfo.baseQuality, // Base quality + random bonus
    growthRate: seedInfo.growthMultiplier,
    progress: 0,
    seedType
  };
}

export function updatePlant(plant: Plant): Plant {
  // Growth progression
  const growthSpeed = 15 * plant.growthRate; // Speed based on seed type

  if (plant.stage === 'ready') {
    return plant;
  }

  const stageDuration = STAGE_DURATIONS[plant.seedType][plant.stage as 'seed' | 'growing'];
  const growthIncrease = (100 / stageDuration) * growthSpeed;
  const newProgress = Math.min(100, plant.progress + growthIncrease);

  // Stage transitions
  if (newProgress === 100) {
    if (plant.stage === 'seed') {
      return { ...plant, stage: 'growing', progress: 0 };
    }
    if (plant.stage === 'growing') {
      return { ...plant, stage: 'ready', progress: 100 };
    }
  }

  return { ...plant, progress: newProgress };
}

export function waterPlant(plant: Plant): Plant {
  if (plant.stage === 'seed' || plant.stage === 'growing') {
    return { ...plant, progress: Math.min(100, plant.progress + 10) };
  }
  return plant;
}

export function harvestPlant(plant: Plant): number {
  if (plant.stage !== 'ready') return 0;

  const baseValue = plant.quality * 10;
  const qualityBonus = plant.quality >= 90 ? 2 : plant.quality >= 75 ? 1.5 : 1;

  return Math.round(baseValue * qualityBonus);
}
