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
  onHarvestAnimationComplete?: () => void;
}

export default function PlantAnimation({ stage, onHarvestAnimationComplete }: PlantAnimationProps) {
  const [showHarvestEffect, setShowHarvestEffect] = useState(false);

  useEffect(() => {
    if (stage === 'harvested') {
      setShowHarvestEffect(true);
      const timer = setTimeout(() => {
        setShowHarvestEffect(false);
        onHarvestAnimationComplete?.();
      }, 2500); // Biraz daha uzun süre
      return () => clearTimeout(timer);
    }
  }, [stage, onHarvestAnimationComplete]);

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
    <div className={`relative flex items-center justify-center ${getPlantSize()}`}>
      <Image
        src={STAGE_IMAGES[stage]}
        alt={`Plant ${stage}`}
        width={stage === 'harvested' ? 144 : 128}
        height={stage === 'harvested' ? 144 : 128}
        className={`transition-all duration-500 ${
          showHarvestEffect ? 'scale-125 opacity-90' : ''
        }`}
      />
    </div>
  );
}
