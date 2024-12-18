import React, { useState, useEffect } from 'react';
import Market from './Market';
import { Plant, SeedType } from '@/game/types';
import { createPlant, updatePlant, waterPlant, harvestPlant } from '@/game/plantManager';
import { SEEDS } from '@/game/marketData';
import PlantAnimation from './PlantAnimation';
import SmokeEffect from './SmokeEffect';
import MusicPlayer from './MusicPlayer';

export default function GameContainer() {
  const [money, setMoney] = useState(350);
  const [plants, setPlants] = useState<Plant[]>([]);
  const [upgrades] = useState<string[]>([]);
  const [harvestedPlants, setHarvestedPlants] = useState<string[]>([]);
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setPlants(currentPlants =>
        currentPlants.map(plant => updatePlant(plant))
      );
    }, 10);

    return () => clearInterval(timer);
  }, []);

  // Buy new seed
  const handleBuySeed = (type: SeedType) => {
    const seed = SEEDS[type];
    if (money >= seed.price) {
      // Check if trying to plant Canna Sapiens while other plants exist
      if (seed.isExclusive && plants.length > 0) {
        alert("You must harvest all plants before planting Canna Sapiens!");
        return;
      }

      // Check if trying to plant other seeds while Canna Sapiens is growing
      if (plants.some(p => p.seedType === 'cannaSapiens') && type !== 'cannaSapiens') {
        alert("You cannot plant other seeds while Canna Sapiens is growing!");
        return;
      }

      setMoney(money - seed.price);
      const newPlant = createPlant(type);
      setPlants([...plants, newPlant]);
    }
  };

  // Water plant
  const handleWater = (plantId: string) => {
    setPlants(currentPlants =>
      currentPlants.map(plant =>
        plant.id === plantId ? waterPlant(plant) : plant
      )
    );
  };

  const handleHarvest = (plantId: string) => {
    const plant = plants.find(p => p.id === plantId);
    if (plant && plant.stage === 'ready') {
      const value = harvestPlant(plant);
      setHarvestedPlants(prev => [...prev, plantId]); // Start harvest animation
      
      // Show share modal if Canna Sapiens is harvested
      if (plant.seedType === 'cannaSapiens') {
        setTimeout(() => {
          setShowShareModal(true);
        }, 1000);
      }

      // Remove plant and add money after 2 seconds
      setTimeout(() => {
        setMoney(prev => prev + value);
        setPlants(prev => prev.filter(p => p.id !== plantId));
        setHarvestedPlants(prev => prev.filter(id => id !== plantId));
      }, 2000);
    }
  };

  const handleShare = () => {
    const tweetText = "I just harvested a legendary Canna Sapiens\n\n@CannaSapiensNFT";
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(twitterUrl, '_blank');
    setShowShareModal(false);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 psychedelic-bg">
      <MusicPlayer />
      <SmokeEffect />
      {/* Status Bar */}
      <div className="bg-purple-500/50 backdrop-blur-sm text-yellow-200 p-6 rounded-xl mb-6 flex justify-between items-center relative">
        <span className="text-2xl font-medium text-distort">💰 Stash: ${money}</span>
        <span className="text-2xl font-medium text-distort">🌿 Plants: {plants.length}/6</span>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-2xl font-medium text-giant">💰 ${money}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
        {/* Market Section */}
        <div className="h-fit">
          <Market money={money} onBuySeed={handleBuySeed} />
        </div>

        {/* Growing Area */}
        <div className="bg-green-300/30 backdrop-blur-sm p-6 rounded-xl min-h-[500px] relative">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-pink-400 text-distort">Grow Room</h2>
            <h2 className="text-3xl font-bold text-pink-400 text-giant absolute left-0 right-0 text-center">Grow Room</h2>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {Array(6).fill(null).map((_, i) => {
              const plant = plants[i];
              const isHarvested = plant && harvestedPlants.includes(plant.id);
              
              return (
                <div 
                  key={i} 
                  className="aspect-square bg-green-800/50 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center border-2 border-green-700/30 hover:border-purple-500/50 transition-colors p-4"
                >
                  {plant ? (
                    <>
                      <div className="text-purple-400 text-lg mb-2">{plant.stage}</div>
                      <PlantAnimation 
                        stage={isHarvested ? 'harvested' : plant.stage}
                        onClick={() => {
                          if (plant.stage === 'ready') {
                            handleHarvest(plant.id);
                          } else if (plant.stage !== 'harvested') {
                            handleWater(plant.id);
                          }
                        }}
                      />
                      <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full" 
                          style={{ width: `${plant.progress}%` }}
                        />
                      </div>
                      <div className="flex gap-2">
                        {plant.stage !== 'ready' && plant.stage !== 'harvested' && (
                          <button
                            onClick={() => handleWater(plant.id)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-lg text-sm"
                          >
                            💧
                          </button>
                        )}
                        {plant.stage === 'ready' && !isHarvested && (
                          <button
                            onClick={() => handleHarvest(plant.id)}
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-1"
                          >
                            <span>✂️</span>
                            <span>Harvest</span>
                          </button>
                        )}
                      </div>
                    </>
                  ) : (
                    <span className="text-purple-400 text-lg">Empty Pot</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        <p className="text-xl font-semibold">Don&apos;t worry, its just a game!</p>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-purple-900/90 p-8 rounded-xl text-center">
            <h3 className="text-3xl font-bold text-purple-300 mb-4">🎉 Legendary Harvest!</h3>
            <p className="text-xl text-gray-200 mb-6">You&apos;ve successfully harvested a Canna Sapiens!</p>
            <button
              onClick={handleShare}
              className="bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 mx-auto"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
              Share on Twitter
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
