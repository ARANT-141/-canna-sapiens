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

  const isHarvestedOrReady = stage === 'harvested' || stage === 'ready';

  return (
    <div 
      className={`relative w-24 h-24 cursor-pointer transform hover:scale-110 transition-transform perspective-800 ${
        isHarvestedOrReady ? 'z-10' : ''
      }`}
      onClick={onClick}
      style={{ perspective: '800px' }}
    >
      <Image
        src={STAGE_IMAGES[stage]}
        alt={`Plant in ${stage} stage`}
        width={128}
        height={128}
        unoptimized
        className={`transition-all duration-500 ${
          isHarvestedOrReady ? 'animate-float' : ''
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
