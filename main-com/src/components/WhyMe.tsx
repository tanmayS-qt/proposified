// src/components/WhyMe.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Sparkles, Moon, MoveHorizontal } from 'lucide-react';

// Planet SVG Component with enhanced visuals
const Planet = ({ 
  color1, 
  color2, 
  size, 
  hasMoon,
  className,
  style
}: { 
  color1: string,
  color2: string, 
  size: number, 
  hasMoon?: boolean,
  className?: string, 
  style?: React.CSSProperties 
}) => (
  <div 
    className={`relative ${className}`}
    style={style}
  >
    {/* Planet body with texture */}
    <div 
      className="rounded-full absolute"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        background: `linear-gradient(135deg, ${color1}, ${color2})`,
        boxShadow: `0 0 ${size/3}px 0 rgba(255,255,255,0.3)`,
        overflow: 'hidden'
      }}
    >
      {/* Planet texture overlay */}
      <div className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 30% 30%, transparent 0%, rgba(0,0,0,0.5) 80%),
                           radial-gradient(circle at ${Math.random() * 100}% ${Math.random() * 100}%, rgba(255,255,255,0.5) 0%, transparent 20%),
                           radial-gradient(circle at ${Math.random() * 100}% ${Math.random() * 100}%, rgba(255,255,255,0.5) 0%, transparent 15%)`
        }}
      />
    </div>

    {/* Moon for some planets */}
    {hasMoon && (
      <div 
        className="absolute rounded-full animate-orbit"
        style={{
          width: `${size * 0.25}px`,
          height: `${size * 0.25}px`,
          background: `linear-gradient(135deg, #E1E1E1, #A1A1A1)`,
          boxShadow: `0 0 ${size/10}px 0 rgba(255,255,255,0.5)`,
          left: `${size * 1.2}px`,
          top: `${-size * 0.2}px`
        }}
      />
    )}
  </div>
);

// Comet animation component
const Comet = ({ delay }: { delay: number }) => (
  <div 
    className="absolute w-1 h-1 bg-white opacity-0"
    style={{
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      boxShadow: '0 0 20px 2px white, 0 0 40px 6px rgba(255,255,255,0.4)',
      animation: `cometMove ${Math.random() * 10 + 10}s linear ${delay}s infinite`
    }}
  />
);

// Asteroid component
const Asteroid = ({ delay, size }: { delay: number, size: number }) => (
  <div 
    className="absolute rounded-full bg-gray-400"
    style={{
      width: `${size}px`,
      height: `${size}px`,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      boxShadow: '0 0 5px 1px rgba(255,255,255,0.2)',
      animation: `asteroidFloat ${Math.random() * 15 + 20}s linear ${delay}s infinite`
    }}
  />
);

// Nebula background effect
const Nebula = ({ color, position }: { color: string, position: { x: number, y: number } }) => (
  <div
    className="absolute rounded-full opacity-20 blur-3xl"
    style={{
      width: '300px',
      height: '300px',
      background: color,
      left: `${position.x}%`,
      top: `${position.y}%`,
      filter: 'blur(70px)',
      transform: 'translate(-50%, -50%)',
      animation: 'nebulaGlow 10s ease-in-out infinite alternate',
    }}
  />
);

