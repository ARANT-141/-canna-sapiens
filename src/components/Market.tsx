import React from 'react';
// import Image from 'next/image';
import { SEEDS } from '@/game/marketData';
import { SeedType } from '@/game/types';

interface MarketProps {
  money: number;
  onBuySeed: (type: SeedType) => void;
}

export default function Market({ money, onBuySeed }: MarketProps) {
  return (
    <div className="bg-green-900/50 backdrop-blur-sm p-4 rounded-xl h-full">
      <h2 className="text-2xl font-bold mb-4 text-purple-400">Canna Sapiens Shop</h2>
      <div className="space-y-4">
        {Object.entries(SEEDS).map(([type, seed]) => {
          const canBuy = money >= seed.price;
          
          return (
            <button
              key={type}
              onClick={() => onBuySeed(type as SeedType)}
              disabled={!canBuy}
              className={`bg-green-800/50 p-3 rounded-lg flex flex-col text-left transition-colors ${
                canBuy ? 'hover:bg-green-800/70 cursor-pointer' : 'opacity-75 cursor-not-allowed'
              }`}
            >
              <div className="text-lg font-semibold text-purple-400">{seed.name}</div>
              <div className="text-sm text-gray-300">{seed.description}</div>
              <div className="text-xs text-gray-400 mt-1">
                Quality: {seed.baseQuality} • Growth: {seed.growthMultiplier}x
              </div>
              <div className="text-lg font-bold text-green-400 mt-2">
                ${seed.price}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
