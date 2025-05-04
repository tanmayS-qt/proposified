// src/components/Qualities.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Star as StarIcon, Sparkles } from 'lucide-react';

// Pink Tulip SVG component reused from Intro
const PinkTulip = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg
    className={className}
    style={style}
    width="60"
    height="120"
    viewBox="0 0 60 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M30 50C35 30 45 20 50 15C45 25 40 40 30 50Z" fill="#FF9DC5" />
    <path d="M30 50C25 30 15 20 10 15C15 25 20 40 30 50Z" fill="#FF9DC5" />
    <path d="M30 50C40 35 45 25 45 15C35 20 30 35 30 50Z" fill="#FF70A6" />
    <path d="M30 50C20 35 15 25 15 15C25 20 30 35 30 50Z" fill="#FF70A6" />
    <path d="M30 120C30 120 25 70 30 50C35 70 30 120 30 120Z" fill="#4CAF50" />
  </svg>
);

// Tree SVG component
const Tree = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg
    className={className}
    style={style}
    width="100"
    height="160"
    viewBox="0 0 100 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M50 30C60 10 75 0 85 0C75 15 65 35 50 30Z" fill="#4CAF50" />
    <path d="M50 30C40 10 25 0 15 0C25 15 35 35 50 30Z" fill="#4CAF50" />
    <path d="M50 60C65 40 75 25 80 15C65 25 55 45 50 60Z" fill="#2E7D32" />
    <path d="M50 60C35 40 25 25 20 15C35 25 45 45 50 60Z" fill="#2E7D32" />
    <path d="M50 90C65 70 75 55 80 45C65 55 55 75 50 90Z" fill="#1B5E20" />
    <path d="M50 90C35 70 25 55 20 45C35 55 45 75 50 90Z" fill="#1B5E20" />
    <rect x="45" y="90" width="10" height="70" fill="#795548" />
  </svg>
);

// Interactive Star component
const Star = ({
  id,
  x,
  y,
  size,
  delay,
  isClickable,
  isCollected,
  onClick
}: {
  id: number,
  x: number,
  y: number,
  size: number,
  delay: number,
  isClickable: boolean,
  isCollected: boolean,
  onClick?: (id: number) => void
}) => (
  <div
    className={`absolute transition-all duration-700 ${isClickable ? 'cursor-pointer hover:scale-125' : ''
      } ${isCollected ? 'scale-150 opacity-0 transform translate-y-[-100px]' : 'opacity-100'
      }`}
    style={{
      left: `${x}%`,
      top: `${y}%`,
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: '50%',
      background: isClickable ? 'rgba(255, 255, 150, 0.9)' : 'white',
      boxShadow: isClickable
        ? '0 0 15px 5px rgba(255, 255, 150, 0.7), 0 0 30px 10px rgba(255, 255, 150, 0.3)'
        : '0 0 10px 2px white',
      animation: isClickable ? 'pulse 1.5s infinite' : `twinkle 3s infinite ${delay}s`,
      zIndex: isClickable ? 30 : 10
    }}
    onClick={isClickable && onClick ? () => onClick(id) : undefined}
  />
);

// Cloud component
const Cloud = ({ className, x, y, scale, delay }: { className?: string, x: number, y: number, scale: number, delay: number }) => (
  <div
    className={`absolute ${className}`}
    style={{
      left: `${x}%`,
      top: `${y}%`,
      transform: `scale(${scale})`,
      animation: `float 20s ease-in-out infinite ${delay}s`
    }}
  >
    <div className="relative flex">
      <div className="bg-white/90 w-16 h-10 rounded-full"></div>
      <div className="bg-white/90 w-10 h-12 rounded-full -ml-4 -mt-2"></div>
      <div className="bg-white/90 w-14 h-8 rounded-full -ml-4 mt-2"></div>
    </div>
  </div>
);