const WhyMe = () => {
  const navigate = useNavigate();
  const [activeReason, setActiveReason] = useState<number | null>(null);
  const [showInstructions, setShowInstructions] = useState(true);
  const [allPlanetsVisited, setAllPlanetsVisited] = useState(false);
  const [collectingStars, setCollectingStars] = useState<number[]>([]);
  const [starSound, setStarSound] = useState<HTMLAudioElement | null>(null);
  const [visitedPlanets, setVisitedPlanets] = useState<number[]>([]);
  
  // Audio setup
  useEffect(() => {
    const audio = new Audio('/sounds/sparkle.mp3');
    audio.volume = 0.3;
    setStarSound(audio);
    
    return () => {
      if (audio) {
        audio.pause();
        audio.src = '';
      }
    };
  }, []);

  const whyMeReasons = [
    { 
      icon: "🫂", 
      title: "I'm your kuchupuchu", 
      desc: "Best partner you could have!",
      planetColors: ["#FF9D6C", "#FF5722"],
      size: 60, // Slightly smaller for mobile
      position: { x: 25, y: 30 }, // Adjusted positions for better mobile visibility
      hasMoon: true,
      orbitDuration: 120
    },
    { 
      icon: "🎵", 
      title: "My music taste is best", 
      desc: "I can sing all your favorite songs",
      planetColors: ["#64B5F6", "#1565C0"],
      size: 70,
      position: { x: 75, y: 30 },
      hasMoon: false,
      orbitDuration: 100
    },
    { 
      icon: "🤗", 
      title: "I'm never gonna stop irritating you", 
      desc: "aja bhidle",
      planetColors: ["#AED581", "#33691E"],
      size: 55,
      position: { x: 25, y: 70 },
      hasMoon: true,
      orbitDuration: 140
    },
    { 
      icon: "💝", 
      title: "I Will Take Care of You", 
      desc: "Like always",
      planetColors: ["#BA68C8", "#6A1B9A"],
      size: 65,
      position: { x: 75, y: 70 },
      hasMoon: false,
      orbitDuration: 80
    }
  ];

  // Generate nebula effects
  const nebulae = [
    { color: 'rgba(255, 0, 150, 0.15)', position: { x: 20, y: 20 } },
    { color: 'rgba(0, 150, 255, 0.15)', position: { x: 80, y: 30 } },
    { color: 'rgba(100, 255, 100, 0.15)', position: { x: 40, y: 70 } },
  ];

  // Generate stars for background
  const stars = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    size: Math.random() * 2 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    opacity: Math.random() * 0.7 + 0.3,
    animationDelay: Math.random() * 5,
    isCollectible: i < 15, // Make some stars collectible
    collected: false
  }));

  // Generate comets
  const comets = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    delay: Math.random() * 10
  }));

  // Generate asteroids
  const asteroids = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 5
  }));

  // Handle planet selection
  const selectPlanet = (index: number) => {
    if (!visitedPlanets.includes(index)) {
      setVisitedPlanets(prev => [...prev, index]);
    }
    
    // Play sound effect
    if (starSound) {
      starSound.currentTime = 0;
      starSound.play().catch(e => console.log('Audio play failed:', e));
    }
    
    setActiveReason(index);
    
    // Check if all planets have been visited
    if (!visitedPlanets.includes(index) && visitedPlanets.length + 1 >= whyMeReasons.length) {
      setAllPlanetsVisited(true);
    }
  };

  // Collect a star
  const collectStar = (id: number) => {
    if (!collectingStars.includes(id)) {
      setCollectingStars(prev => [...prev, id]);
      
      // Play sound
      if (starSound) {
        starSound.currentTime = 0;
        starSound.play().catch(e => console.log('Audio play failed:', e));
      }
      
      // Remove after animation
      setTimeout(() => {
        setCollectingStars(prev => prev.filter(starId => starId !== id));
      }, 1000);
    }
  };

  // Handle navigation - direct navigation without animation
  const handleNavigation = () => {
    navigate('/timeline');
  };

  // Hide instructions after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInstructions(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#0B0B2B] via-[#1A1A4A] to-[#272768]">
      {/* Nebula backgrounds */}
      {nebulae.map((nebula, i) => (
        <Nebula 
          key={`nebula-${i}`} 
          color={nebula.color}  
          position={nebula.position}
        />
      ))}
      
      {/* Background stars */}
      {stars.map(star => (
        <div
          key={`star-${star.id}`}
          className={`absolute rounded-full ${star.isCollectible ? 'cursor-pointer hover:scale-150' : ''} ${
            collectingStars.includes(star.id) ? 'animate-collect-star' : ''
          }`}
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.x}%`,
            top: `${star.y}%`,
            opacity: collectingStars.includes(star.id) ? 0 : star.opacity,
            background: star.isCollectible ? 'rgba(255, 255, 150, 0.9)' : 'white',
            boxShadow: star.isCollectible 
              ? '0 0 8px 2px rgba(255, 255, 150, 0.7), 0 0 12px 4px rgba(255, 255, 150, 0.3)' 
              : '0 0 5px 1px rgba(255, 255, 255, 0.5)',
            animation: `twinkle 3s ease-in-out infinite ${star.animationDelay}s`,
            transition: 'all 0.3s ease'
          }}
          onClick={star.isCollectible ? () => collectStar(star.id) : undefined}
        />
      ))}

      {/* Comets */}
      {comets.map(comet => (
        <Comet key={`comet-${comet.id}`} delay={comet.delay} />
      ))}
      
      {/* Asteroids */}
      {asteroids.map(asteroid => (
        <Asteroid key={`asteroid-${asteroid.id}`} delay={asteroid.delay} size={asteroid.size} />
      ))}

      {/* Instructions overlay */}
      <div className={`fixed inset-0 z-50 flex items-center justify-center pointer-events-none transition-opacity duration-1000 ${showInstructions ? 'opacity-100' : 'opacity-0'}`}>
        <div className="bg-black/70 backdrop-blur-sm p-6 rounded-xl text-center max-w-sm mx-4">
          <Star className="w-8 h-8 text-yellow-300 mx-auto mb-4 animate-spin-slow" />
          <p className="text-white text-lg mb-2">
            Click on each <span className="text-purple-300 font-bold">planet</span> to discover why I think I'm perfect for you
          </p>
          <p className="text-gray-300 text-sm">
            You can also click the bright stars for a surprise!
          </p>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="fixed top-6 right-6 z-40 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5 border border-indigo-500/30">
        <div className="flex items-center gap-2">
          <span className="text-white text-sm">
            {visitedPlanets.length}/{whyMeReasons.length} planets visited
          </span>
          <div className="w-20 h-2 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-purple-500 transition-all duration-500" 
              style={{ width: `${(visitedPlanets.length / whyMeReasons.length) * 100}%` }} 
            />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-blue-400 mb-6 sm:mb-10 text-center z-20">
          Why Me?
        </h1>
        
        {/* Space exploration area - Adjusted for mobile */}
        <div className="w-full max-w-4xl aspect-[4/3] sm:aspect-[16/9] bg-[#171740]/30 rounded-3xl backdrop-blur-sm border border-indigo-500/20 relative overflow-hidden mb-6 sm:mb-8">
          {/* Interactive planets */}
          {whyMeReasons.map((reason, index) => (
            <div 
              key={index}
              className={`absolute cursor-pointer transition-all duration-500 hover:scale-110 ${
                activeReason === index ? 'z-30 animate-pulse-slow' : 'z-20'
              } ${visitedPlanets.includes(index) ? 'visited-planet' : ''}`}
              style={{
                left: `${reason.position.x}%`,
                top: `${reason.position.y}%`,
                transform: `translate(-50%, -50%)`,
                animation: activeReason === index ? 'pulse-slow 2s infinite' : `smallOrbit ${reason.orbitDuration}s linear infinite`
              }}
              onClick={() => selectPlanet(index)}
            >
              <Planet 
                color1={reason.planetColors[0]}
                color2={reason.planetColors[1]}
                size={reason.size}
                hasMoon={reason.hasMoon}
              />
              
              {/* Visited indicator */}
              {visitedPlanets.includes(index) && (
                <div className="absolute -top-2 -right-2 bg-green-500 rounded-full w-5 h-5 border-2 border-white flex items-center justify-center z-40">
                  <MoveHorizontal className="w-3 h-3 text-white" />
                </div>
              )}
              
              {/* Glow effect on hover/active */}
              <div className={`absolute inset-0 rounded-full bg-white/10 filter blur-xl transition-opacity duration-300 ${
                activeReason === index ? 'opacity-70' : 'opacity-0'
              }`} 
                style={{ 
                  width: `${reason.size * 1.5}px`, 
                  height: `${reason.size * 1.5}px`,
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)'
                }} 
              />
            </div>
          ))}
        </div>

        {/* Active planet info display */}
        <div className={`w-full max-w-xl backdrop-blur-md bg-white/10 rounded-2xl p-6 sm:p-8 border border-white/20 shadow-2xl transition-all duration-500 ${
          activeReason !== null ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {activeReason !== null && (
            <div className="text-center">
              <div className="text-5xl mb-4 sm:mb-6 animate-float">
                {whyMeReasons[activeReason].icon}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">
                {whyMeReasons[activeReason].title}
              </h2>
              <p className="text-base sm:text-lg text-indigo-200">
                {whyMeReasons[activeReason].desc}
              </p>
            </div>
          )}
        </div>

        {/* Navigation button */}
        <div className={`mt-6 sm:mt-10 transition-all duration-500 ${allPlanetsVisited ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <button
            onClick={handleNavigation}
            className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition-transform transform hover:scale-105 shadow-lg shadow-purple-500/30 font-semibold"
          >
            <div className="flex items-center gap-2">
              <span>See Our Story!</span>
              <Sparkles className="w-5 h-5" />
            </div>
          </button>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        @keyframes cometMove {
          0% {
            transform: translate(0, 0) rotate(45deg) scale(1);
            opacity: 0;
          }
          2% {
            opacity: 1;
            transform: translate(5px, 5px) rotate(45deg) scale(1);
          }
          5% {
            transform: translate(20px, 20px) rotate(45deg) scale(3);
            opacity: 1;
          }
          10% {
            transform: translate(40px, 40px) rotate(45deg) scale(1);
            opacity: 0;
          }
          100% {
            transform: translate(100vw, 100vh) rotate(45deg) scale(1);
            opacity: 0;
          }
        }
        
        @keyframes collect-star {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(2.5); opacity: 0.7; }
          100% { transform: scale(3); opacity: 0; }
        }
        
        @keyframes asteroidFloat {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(20px, 15px) rotate(180deg); }
          100% { transform: translate(0, 0) rotate(360deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1) translate(-50%, -50%); }
          50% { transform: scale(1.05) translate(-50%, -50%); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        /* Smaller orbit animation for better mobile viewing */
        @keyframes smallOrbit {
          0% { transform: translate(-50%, -50%) rotate(0) translateX(5px) rotate(0); }
          100% { transform: translate(-50%, -50%) rotate(360deg) translateX(5px) rotate(-360deg); }
        }
        
        @keyframes nebulaGlow {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.25; }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 6s linear infinite;
        }
        
        .visited-planet::after {
          content: "";
          position: absolute;
          inset: -2px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.5);
          animation: pulse 2s infinite;
          z-index: -1;
        }
        
        @keyframes pulse {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default WhyMe;