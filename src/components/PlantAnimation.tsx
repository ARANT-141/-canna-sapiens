import { useState, useEffect } from 'react';
import Image from 'next/image';
import { PlantStage } from '@/game/types';

const STAGE_IMAGES = {
  seed: '/images/stages/seed.gif',
  growing: '/images/stages/growing.gif',
  ready: '/images/stages/harvested.gif',
  harvested: '/images/stages/harvested.gif'
};

interface PlantAnimationProps {
  stage: PlantStage | 'harvested';
  onClick?: () => void;
}

export default function PlantAnimation({ stage, onClick }: PlantAnimationProps) {
  const [showHarvestEffect, setShowHarvestEffect] = useState(false);

  useEffect(() => {
    if (stage === 'harvested') {
      setShowHarvestEffect(true);
      const timer = setTimeout(() => {
        setShowHarvestEffect(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  // Aşamalara göre boyut ayarlama
  const getPlantSize = () => {
    switch (stage) {
      case 'seed':
        return 'w-28 h-28';
      case 'growing':
        return 'w-32 h-32';
      case 'ready':
      case 'harvested':
        return 'w-36 h-36';
      default:
        return 'w-28 h-28';
    }
  };

  // Tüm aşamalar için GIF görüntüleme
  return (
    <div 
      className={`relative flex items-center justify-center ${getPlantSize()} cursor-pointer transform hover:scale-110 transition-transform`}
      onClick={onClick}
    >
      <Image
        src={STAGE_IMAGES[stage]}
        alt={`Plant ${stage}`}
        width={stage === 'harvested' ? 144 : 128}
        height={stage === 'harvested' ? 144 : 128}
        className={`transition-all duration-500 ${
          showHarvestEffect ? 'scale-125 opacity-90' : ''
        }`}
      />
      {showHarvestEffect && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl">✨</span>
        </div>
      )}
    </div>
  );
}
