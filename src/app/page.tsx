'use client'

import Image from 'next/image';
import SmokeEffect from '@/components/SmokeEffect';
import { useState } from 'react';
import GameContainer from '@/components/GameContainer';

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-yellow-300 via-purple-500 to-purple-700 psychedelic-bg">
      <SmokeEffect />
      {!gameStarted ? (
        <div className="text-center relative">
          <h1 className="text-6xl font-bold text-pink-400 mb-8 text-distort text-giant">
            Canna Sapiens Farmers
          </h1>
          <p className="text-2xl text-green-300 italic mb-8 text-distort">
            let&apos;s grow some good vibes
          </p>
          
          <div className="relative w-[200px] h-[200px] mx-auto mb-8 psychedelic-fast">
            <Image
              src="/images/homepage.gif"
              alt="Canna Sapiens Mascot"
              fill
              style={{ objectFit: 'contain' }}
              className="rounded-xl"
            />
          </div>

          <button 
            onClick={() => setGameStarted(true)}
            className="inline-block bg-purple-500 hover:bg-purple-600 text-yellow-200 text-xl font-medium px-8 py-4 rounded-xl transition-colors text-distort"
          >
            Start Farming
          </button>
        </div>
      ) : (
        <GameContainer />
      )}
    </main>
  )
}
