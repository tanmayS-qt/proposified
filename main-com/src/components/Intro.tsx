import React, { useState, useRef, useEffect } from 'react';
import { Heart, Music, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Musicc from '../music/music.mp3';
import Videoo from '../videos/main.mp4';

// Pink Tulip SVG component
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

// Loading Hearts Animation
const LoadingHearts = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          {[...Array(3)].map((_, i) => (
            <Heart
              key={i}
              className={`w-16 h-16 mx-3 text-pink-500 animate-pulse-staggered`}
              style={{
                animationDelay: `${i * 0.3}s`,
                fill: "#ff70a6",
                opacity: 0,
                animation: `pulseIn 1.5s ease-in-out ${i * 0.3}s infinite`
              }}
            />
          ))}
        </div>
        <p className="text-2xl font-medium text-pink-600 animate-fadeIn">
          Loading a special surprise...
        </p>
      </div>
    </div>
  );
};

// Tulip Animations for fallback
const TulipAnimations = () => {
  const tulips = Array.from({ length: 15 });
  
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-gradient-to-br from-[#FFF0F5] to-[#F8E8FF]">
      {tulips.map((_, index) => {
        const left = Math.floor(Math.random() * 100);
        const delay = Math.floor(Math.random() * 5);
        const duration = Math.floor(Math.random() * 10) + 10;
        const size = Math.floor(Math.random() * 40) + 40;
        const rotate = Math.floor(Math.random() * 40) - 20;
        
        return (
          <PinkTulip
            key={`tulip-${index}`}
            className="absolute"
            style={{
              left: `${left}%`,
              bottom: `-120px`,
              width: `${size}px`,
              height: `${size * 2}px`,
              transform: `rotate(${rotate}deg)`,
              animation: `floatUp ${duration}s linear ${delay}s infinite`
            }}
          />
        );
      })}
      
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="animate-bounce mb-4">
          <Heart fill="#ff70a6" className="w-20 h-20" />
        </div>
        <p className="text-2xl font-medium text-pink-600">
          Loading your video...
        </p>
      </div>
    </div>
  );
};

