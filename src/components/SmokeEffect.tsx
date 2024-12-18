export default function SmokeEffect() {
  const smokePositions = [
    { left: 10, top: 20, duration: 20, delay: 0 },
    { left: 30, top: 50, duration: 18, delay: -4 },
    { left: 50, top: 10, duration: 22, delay: -8 },
    { left: 70, top: 60, duration: 19, delay: -12 },
    { left: 90, top: 30, duration: 21, delay: -16 },
    { left: 40, top: 80, duration: 23, delay: -20 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Background smoke layer */}
      <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-[1px]" />
      
      {/* Ambient smoke particles */}
      <div className="absolute w-full h-full overflow-hidden">
        {smokePositions.map((pos, i) => (
          <div
            key={i}
            className="absolute w-[600px] h-[600px] bg-white/[0.03] rounded-full blur-3xl"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
              animationName: 'ambientSmoke',
              animationDuration: `${pos.duration}s`,
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
              animationDelay: `${pos.delay}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