const Qualities = () => {
  const navigate = useNavigate();
  const [isDayMode, setIsDayMode] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [collectedStars, setCollectedStars] = useState<number[]>([]);
  const [dayTransitionProgress, setDayTransitionProgress] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true);

  const totalSpecialStars = 5;
  const requiredStarsForDay = totalSpecialStars;

  // Generate array of regular stars
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 60,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 3
  }));

  // Generate array of special interactive stars
  const specialStars = Array.from({ length: totalSpecialStars }, (_, i) => ({
    id: 100 + i,
    x: 15 + (i * 15) + (Math.random() * 5),
    y: 20 + (Math.random() * 30),
    size: 8 + (Math.random() * 4),
    delay: Math.random() * 2,
    isCollected: collectedStars.includes(100 + i)
  }));

  // Generate array of clouds
  const clouds = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 30 + 5,
    scale: Math.random() * 0.5 + 0.7,
    delay: Math.random() * 5
  }));

  // Qualities to display
  const qualities = [
    { icon: "✨", emoji: "🌟", title: "Your Eyes", desc: "Your eyes? A pair of mischievous magnets—pulling me in, no questions asked!" },
    { icon: "😊", emoji: "🌞", title: "Your Smile", desc: "Your smile should come with a warning: May cause butterflies and sudden daydreams." },
    { icon: "💕", emoji: "❤️", title: "Your Heart", desc: "Your heart? A cozy chaos of glitter, kindness, and stubborn love." },
    { icon: "🎵", emoji: "🎶", title: "Your Voice", desc: "Your voice has this magic—it turns even “hmm” into a full-blown concert in my head." },
    { icon: "🧠", emoji: "💭", title: "Your Mind", desc: "Your brain? A mixtape of overthinking, genius ideas, and “you won’t get it, but I do” vibes." },
    { icon: "🤗", emoji: "💝", title: "Your Warmth", desc: "Comforting like sunshine after rain" },
  ];


  // Generate random positions for tulips and trees
  const tulips = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    bottom: Math.random() * 15,
    scale: Math.random() * 0.5 + 0.5,
    rotate: Math.random() * 20 - 10
  }));

  const trees = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    bottom: Math.random() * 5,
    scale: Math.random() * 0.6 + 0.4,
    rotate: Math.random() * 10 - 5
  }));

  // Handle star collection
  const collectStar = (id: number) => {
    if (!collectedStars.includes(id) && !transitioning) {
      // Play a sparkle sound
      const audio = new Audio('/sounds/sparkle.mp3');
      audio.volume = 0.3;
      try {
        audio.play();
      } catch (error) {
        console.log('Audio play failed:', error);
      }

      setCollectedStars([...collectedStars, id]);

      // Update transition progress
      const newProgress = (collectedStars.length + 1) / requiredStarsForDay;
      setDayTransitionProgress(newProgress);

      // If all stars collected, transition to day
      if (collectedStars.length + 1 >= requiredStarsForDay) {
        transitionToDay();
      }
    }
  };

  // Transition to day
  const transitionToDay = () => {
    if (!transitioning) {
      setTransitioning(true);

      // Start transition animations
      setTimeout(() => {
        setIsDayMode(true);

        // Complete transition and show content
        setTimeout(() => {
          setShowContent(true);
          setTransitioning(false);
        }, 1500);
      }, 800);
    }
  };

  // Calculate background color based on transition progress
  const getBgStyle = () => {
    if (isDayMode) {
      return 'bg-gradient-to-b from-blue-300 via-blue-200 to-blue-100';
    } else {
      // Create transition colors based on progress
      if (dayTransitionProgress > 0) {
        const opacity = dayTransitionProgress * 0.6;
        return `bg-gradient-to-b from-[#0a192f] via-[rgba(23, 42, 70, ${1 - opacity})] to-[rgba(37, 53, 85, ${1 - opacity})]`;
      }
      return 'bg-gradient-to-b from-[#0a192f] via-[#172a46] to-[#253555]';
    }
  };

  // Hide instructions after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInstructions(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`min-h-screen relative overflow-hidden transition-all duration-1500 ease-in-out ${getBgStyle()}`}
    >
      {/* Instructions overlay */}
      <div className={`fixed inset-0 z-50 flex items-center justify-center pointer-events-none transition-opacity duration-1000 ${showInstructions ? 'opacity-100' : 'opacity-0'
        }`}>
        <div className="bg-black/60 backdrop-blur-sm p-6 rounded-xl text-center max-w-sm">
          <Sparkles className="w-8 h-8 text-yellow-300 mx-auto mb-4 animate-spin-slow" />
          <p className="text-white text-lg">
            Click the <span className="text-yellow-300 font-bold">bright stars</span> to bring daylight and reveal what I love about you
          </p>
        </div>
      </div>

      {/* Progress indicator */}
      {!isDayMode && collectedStars.length > 0 && collectedStars.length < requiredStarsForDay && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-40">
          <div className="text-center">
            <div className="relative h-2 w-40 bg-white/20 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-yellow-300 transition-all duration-500"
                style={{ width: `${(collectedStars.length / requiredStarsForDay) * 100}%` }}
              ></div>
            </div>
            <p className="text-white text-sm mt-2">
              {collectedStars.length} / {requiredStarsForDay} stars
            </p>
          </div>
        </div>
      )}

      {/* Regular stars - visible at night */}
      <div className={`transition-opacity duration-1500 ${isDayMode ? 'opacity-0' : 'opacity-100'}`}>
        {stars.map(star => (
          <Star
            key={`star-${star.id}`}
            id={star.id}
            x={star.x}
            y={star.y}
            size={star.size}
            delay={star.delay}
            isClickable={false}
            isCollected={false}
          />
        ))}
      </div>

      {/* Special interactive stars */}
      {!isDayMode && (
        <div className="z-30">
          {specialStars.map(star => (
            <Star
              key={`star-special-${star.id}`}
              id={star.id}
              x={star.x}
              y={star.y}
              size={star.size}
              delay={star.delay}
              isClickable={true}
              isCollected={star.isCollected}
              onClick={collectStar}
            />
          ))}
        </div>
      )}

      {/* Moon - visible at night */}
      <div
        className={`absolute right-10 top-10 w-16 h-16 rounded-full transition-all duration-1500 ${isDayMode ? 'opacity-0 -translate-y-20' : 'opacity-100'
          }`}
        style={{
          background: 'white',
          boxShadow: '0 0 20px 5px rgba(255, 255, 255, 0.4)'
        }}
      />

      {/* Sun - visible during day */}
      <div
        className={`absolute left-10 top-10 w-20 h-20 rounded-full transition-all duration-1500 ${isDayMode ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-50'
          }`}
        style={{
          background: 'rgba(255, 206, 72)',
          boxShadow: '0 0 50px 15px rgba(255, 206, 72, 0.7)'
        }}
      />

      {/* Day glow */}
      <div
        className={`fixed inset-0 bg-yellow-400/20 z-5 transition-opacity duration-1500 ${isDayMode ? 'opacity-100' : 'opacity-0'
          }`}
      ></div>

      {/* Clouds - visible during day */}
      <div className={`transition-all duration-1500 ${isDayMode ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}>
        {clouds.map(cloud => (
          <Cloud
            key={`cloud-${cloud.id}`}
            x={cloud.x}
            y={cloud.y}
            scale={cloud.scale}
            delay={cloud.delay}
          />
        ))}
      </div>

      {/* Trees - visible during day */}
      <div className={`absolute bottom-0 left-0 right-0 z-10 transition-all duration-1500 ${isDayMode ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}>
        {trees.map(tree => (
          <Tree
            key={`tree-${tree.id}`}
            className="absolute bottom-0"
            style={{
              left: `${tree.left}%`,
              transform: `scale(${tree.scale}) rotate(${tree.rotate}deg)`,
              transformOrigin: 'bottom center'
            }}
          />
        ))}
      </div>

      {/* Tulips - visible during day */}
      <div className={`absolute bottom-0 left-0 right-0 z-20 transition-all duration-1500 ${isDayMode ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
        {tulips.map(tulip => (
          <PinkTulip
            key={`tulip-${tulip.id}`}
            className={`absolute`}
            style={{
              left: `${tulip.left}%`,
              bottom: `${tulip.bottom}%`,
              transform: `scale(${tulip.scale}) rotate(${tulip.rotate}deg)`,
              transformOrigin: 'bottom center',
              animation: 'sway 5s ease-in-out infinite alternate',
              '--scale': tulip.scale,
              '--rotate': `${tulip.rotate}deg`
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Main Content - Only visible during day */}
      <div className={`relative z-30 min-h-screen flex flex-col items-center justify-center p-6 transition-all duration-1000 ${isDayMode && showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}>
        <div className="w-full max-w-5xl backdrop-blur-lg bg-white/50 rounded-3xl p-10 shadow-2xl border border-white/30 mb-10 text-center transform transition-all duration-700 animate-fade-in-up">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Sunshine of My Life
          </h1>
          <p className="text-xl text-gray-700 mb-6">
            These are the things I adore about you, my love...
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
          {qualities.map((quality, index) => (
            <div
              key={index}
              className="backdrop-blur-lg border border-white/30 rounded-2xl p-6 transition-all duration-700 transform hover:scale-105 animate-fade-in-up bg-white/50 shadow-blue-200/50"
              style={{
                boxShadow: '0 8px 32px rgba(164, 198, 255, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                animationDelay: `${400 + (index * 200)}ms`
              }}
            >
              <div className="text-4xl mb-4 flex justify-center">
                {quality.emoji}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {quality.title}
              </h3>
              <p className="text-gray-700">
                {quality.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 animate-fade-in-up" style={{ animationDelay: '1800ms' }}>
          <button
            onClick={() => navigate('/whyme')}
            className="px-8 py-4 rounded-full backdrop-blur-md border border-white/30 text-white font-semibold transition-all transform hover:scale-105 bg-pink-600 hover:bg-pink-700 shadow-lg shadow-pink-500/30"
          >
            <div className="flex items-center gap-2">
              <span>But Why Me?</span>
              <Heart className="w-5 h-5 animate-beat" fill="white" />
            </div>
          </button>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(var(--scale)); }
          50% { transform: translateY(-20px) scale(var(--scale)); }
        }
        
        @keyframes sway {
          0% { transform: rotate(calc(var(--rotate) - 5deg)) scale(var(--scale)); }
          100% { transform: rotate(calc(var(--rotate) + 5deg)) scale(var(--scale)); }
        }
        
        @keyframes beat {
          0% { transform: scale(1); }
          25% { transform: scale(1.3); }
          40% { transform: scale(1); }
          60% { transform: scale(1.3); }
          100% { transform: scale(1); }
        }
        
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .text-shadow {
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }
        
        .text-shadow-sm {
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
        }
        
        .animate-pulse-slow {
          animation: pulse 2s ease-in-out infinite;
        }
        
        .animate-beat {
          animation: beat 1.5s infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .transition-all {
          transition-property: all;
        }
        
        .duration-1500 {
          transition-duration: 1500ms;
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
};

export default Qualities;