// Message Card Component with improved glassmorphism
const MessageCard = ({ 
  id,
  title,
  message,
  isActive,
  showButtons,
  onRedirect 
}: {
  id: string;
  title: string;
  message: string;
  isActive: boolean;
  showButtons?: boolean;
  onRedirect?: () => void;
}) => {
  return (
    <div 
      className={`fixed z-30 backdrop-blur-md bg-white/20 rounded-2xl p-8 transition-all duration-700 transform ${
        isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
      }`}
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%) ${isActive ? 'scale(1)' : 'scale(0.9)'}`,
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.2)',
        width: '90%',
        maxWidth: '450px'
      }}
    >
      <div className="text-center relative overflow-hidden">
        <div className="absolute inset-0"></div>
        
        <Sparkles className="w-8 h-8 text-pink-500 mx-auto mb-2 animate-spin-slow" />
        <h2 className="text-3xl font-bold text-white mb-4 text-shadow">{title}</h2>
        <p className="text-xl text-white/90 mb-6 text-shadow-sm">{message}</p>
        
        {showButtons && (
          <div className="flex justify-center gap-4">
            <button 
              onClick={onRedirect}
              className="px-8 py-3 bg-gradient-to-r from-pink-400/90 to-purple-400/90 text-white backdrop-blur-sm rounded-full font-semibold hover:from-pink-500/90 hover:to-purple-500/90 transition-all hover:scale-105 "
            >
              Yes
            </button>
            <button 
              onClick={onRedirect}
              className="px-8 py-3 bg-gradient-to-r from-pink-400/90 to-purple-400/90 text-white backdrop-blur-sm rounded-full font-semibold hover:from-pink-500/90 hover:to-purple-500/90 transition-all hover:scale-105 "
            >
              Of course!
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const Intro = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeCard, setActiveCard] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const navigate = useNavigate();
  const [autoChange, setAutoChange] = useState(true);

  const cards = [
    {
      id: "card1",
      title: "Hey!",
      message: "I wanted to make something special for you..."
    },
    {
      id: "card2",
      title: "Are you excited?",
      message: "So I made this..."
    },
    {
      id: "card3",
      title: "Just for you",
      message: "Because you deserve something special!"
    },
    {
      id: "card4",
      title: "What I have prepared for you...",
      message: "Do you want to see?",
      showButtons: true
    }
  ];

  // Handle initial loading
  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);

  // Auto change cards every 4 seconds
  useEffect(() => {
    if (!isLoading && autoChange) {
      const timer = setTimeout(() => {
        if (activeCard < cards.length - 1) {
          setActiveCard(activeCard + 1);
        } else {
          // Stop auto-changing at the last card (with buttons)
          setAutoChange(false);
        }
      }, 4000);
      
      return () => clearTimeout(timer);
    }
  }, [activeCard, isLoading, autoChange, cards.length]);

  // Handle video loading
  const handleVideoLoaded = () => {
    setVideoLoaded(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  // Handle audio
  useEffect(() => {
    if (!isLoading && audioRef.current) {
      audioRef.current.play().catch(error => {
        console.log("Audio play prevented by browser, waiting for user interaction");
      });
    }
  }, [isLoading]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNextCard = () => {
    if (activeCard < cards.length - 1) {
      setActiveCard(activeCard + 1);
      setAutoChange(false); // Stop auto-changing when user manually changes
    }
  };

  const redirectToQualities = () => {
    navigate('/qualities');
  };

  return (
    <>
      {/* Loading screen */}
      {isLoading && <LoadingHearts />}

      {/* Main content */}
      {!isLoading && (
        <div className="relative min-h-screen w-full overflow-hidden">
          {/* Background video or fallback */}
          {!videoLoaded && <TulipAnimations />}
          
          <video
            ref={videoRef}
            className="fixed right-0 bottom-0 min-w-100 min-h-100 w-auto h-auto z-0 object-cover"
            style={{ width: '100%', height: '100%' }}
            autoPlay
            muted
            loop
            playsInline
            onCanPlayThrough={handleVideoLoaded}
          >
            <source src={Videoo} type="video/mp4" />
          </video>
          
          {/* Overlay for better text visibility */}
          <div className="fixed inset-0 z-5 bg-gradient-to-b from-black/20 to-black/40"></div>
          
          {/* Music player button with glassmorphism */}
          <div className="fixed top-6 right-6 z-40">
            <button 
              onClick={togglePlay}
              className={`w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-lg border border-white/30 shadow-lg hover:scale-110 transition-all ${
                isPlaying ? 'bg-pink-500/30' : 'bg-gray-700/30'
              } text-white`}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-400/40 to-purple-400/40 opacity-80"></div>
              <Music className={`w-6 h-6 relative z-10 ${isPlaying ? 'animate-pulse' : ''}`} />
            </button>
          </div>

          {/* Message cards */}
          {cards.map((card, index) => (
            <MessageCard
              key={card.id}
              id={card.id}
              title={card.title}
              message={card.message}
              isActive={activeCard === index}
              showButtons={card.showButtons}
              onRedirect={redirectToQualities}
            />
          ))}

          {/* Audio player */}
          <audio ref={audioRef} src={Musicc} loop />
        </div>
      )}

      {/* Inline CSS for animations */}
      <style>{`
        @keyframes pulseIn {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
            opacity: 1;
          }
          100% {
            transform: scale(0.8);
            opacity: 0;
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(var(--rotate));
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(-100vh) rotate(var(--rotate));
            opacity: 0;
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease-in forwards;
        }
        
        .animate-spin-slow {
          animation: spin-slow 6s linear infinite;
        }
        
        .shadow-glow-pink {
          box-shadow: 0 0 15px 5px rgba(255, 105, 180, 0.3);
        }
        
        .text-shadow {
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        .text-shadow-sm {
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </>
  );
};

export default Intro;
