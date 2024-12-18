import { SeedInfo, SeedType } from './types';

export const SEEDS: Record<SeedType, SeedInfo & { isExclusive?: boolean }> = {
  regular: {
    type: 'regular',
    name: 'Regular Seed',
    price: 100,
    description: 'Standard quality seed. Reliable and easy to grow.',
    baseQuality: 50,
    growthMultiplier: 1,
    image: '/images/stages/seed.gif'
  },
  premium: {
    type: 'premium',
    name: 'Premium Seed',
    price: 250,
    description: 'High quality seed with faster growth rate.',
    baseQuality: 75,
    growthMultiplier: 1.5,
    image: '/images/stages/seed.gif'
  },
  exotic: {
    type: 'exotic',
    name: 'Exotic Seed',
    price: 500,
    description: 'Rare seed that produces exceptional quality plants.',
    baseQuality: 100,
    growthMultiplier: 2,
    image: '/images/stages/seed.gif'
  },
  cannaSapiens: {
    type: 'cannaSapiens',
    name: 'Canna Sapiens',
    description: ' Legendary strain. Only one can exist at a time.',
    price: 50000,
    baseQuality: 1000,
    growthMultiplier: 5,
    isExclusive: true,
    image: '/images/stages/seed.gif'
  }
};
