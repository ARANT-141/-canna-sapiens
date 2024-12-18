import { Plant, PlantStage, SeedType } from './types';
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

export function updatePlant(plant: Plant, upgrades: any[] = []): Plant {
  // Growth progression
  let growthSpeed = 15 * plant.growthRate; // Speed based on seed type
  upgrades.forEach(upgrade => {
    if (upgrade.effect.type === 'growth_speed') {
      growthSpeed *= (1 + upgrade.effect.value);
    }
  });

  if (plant.stage === 'ready') {
    return plant;
  }

  const stageDuration = STAGE_DURATIONS[plant.seedType][plant.stage as 'seed' | 'growing'];
  const growthIncrease = (100 / stageDuration) * growthSpeed;
  const newProgress = Math.min(100, plant.progress + growthIncrease);

  // Stage control
  let newStage: PlantStage = plant.stage;
  if (newProgress >= 100) {
    if (plant.stage === 'seed') {
      newStage = 'growing';
    } else if (plant.stage === 'growing') {
      newStage = 'ready';
    }
  }

  return {
    ...plant,
    stage: newStage,
    progress: newStage === plant.stage ? newProgress : 0,
  };
}

export function waterPlant(plant: Plant): Plant {
  return plant;
}

export function harvestPlant(plant: Plant): number {
  if (plant.stage !== 'ready') return 0;
  
  // Calculate value based on quality and seed type
  const baseValue = SEEDS[plant.seedType].price * 3; // 3x the seed price
  const qualityMultiplier = plant.quality / 100;
  
  return Math.floor(baseValue * qualityMultiplier);
}
