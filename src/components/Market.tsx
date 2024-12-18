import { SEEDS } from '@/game/marketData';
import { SeedType } from '@/game/types';
import Image from 'next/image';

interface MarketProps {
  money: number;
  onBuySeed: (type: SeedType) => void;
}

export default function Market({ money, onBuySeed }: MarketProps) {
  return (
    <div className="bg-green-900/50 backdrop-blur-sm p-4 rounded-xl h-full">
      <h2 className="text-2xl font-bold mb-4 text-purple-400">Canna Sapiens Shop</h2>
      <div className="grid gap-3">
        {Object.values(SEEDS).map((seed) => {
          const canBuy = money >= seed.price;
          
          return (
            <button 
              key={seed.type}
              onClick={() => onBuySeed(seed.type)}
              disabled={!canBuy}
              className={`bg-green-800/50 p-3 rounded-lg flex flex-col text-left transition-colors ${
                canBuy ? 'hover:bg-green-800/70 cursor-pointer' : 'opacity-75 cursor-not-allowed'
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="text-base font-semibold text-purple-300">{seed.name}</h3>
                  <p className="text-xs text-gray-300 mb-2">{seed.description}</p>
                </div>
                <span className={`px-2 py-1 rounded text-sm font-medium ${
                  canBuy
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-600 text-gray-400'
                }`}>
                  ${seed.price}
                </span>
              </div>
              <div className="flex gap-4 text-xs text-gray-400">
                <span>Quality: {seed.baseQuality}</span>
                <span>Growth: {seed.growthMultiplier}x</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
